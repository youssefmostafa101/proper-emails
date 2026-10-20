# Proper Emails website

Live at https://properemails.com using GitHub Pages from main/root. Preserve CNAME and the existing domain configuration. Do not modify portfolio-website or yusef.info.

## Working journeys

- Homepage and all booking CTAs: https://calendly.com/omar-properemails/30min
- General contact: support@properemails.com
- Client intake: /onboarding/ using existing https://formspree.io/f/xnjrlakr
- Platform invitations: yusef@properemails.com, only with agreed scoped permissions
- Complete 36-page playbook: /assets/Proper-Emails-Complete-Retention-Playbook.pdf
- Privacy: /privacy/; website terms: /terms/

The previous five-step local-only booking preview was replaced with direct booking links. The legacy ?page=onboarding route redirects to the connected intake. Portfolio images and all11 gallery entries, including four ORYN-B examples, are preserved. Images were extracted byte-for-byte from data URIs for caching and lazy loading.

## Email integration intentionally paused

No ESP is configured. The playbook is a direct download without email collection. No ESP scripts load. Approved future popup, inline fields and floating-trigger markup are preserved in the inert peFutureLeadMagnet template. Their CSS, lead-magnet.js and empty lead-magnet-config.js are retained. Do not load the integration scripts or restore capture until the owner approves a provider and the official form/list are tested. The old Sender identifiers must not be reused. Existing six-email draft assets outside the website remain untouched.

To restore signup later, replace the direct-download section/hero/floating link with the preserved template parts, adapt the chosen official provider embed, test marked internal data, and obtain separate approval before enabling collection or automation. No private API key belongs in frontend code.

## Intake and access

Required and conditional fields are validated in the six-stage form; logo and product imagery are mandatory. Success appears only after Formspree returns HTTP success. Prior end-to-end inbox receipt was confirmed by the owner. The intake is a public URL, not an authenticated portal. Do not submit credentials or customer exports. Provider spam protection remains enabled; no duplicate form was created.

## Deployment checks

Verify HTTPS homepage, intake, privacy, terms, favicon, PDF, all11 portfolio images, mobile navigation and the booking destination after publication. CNAME stays properemails.com. No DNS change or email-provider activation is part of website deployment.
