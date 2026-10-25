"""Crawl a live site's internal links and print every URL with its HTTP status.

Usage: python -I scripts/crawl.py https://www.ayobanton.com > data/url-inventory.csv
"""
import csv
import re
import sys
import urllib.parse
import urllib.request
from collections import deque

sys.stdout.reconfigure(encoding="utf-8", newline="")
root = sys.argv[1].rstrip("/")
host = urllib.parse.urlparse(root).netloc
seen, queue = set(), deque(["/"])
out = csv.writer(sys.stdout)
out.writerow(["path", "status", "title"])
while queue:
    path = queue.popleft()
    if path in seen:
        continue
    seen.add(path)
    try:
        req = urllib.request.Request(root + path, headers={"User-Agent": "migration-crawler"})
        with urllib.request.urlopen(req, timeout=20) as r:
            status, html = r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        status, html = e.code, ""
    except urllib.error.URLError as e:
        status, html = f"error: {e.reason}", ""
    title = re.search(r"<title>(.*?)</title>", html, re.S)
    out.writerow([path, status, title.group(1).strip() if title else ""])
    for href in re.findall(r'href="([^"#?]+)', html):
        u = urllib.parse.urlparse(urllib.parse.urljoin(root + path, href))
        if u.scheme in ("http", "https") and u.netloc in ("", host) and not re.search(r"\.(css|js|png|jpe?g|webp|svg|ico|xml|pdf)$", u.path):
            p = u.path.rstrip("/") or "/"
            if p not in seen:
                queue.append(p)
