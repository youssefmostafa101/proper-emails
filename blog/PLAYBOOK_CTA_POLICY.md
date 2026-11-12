# Blog Playbook CTA policy

## Current rule — approved direction received 12 November 2026

**All Proper Emails blog articles must ask readers to opt in before receiving the Retention Playbook.**

The homepage currently contains an EmailOctopus signup form in the section `https://properemails.com/#playbook`. The website describes email confirmation before Playbook delivery. Do not create a separate form, collect contact data through an unapproved endpoint, or promise successful delivery without an end-to-end test.

### Required implementation

- Every Playbook link in `blog/` must point to **`/#playbook`**.
- Blog articles should use transparent consent-oriented wording, such as **“Sign up for the free Retention Playbook. Confirm your email address to receive it by email.”**
- Do **not** link from a blog directly to `/assets/Proper-Emails-Complete-Retention-Playbook.pdf`, a new unsecured copy, or any direct Playbook file URL.
- Do **not** claim “no signup required”, “no email required”, “download directly” or “direct PDF download” in the blog.
- Maintain a clear link to the website's privacy information and consent disclosure through the real signup experience. Do not imply the blog itself collects or stores emails.
- Before publication, review the current homepage form, test email submission, confirmation and delivery with a consenting tester, and verify desktop/mobile behavior. If the opt-in isn't operational, report the issue and hold publishing rather than replacing the CTA with a direct file link.
- Obtain Yusef's technical/brand approval before merging changes to the live site. No unverified marketing claims or tracking assumptions.

### Enforcement

`python3 scripts/check_blog_playbook_optin.py` checks the entire `blog/` HTML tree for direct Playbook downloads, misleading ungated wording and inconsistent Playbook CTAs. The GitHub Actions `blog-playbook-optin.yml` workflow runs the same check on pull requests and on main-branch pushes.

**Technical caveat:** The PDF may still exist as a publicly reachable static asset for earlier recipients or anyone who has its URL. Changing blog CTAs is not equivalent to enforcing authenticated access to the file. Actual file-level gating and the EmailOctopus delivery setup require a separately reviewed implementation decision.
