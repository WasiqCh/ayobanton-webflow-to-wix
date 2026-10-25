"""Build the old-URL -> new-URL redirect map from the crawl and the catalog mapping.

Usage: python -I scripts/build-redirects.py > data/redirects.csv
Reads data/url-inventory.csv and data/catalog-mapping.csv.
"""
import csv
import sys

# Webflow pages that are not carried over to Wix, and where their visitors should land.
DROPPED = {
    "/checkout": "/store",
    "/paypal-checkout": "/store",
    "/order-confirmation": "/store",
    "/401": "/",
}

catalog = {row["old_slug"]: row for row in csv.DictReader(open("data/catalog-mapping.csv", encoding="utf-8"))}
paths = [row["path"] for row in csv.DictReader(open("data/url-inventory.csv", encoding="utf-8"))]
paths += [p for p in DROPPED if p not in paths]

out = csv.writer(sys.stdout, lineterminator="\n")
out.writerow(["old_path", "new_path", "action", "note"])
for path in sorted(paths):
    if path in DROPPED:
        out.writerow([path, DROPPED[path], "301", "Webflow store page, not rebuilt"])
    elif path.startswith("/product/"):
        item = catalog.get(path.removeprefix("/product/"))
        if item is None:
            out.writerow([path, "", "check", "product missing from catalog mapping"])
        elif item["status"] == "renamed":
            out.writerow([path, f"/product/{item['new_slug']}", "301", f"{item['old_name']} -> {item['new_name']}"])
        elif item["status"] == "unchanged":
            out.writerow([path, path, "keep", "same name"])
        else:
            out.writerow([path, path, "pending", "extra artwork, waiting on client decision"])
    else:
        out.writerow([path, path, "keep", "rebuilt at the same URL"])
