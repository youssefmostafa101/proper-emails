#!/usr/bin/env python3
"""Enforce opt-in-only Playbook links in Proper Emails blog HTML."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "blog"
OPTIN = "/#playbook"
errors = []

if not BLOG.is_dir():
    errors.append("Missing blog/ directory")

for path in sorted(BLOG.rglob("*.html")) if BLOG.is_dir() else []:
    html = path.read_text(encoding="utf-8")
    rel = path.relative_to(ROOT)
    # A direct PDF reference in a blog must not bypass the opt-in.
    if re.search(r"Proper-Emails-Complete-Retention-Playbook\.pdf", html, re.I):
        errors.append(f"{rel}: direct Playbook PDF URL present")

    forbidden = [
        r"no\s+(?:email\s+)?signup\s+required",
        r"no\s+email\s+address\s+required",
        r"direct\s+(?:PDF\s+)?download",
        r"download\s+the\s+PDF\s+directly",
        r"no\s+signup\s+needed",
    ]
    for pattern in forbidden:
        if re.search(pattern, html, re.I):
            errors.append(f"{rel}: misleading no-opt-in wording ({pattern})")

    # Every Playbook-labelled link must point to the same approved opt-in.
    links = re.findall(r'<a\b([^>]*?)>(.*?)</a>', html, re.I | re.S)
    for attrs, body in links:
        label = re.sub(r"<[^>]+>", " ", body)
        if not re.search(r"playbook", label, re.I):
            continue
        href = re.search(r'''href=["']([^"']+)["']''', attrs, re.I)
        url = href.group(1) if href else ""
        if url != OPTIN:
            errors.append(f"{rel}: Playbook link must use {OPTIN}, found {url!r}")

    if rel.as_posix().startswith("blog/posts/"):
        cta = re.search(r'<section class="article-cta">([\s\S]*?)</section>', html)
        if not cta or f'href="{OPTIN}"' not in cta.group(1):
            errors.append(f"{rel}: article CTA must point to {OPTIN}")

homepage = ROOT / "index.html"
if homepage.is_file():
    site = homepage.read_text(encoding="utf-8")
    if 'id="playbook"' not in site or "data-pe-lead-open" not in site:
        errors.append("Homepage opt-in section missing or changed; revalidate before merging")

if errors:
    print("Blog Playbook opt-in policy violations:")
    for issue in errors:
        print(" -", issue)
    sys.exit(1)
print("PASS: No blog Playbook link bypasses the opt-in section.")
