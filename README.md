# Proper Emails website

Live at https://properemails.com using GitHub Pages from main/root. Preserve CNAME and the existing domain configuration. Do not modify portfolio-website, yusef.info, or ORYN-B.

## Working journeys

- Booking: https://calendly.com/omar-properemails/30min
- Contact: support@properemails.com
- Client intake: /onboarding/ using https://formspree.io/f/xnjrlakr
- Playbook signup: /#playbook; the download arrives by email after confirmation.
- Blog: /blog/; privacy: /privacy/; terms: /terms/

All 11 portfolio gallery entries and the existing intake remain intact. Portfolio concepts do not claim campaign results.

## EmailOctopus playbook signup

The hero, playbook section and floating button open one branded popup. Its single official EmailOctopus form stays mounted inside the popup so reopening it does not destroy Google's reCAPTCHA frame. First name, email and unchecked explicit marketing consent are required. The popup opens automatically five seconds after page initialization on each visit, independently of the form's loading time. Old dismissal/subscription timestamps no longer suppress it. Opening it manually prevents another automatic interruption on that page load. No popup preferences or contact information are saved in browser storage.

All website and blog playbook CTAs lead to signup. There are no direct PDF download links in the homepage, popup, blog or JavaScript-disabled fallback. The already-tested email sequence retains its PDF URL so confirmed subscribers can download from their email. The PDF remains a public delivery asset; GitHub Pages does not enforce subscriber authentication on the file itself.

- Public form: 9397ff8e-cdfd-11f1-968a-21b524e7af65
- Official embed: https://eomail5.com/form/9397ff8e-cdfd-11f1-968a-21b524e7af65.js
- List: 2a866816-cd92-11f1-8a08-57fc16d8f9d1
- Configuration: assets/lead-magnet-octopus-config.js
- Popup adapter: assets/lead-magnet-octopus.js

The form ID is public. No private API key belongs in website code. Legacy Sender scripts remain unused and are never loaded. Do not reuse their identifiers. Keep reCAPTCHA, the provider honeypot, unsubscribe links and the free-plan EmailOctopus attribution intact.

Double opt-in is enabled: visitors confirm their email before entering the sequence. Sender name is Proper Emails; sender/reply address is hello@properemails.com on the verified domain. Emails also link to support@properemails.com. The account's mailing address stays private; the native SenderInfo tag supplies EmailOctopus's private return-address service. Never hardcode the owner's private address.

## Daily six-email sequence

Email 1 delivers the PDF immediately after confirmation. Emails 2–6 follow at 24-hour intervals. This is one six-email sequence per subscriber; it does not repeat indefinitely. The Starter plan's five-step limit is handled with three linked automations:

| Automation | Steps | ID |
| --- | --- | --- |
| PE Playbook 01 — Delivery + first check | W01 → wait 1 day → W02 → wait 1 day → trigger 02 | 4a96a890-cd93-11f1-8090-8d47d9604576 |
| PE Playbook 02 — Flow priorities + campaigns | W03 → wait 1 day → W04 → trigger 03 | 5e575ffc-ce18-11f1-8f8a-23e6c9300b4c |
| PE Playbook 03 — Design system + next step | wait 1 day → W05 → wait 1 day → W06 | 23786c2c-ce19-11f1-81be-25d001c8b063 |

Automation 01 enrolls newly added contacts whose Source is Form; dashboard additions, API contacts and imports are excluded. Automations 02 and 03 are triggered only by the preceding automation. Repetition is disabled. Enable continuations before the first automation. Pause before editing. No paid upgrade, existing-list broadcast or contact import is required.

All six emails use the owner's exact assets/brand/favicon-1024.png image, a 64-pixel lime mark on a dark rounded square. They include the actual PDF/booking links and native UnsubscribeURL, SenderInfo, and RewardsURL tags.

## Editing and reports

In EmailOctopus, open Automations, pause the relevant flow, click its email and edit Setup or Content. Preview desktop/mobile and send a test to an approved internal address. Resume continuation 03, continuation 02, then automation 01. Do not remove waits or change the source filter accidentally.

EmailOctopus Reports shows sends, delivery, opens, clicks and unsubscribes. Opens are estimates affected by mail-client privacy features. GitHub Pages does not provide a visitor analytics dashboard.

Google Analytics 4 uses the owner's Proper Emails stream `G-0K78J4R1H6`. The shared `assets/analytics.js` loader is included once on the homepage, legal/intake pages and generated blogs. Optional analytics loads after a visitor accepts; the footer's Analytics settings button allows changing that choice. Only that choice is stored for up to 180 days. Advertising features and Google signals are disabled. The loader never reads form answers, redacts non-marketing URL parameters/referrer queries, and does not run on local previews. Browser consent/ad blockers can reduce measured traffic. Site events are not proof of a confirmed subscription, completed booking or purchase.

The four owner-provided social profiles are shown in the footer and in the organization identity metadata. The supplied 1024px lime logo is the primary favicon and organization/publisher logo. Google controls logo selection and recrawl timing; this does not promise a search-result logo or ranking. Keep `content/blog.json` and the blog generator as the source for future posts.

## Validation and deployment

The owner approved internal testing at yusef@properemails.com and activation after tests pass. All six original test messages were received. The complete signup submission succeeded with the official form and reCAPTCHA. The owner confirmed the confirmation email, automatic W01 delivery with the exact lime logo, and working PDF download. All three automations are active on the daily schedule.

Run node scripts/test-blog.mjs, syntax-check the adapter, check local links and review the diff. After deployment, verify HTTPS homepage, popup, PDF, privacy, intake, booking, blog and portfolio. CNAME stays properemails.com. This migration does not require DNS changes.
