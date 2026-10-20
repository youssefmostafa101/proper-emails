# Proper Emails — GitHub Pages staging package

This package uses the approved **Concept 03 homepage** (including the ORYN-B portfolio) and **Onboarding V2**. It is safe to publish to a PREVIEW URL, not yet to `properemails.com`.

## Structure

- `index.html`: approved public homepage with ORYN-B portfolio and scroll animation.
- `onboarding/index.html`: approved six-part client onboarding at `/onboarding/` and `/onboarding/#intake`.
- `assets/Proper-Emails-Complete-Retention-Playbook.pdf`: complete, all-in-one free resource for use in Sender.net Welcome Email #1.
- `robots.txt`, `.nojekyll`: site metadata.

## What is connected

- **Calendly**: Final booking step links to `https://calendly.com/omar-properemails/30min`.
- **Formspree**: The onboarding form posts to the existing `https://formspree.io/f/xnjrlakr` endpoint. Success is only shown when Formspree returns HTTP success; failures display a retry message. This is ready for a real test but account delivery and spam handling have NOT been independently verified.
- **Platform invitations**: `yusef@properemails.com`. General contact: `support@properemails.com`.

## Still required before domain launch

1. Create a **NEW separate GitHub repository**, e.g. `proper-emails-website` (do not use `portfolio-website`, which has CNAME `yusef.info`). Upload this package preserving folders.
2. Enable GitHub Pages from the main branch root; verify the generated `github.io/<repo>/` preview and `.../onboarding/`.
3. From your signed-in Formspree dashboard, rename the Client Intake form if desired; check its notification recipients, spam settings and that the fields arrive. Test with clearly marked **TEST** values and avoid confidential test credentials.
4. Set up a separate Sender.net group and form. Connect the first name + email + consent popup, then attach the playbook link to Welcome Email #1. Do not ship a dummy popup.
5. Confirm Omar's Calendly availability and any qualification data routing; currently qualification choices are displayed but NOT delivered to Omar.
6. After QA, remove the staging ribbon and homepage `noindex` meta, then attach the custom domain `properemails.com` in GitHub Pages and configure DNS with the registrar. **Never copy `yusef.info` CNAME into this repository.**
7. If client intake privacy needs authentication, add an actual access-control service; a direct URL and `noindex` do NOT make the page confidential.

## Formspree notes

The approved intake currently requires brand assets and a shared folder link. Dropdown 'Other' entries reveal and require explanatory text. The form sends to Formspree only after final-stage client-side validation. Server-side validation and consent policies remain to be reviewed.

No website is live just because this ZIP exists; uploading/configuring GitHub Pages is a separate action.
