---
{
  "status": "ready",
  "title": "Cart abandonment vs. checkout abandonment: what changes in your emails?",
  "seoTitle": "Cart vs. Checkout Abandonment: Email Strategy | Proper Emails",
  "description": "Learn the difference between cart and checkout abandonment, choose the right email trigger, and prevent overlapping Klaviyo recovery messages.",
  "slug": "cart-abandonment-vs-checkout-abandonment",
  "date": "2026-10-21",
  "category": "Lifecycle strategy",
  "hero": "journey",
  "author": "Proper Emails",
  "summary": "Adding a product to a cart and starting checkout are different moments. Your recovery emails should know which one actually happened.",
  "keywords": ["cart abandonment vs checkout abandonment", "abandoned cart email flow", "Klaviyo Added to Cart", "Started Checkout flow"],
  "image": "/assets/blog/cart-checkout.png",
  "imageAlt": "An illustrative customer journey from adding a product to cart, to starting checkout, to placing an order",
  "ctaLabel": "Get the free Retention Playbook",
  "ctaUrl": "/#playbook",
  "editorialNote": "Written by Proper Emails using current Klaviyo documentation. The scenarios, copy examples and review process are educational proposals, not client results or a universal account configuration.",
  "sources": [
    {"label": "Klaviyo: How to create an abandoned cart flow", "url": "https://help.klaviyo.com/hc/en-us/articles/115002779411"},
    {"label": "Klaviyo: How to create an abandoned Added to Cart flow for Shopify", "url": "https://help.klaviyo.com/hc/en-us/articles/35510464880027"},
    {"label": "Klaviyo: Flow glossary", "url": "https://help.klaviyo.com/hc/en-us/articles/360054130591"}
  ]
}
---
## The difference in one minute

**Cart abandonment** means someone added a product to their cart but did not complete an order. When separating recovery stages, use it for shoppers who have not yet started checkout. **Checkout abandonment** means they began checkout but left before purchasing.

The label on a flow can hide this distinction. Klaviyo uses “abandoned cart” as an umbrella term for flows triggered by either `Added to Cart` or `Started Checkout`. Inspect the actual event, not just the template name. [1](#source-1)

| Stage | What you know | A useful message focus |
| --- | --- | --- |
| Added to cart | A product made it into the basket | Help the shopper reconsider that product |
| Started checkout | The shopper moved toward completing an order | Help them resume and resolve purchase questions |
| Placed order | A purchase was recorded | End recovery; move into the appropriate customer journey |

This is a planning distinction, not a promise about why a particular person left. A cart event does not tell you that someone needs a discount. A checkout event does not prove shipping was the problem.

## Start with the event, not the email design

Before writing recovery copy, ask your implementation lead to show you one real event payload for each relevant stage. An event payload is the information your store passes to the email platform when an action happens.

For Shopify, Klaviyo's current guidance says `Added to Cart` tracking needs the app embed and behavioral-event setting enabled. Availability and payload details depend on the integration. [2](#source-2)

Your review should answer four practical questions:

- What exact event enters this flow?
- Can the system identify an eligible recipient?
- Which product and destination fields are actually available?
- What event removes the person once they progress or buy?

Write the answers beside your brief. “Abandoned cart sequence” is too vague for a reliable handoff; “Added to Cart, excluding people who progress to checkout or purchase” tells the team what to verify.

## Change the message when the customer moment changes

The following examples are hypothetical. They illustrate a copy decision, not campaigns we claim to have run.

### After adding to cart: help with the product decision

Imagine a shopper adds a travel bottle, then leaves. A useful email could remind them which bottle they considered and answer one real question: capacity, care, materials or how it fits into a bag.

An illustrative subject line is **“A closer look at the bottle you saved.”** The body can connect one verified feature to a practical use, followed by an accurate return destination.

Avoid saying “Finish your checkout” if the available event only shows an add-to-cart action. Avoid pretending an item is reserved or selling out unless your actual systems and stock position support that statement.

### After starting checkout: help with the purchase decision

Now imagine the same shopper started checkout. The message can acknowledge the unfinished order and make the next step easy to understand.

An illustrative subject line is **“Still considering your order?”** Supporting copy might point to the store's actual delivery, returns or payment information. Do not invent a reason for the abandonment or claim that a payment failed unless that fact is known.

Both emails can be concise. They serve different jobs because the evidence about the customer's journey is different.

## Prevent overlapping recovery messages

Separate flows need a deliberate relationship. Otherwise a shopper can progress to checkout while still waiting for a cart-stage message.

Klaviyo recommends a `Started Checkout zero times since starting this flow` filter on its `Added to Cart` flow to prevent that overlap. A `Placed Order zero times since starting this flow` filter excludes purchasers from recovery messaging. Confirm these against your integration and test the behavior in your own account. [1](#source-1)

Here is a hypothetical QA journey:

1. A permitted internal test profile adds a product to the cart.
2. The team confirms that the cart-stage flow sees the expected event.
3. The same profile starts checkout before the first cart-stage message.
4. The team verifies that the earlier flow no longer sends its pending recovery email.
5. A test purchase is recorded through the store's approved test process.
6. The team confirms that recovery messages stop after purchase.

The important evidence is what the account actually does. A filter visible in a screenshot is a configuration check; a completed test journey is a behavior check. They answer different questions.

> **Eligibility comes first.** Tracking an event does not itself grant permission to send marketing. Follow the account's consent, suppression and platform requirements. Get qualified advice for jurisdiction-specific legal questions.

## Choose timing and incentives deliberately

Do not copy a universal “send after exactly one hour” rule into every account. Use the store's buying context, message volume, delivery promises and actual results to set a starting hypothesis.

For a considered purchase, product questions may deserve more space than a discount. For a straightforward replenishment item, clarity about the product and destination may be enough. These are briefing choices to test, not predictions about conversion.

Treat incentives as a commercial decision. A coupon changes the economics of an order. Confirm eligibility, expiry, exclusions and margin with the owner before writing it into a live flow. Never invent urgency to make a reminder feel stronger.

## Check the mobile journey before you launch

A good recovery email should survive the whole path from preview to store.

- Read the subject and preview text together. Are they accurate for this stage?
- Check product names, variants and images against a real approved test event.
- Open the destination on a phone. Does it take the recipient where the copy promises?
- Check headline, button and supporting text without relying on images loading.
- Inspect purchase and stage-change exclusions, not only the initial trigger.
- Confirm who owns approval and who can activate the messages.

The email should look like the client's brand. Proper Emails' own palette belongs on our guides and collateral, not automatically on every client's campaigns.

## Measure a useful outcome

Review cart-stage and checkout-stage behavior separately. A combined number can hide which part of the journey needs attention.

Useful questions include whether the correct people entered, whether links worked, whether recipients clicked or purchased, and whether complaints or unsubscribes changed. Use actual account data and the platform's metric definitions.

Attributed orders are not proof that every order was caused by the email. If you want to discuss incremental impact, agree on an appropriate test design and the business decision it should inform. Avoid turning an attribution report into an unsupported profit claim.

## Your next brief can be one sentence

Try this: **“Build separate messages for the cart and checkout stages, verify the actual triggers, exclude people who progress or buy, and make each message answer one real customer question.”**

That brief is specific enough to review and simple enough to explain to the founder. For the broader context, see [how Proper Emails approaches retention](/#approach) and our [lifecycle email services](/#services).
