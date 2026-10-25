// Usage: node capture-baseline.mjs <baseUrl> <outDir> [--only=name1,name2] [--widths=desktop,mobile] [--settle=1500]   (needs `npm i playwright` + `npx playwright install chromium`)
import { chromium, devices } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith('--'));
const flags = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => { const [k, v] = a.slice(2).split('='); return [k, v ?? 'true']; }));
const baseUrl = (positional[0] || 'https://www.ayobanton.com').replace(/\/+$/, '');
const outDir = path.resolve(positional[1] || './baseline');
const settleMs = Number(flags.settle || 1500);

const PATHS = [
  '/', '/about', '/collections', '/collections/into-dust', '/collections/kind-of-blue',
  '/collections/luminous-bones', '/collections/brutiful', '/store', '/category/into-dust',
  '/product/velvet', '/product/dissolution', '/product/frequency-ii', '/this-page-does-not-exist',
];
const nameOf = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '_'));

// Mobile/tablet use mobile UAs + isMobile so UA-sniffing builders (e.g. Wix) serve their mobile layout.
const WIDTHS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  tablet: { ...devices['iPad Mini'], viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 },
  mobile: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 },
};

const only = flags.only ? new Set(flags.only.split(',')) : null;
const widthKeys = flags.widths ? flags.widths.split(',') : Object.keys(WIDTHS);
const manifestPath = path.join(outDir, 'manifest.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
manifest.baseUrl = baseUrl;
manifest.capturedAt = new Date().toISOString();
manifest.pages = manifest.pages || {};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    let y = 0;
    for (let i = 0; i < 400; i++) {
      y += 400;
      window.scrollTo(0, y);
      await wait(150);
      const max = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      if (y >= max) break;
    }
  });
}

const browser = await chromium.launch();
const failures = [];
for (const wKey of widthKeys) {
  const { defaultBrowserType, ...ctxOpts } = WIDTHS[wKey];
  const context = await browser.newContext(ctxOpts);
  fs.mkdirSync(path.join(outDir, wKey), { recursive: true });
  for (const p of PATHS) {
    const name = nameOf(p);
    if (only && !only.has(name)) continue;
    const page = await context.newPage();
    const entry = { path: p, url: baseUrl + p };
    try {
      let resp;
      try {
        resp = await page.goto(baseUrl + p, { waitUntil: 'networkidle', timeout: 45000 });
      } catch (e) {
        entry.note = 'networkidle timeout; fell back to load';
        resp = resp || (await page.goto(baseUrl + p, { waitUntil: 'load', timeout: 60000 }));
      }
      entry.status = resp ? resp.status() : null;
      entry.finalUrl = page.url();
      await sleep(500);
      await scrollThrough(page);
      await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      await sleep(settleMs);
      await page.evaluate(() => window.scrollTo(0, 0));
      await sleep(1000);
      const dims = await page.evaluate(() => ({
        height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        title: document.title,
      }));
      Object.assign(entry, dims, { horizontalOverflow: dims.scrollWidth > dims.clientWidth });
      await page.screenshot({ path: path.join(outDir, wKey, `${name}-full.png`), fullPage: true, animations: 'allow' });
      await page.evaluate(() => window.scrollTo(0, 0));
      await sleep(300);
      await page.screenshot({ path: path.join(outDir, wKey, `${name}-top.png`), fullPage: false });
      console.log(`${wKey}\t${name}\t${entry.status}\t${entry.height}px${entry.horizontalOverflow ? `\tOVERFLOW ${dims.scrollWidth}>${dims.clientWidth}` : ''}`);
    } catch (e) {
      entry.error = String(e.message || e).split('\n')[0];
      failures.push(`${wKey} ${p}: ${entry.error}`);
      console.log(`${wKey}\t${name}\tFAILED\t${entry.error}`);
    }
    manifest.pages[name] = manifest.pages[name] || {};
    manifest.pages[name][wKey] = entry;
    await page.close();
  }
  await context.close();
}
await browser.close();
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(failures.length ? `FAILURES:\n${failures.join('\n')}` : 'All captures OK');
