/* Public Sender embed only. No subscriber data is read or submitted by this file.
 * Configure with the real IDs from Sender after verifying first name, email,
 * required unchecked marketing consent, the single target group, and opt-in.
 * Official SDK: https://api.sender.net/javascript-sdk/explicit-form-rendering/
 */
(() => {
  'use strict';

  const dialog = document.querySelector('[data-pe-lead-dialog]');
  const section = document.querySelector('[data-pe-lead-section]');
  const inlineSlot = document.querySelector('[data-pe-form-slot="inline"]');
  const popupSlot = document.querySelector('[data-pe-form-slot="popup"]');
  if (!dialog || !section || !inlineSlot || !popupSlot) return;

  const panels = [...document.querySelectorAll('[data-pe-form-panel]')];
  const storageKey = 'properemails.playbook.dismissed.v1';
  let configuration = null;
  let providerMount = null;
  let providerReady = false;
  let providerState = 'setup';
  let providerTimeout = null;
  let automaticTimer = null;
  let returnFocus = null;
  let automaticShown = false;
  let renderRequested = false;

  const copy = {
    setup: 'Staging preview: signups are paused while we finish testing. Nothing is submitted.',
    loading: 'Loading the signup form. Please wait before entering your details.',
    test: 'Staging test form: use clearly marked test details only. Follow any email confirmation prompt.',
    live: 'Submit the form to request your playbook and retention emails. Follow any email confirmation prompt.',
    error: 'The signup form could not load. Nothing has been submitted here. Please try again later.',
    moved: 'The same signup form is currently open in the popup.'
  };

  function announce() {
    for (const panel of panels) {
      const slot = panel.querySelector('[data-pe-form-slot]');
      const ownsForm = Boolean(providerMount && slot.contains(providerMount));
      const active = providerReady && ownsForm;
      panel.dataset.state = providerState;
      panel.querySelector('[data-pe-form-panel-state]').dataset.state = providerState;
      panel.querySelector('[data-pe-form-preview]').hidden = active;
      const status = panel.querySelector('[data-pe-form-status]');
      status.textContent = providerReady
        ? (ownsForm ? (configuration.testMode ? copy.test : copy.live) : copy.moved)
        : copy[providerState];
    }
    window.dispatchEvent(new CustomEvent('properemails:lead-form-state', {
      detail: getState()
    }));
  }

  function getState() {
    return Object.freeze({
      configured: Boolean(configuration),
      state: providerState,
      formId: configuration ? configuration.formId : null,
      testMode: configuration ? configuration.testMode : true,
      placement: dialog.open ? 'popup' : 'inline',
      automaticPopupEnabled: Boolean(configuration && configuration.autoOpen && !configuration.testMode)
    });
  }

  function moveForm(slot) {
    if (providerMount && providerMount.parentElement !== slot) slot.append(providerMount);
    announce();
  }

  function recentlyDismissed() {
    try {
      const time = Number(window.localStorage.getItem(storageKey));
      const age = Date.now() - time;
      return Number.isFinite(time) && time > 0 && age >= 0 && age < 7 * 86400000;
    } catch (_) {
      // Storage can be unavailable in private browsing; the page still works.
      return false;
    }
  }

  function rememberDismissal() {
    try { window.localStorage.setItem(storageKey, String(Date.now())); } catch (_) { /* Optional preference only. */ }
  }

  function show() {
    if (dialog.open) return;
    if (typeof dialog.showModal !== 'function') {
      section.scrollIntoView({ block: 'start', behavior: 'auto' });
      section.focus({ preventScroll: true });
      return;
    }
    returnFocus = document.activeElement;
    dialog.showModal();
    moveForm(popupSlot);
    document.body.classList.add('pe-lead-modal-open');
    dialog.querySelector('[data-pe-lead-close]').focus({ preventScroll: true });
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  function scheduleAutomaticPopup() {
    window.clearTimeout(automaticTimer);
    if (!configuration || !providerReady || !configuration.autoOpen || configuration.testMode || automaticShown || recentlyDismissed()) return;
    automaticTimer = window.setTimeout(() => {
      if (document.hidden || dialog.open || document.querySelector('dialog[open]') || section.closest('.hidden') || recentlyDismissed()) return;
      automaticShown = true;
      show();
    }, configuration.delayMs);
  }

  function markReady(formId) {
    if (!configuration || formId !== configuration.formId) return;
    window.clearTimeout(providerTimeout);
    providerReady = true;
    providerState = 'ready';
    providerMount.hidden = false;
    announce();
    scheduleAutomaticPopup();
  }

  function fail() {
    window.clearTimeout(providerTimeout);
    providerReady = false;
    providerState = 'error';
    if (providerMount) providerMount.hidden = true;
    announce();
  }

  function renderConfiguredForm() {
    if (!configuration || providerReady || renderRequested || !window.senderForms || typeof window.senderForms.render !== 'function') return;
    try {
      renderRequested = true;
      window.senderForms.render(configuration.formId, {
        initialStatus: 'enabled',
        onRender: markReady
      });
      if (typeof window.senderForms.getStatus === 'function' && window.senderForms.getStatus(configuration.formId)[configuration.formId] === 'enabled') {
        markReady(configuration.formId);
      }
    } catch (_) { fail(); }
  }

  function validateConfiguration(options) {
    if (!options || typeof options !== 'object') throw new TypeError('Sender public embed configuration is required.');
    const idPattern = /^[A-Za-z0-9_-]{1,128}$/;
    if (!idPattern.test(options.formId || '') || !idPattern.test(options.accountPublicId || '')) {
      throw new TypeError('Use the actual Sender public account ID and form ID.');
    }
    const url = new URL(options.scriptUrl);
    if (url.protocol !== 'https:' || url.hostname !== 'cdn.sender.net' || url.pathname !== '/accounts_resources/universal.js' || url.username || url.password || url.port) {
      throw new TypeError('Use the public HTTPS Sender universal.js embed URL from the account.');
    }
    url.search = '';
    url.searchParams.set('explicit', 'true');
    url.searchParams.set('onload', 'properEmailsSenderFormsReady');
    return Object.freeze({
      formId: options.formId,
      accountPublicId: options.accountPublicId,
      scriptUrl: url.href,
      testMode: options.testMode !== false,
      autoOpen: options.autoOpen === true,
      delayMs: Math.max(10000, Number(options.delayMs) || 25000)
    });
  }

  function configure(options) {
    const next = validateConfiguration(options);
    if (configuration) {
      if (configuration.formId !== next.formId || configuration.accountPublicId !== next.accountPublicId) {
        throw new Error('Only one Sender form/account can be configured on this page.');
      }
      return getState();
    }
    configuration = next;
    providerState = 'loading';
    providerMount = document.createElement('div');
    providerMount.className = 'sender-form-field';
    providerMount.dataset.senderFormId = configuration.formId;
    providerMount.dataset.peProviderMount = '';
    (dialog.open ? popupSlot : inlineSlot).append(providerMount);
    announce();

    // Use Sender's documented queue and public account ID; never an API key.
    window.Sender = 'sender';
    if (typeof window.sender !== 'function') {
      const queue = function () { (queue.q = queue.q || []).push(arguments); };
      queue.l = Date.now();
      queue.on = function (event, callback) {
        queue.listeners = queue.listeners || {};
        (queue.listeners[event] = queue.listeners[event] || []).push(callback);
      };
      window.sender = queue;
    }
    window.properEmailsSenderFormsReady = renderConfiguredForm;
    window.addEventListener('onSenderFormsLoaded', renderConfiguredForm);
    providerTimeout = window.setTimeout(fail, 25000);
    window.sender(configuration.accountPublicId);
    const script = document.createElement('script');
    script.src = configuration.scriptUrl;
    script.async = true;
    script.dataset.peSenderEmbed = '';
    script.addEventListener('error', fail, { once: true });
    document.head.append(script);
    if (window.senderFormsLoaded) renderConfiguredForm();
    return getState();
  }

  document.querySelectorAll('[data-pe-lead-open]').forEach(button => {
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', dialog.id);
    button.addEventListener('click', show);
  });
  dialog.querySelector('[data-pe-lead-close]').addEventListener('click', close);
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
  });
  dialog.addEventListener('close', () => {
    rememberDismissal();
    document.body.classList.remove('pe-lead-modal-open');
    moveForm(inlineSlot);
    if (returnFocus && returnFocus.isConnected && typeof returnFocus.focus === 'function') returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  });

  window.ProperEmailsLeadMagnet = Object.freeze({ configure, show, close, getState });
  announce();
  if (window.PROPER_EMAILS_SENDER_FORM) configure(window.PROPER_EMAILS_SENDER_FORM);
})();
