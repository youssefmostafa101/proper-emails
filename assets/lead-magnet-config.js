/* Public identifiers read from Sender's official publishing settings.
 * Local QA only: visit the loopback preview with ?senderQa=1.
 * This is a real Sender form, not a sandbox. Use marked synthetic data only.
 * Form ejRpWR targets group eVy1LW in Sender; the form is currently DRAFT.
 * No API token is present, and this file does not publish forms or workflows.
 */
(() => {
  'use strict';
  const loopback = ['localhost', '127.0.0.1', '[::1]', '::1'].includes(window.location.hostname);
  const requested = new URLSearchParams(window.location.search).get('senderQa') === '1';
  if (!loopback || !requested) return;

  window.PROPER_EMAILS_SENDER_FORM = Object.freeze({
    accountPublicId: 'ecf27717559586',
    formId: 'ejRpWR',
    scriptUrl: 'https://cdn.sender.net/accounts_resources/universal.js',
    testMode: true,
    autoOpen: false
  });
})();
