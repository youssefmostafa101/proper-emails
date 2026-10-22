/* One official EmailOctopus form kept inside the popup.
 * EmailOctopus submits contacts; no private API key or contact export is used.
 */
(() => {
  'use strict';
  const config=window.PROPER_EMAILS_EMAILOCTOPUS_FORM;
  const dialog=document.querySelector('[data-pe-lead-dialog]');
  const inline=document.querySelector('[data-pe-form-slot="inline"]');
  const popup=document.querySelector('[data-pe-form-slot="popup"]');
  if(!config||!dialog||!inline||!popup) return;
  if(!/^[a-f0-9-]{36}$/.test(config.formId)) throw new Error('Invalid public form ID.');
  const url=new URL(config.scriptUrl);
  if(url.origin!=='https://eomail5.com'||url.pathname!==`/form/${config.formId}.js`) throw new Error('Unexpected form embed.');
  const mount=document.createElement('div');
  mount.className='pe-octopus-form';
  popup.append(mount);
  const backdrop=document.createElement('div');
  backdrop.className='pe-lead-backdrop';
  backdrop.hidden=true;
  backdrop.setAttribute('aria-hidden','true');
  dialog.before(backdrop);
  dialog.setAttribute('aria-modal','true');
  let ready=false, returnFocus=null, timer, timeout, shownThisPage=false;
  const pageStartedAt=performance.now();
  function status(message,state='ready') {
    document.querySelectorAll('[data-pe-form-panel]').forEach(panel=>{
      const owns=panel.querySelector('[data-pe-form-slot]').contains(mount);
      panel.querySelector('[data-pe-form-panel-state]').dataset.state=state;
      const preview=panel.querySelector('[data-pe-form-preview]');
      if(preview)preview.hidden=ready;
      panel.querySelector('[data-pe-form-status]').textContent=owns?message:'Open the signup form with “Get the free playbook”.';
    });
  }
  function updateStatus() {
    status(ready?'We’ll send the playbook and practical follow-ups. Check your inbox for a confirmation request.':'Loading the secure signup form…',ready?'ready':'loading');
  }
  function show() {
    if(dialog.open) return;
    shownThisPage=true;clearTimeout(timer);
    returnFocus=document.activeElement;
    // Native showModal() would make Google's external CAPTCHA iframe inert.
    // This dialog uses a backdrop and keyboard trap so that challenge can work.
    dialog.show();
    backdrop.hidden=false;
    document.body.classList.add('pe-lead-modal-open');
    updateStatus();
    dialog.querySelector('[data-pe-lead-close]').focus();
  }
  function close(){if(dialog.open)dialog.close();}
  function schedule() {
    clearTimeout(timer);
    if(!config.autoOpen||shownThisPage)return;
    const autoOpen=()=>{
      if(shownThisPage)return;
      if(document.hidden||document.querySelector('.pe-portfolio-modal.is-open')){
        timer=setTimeout(autoOpen,250);return;
      }
      show();
    };
    timer=setTimeout(autoOpen,Math.max(0,(Number(config.delayMs)||5000)-(performance.now()-pageStartedAt)));
  }
  function finishLoading() {
    const form=mount.querySelector('form');
    if(!form||ready)return;
    ready=true;clearTimeout(timeout);observer.disconnect();
    const firstName=form.querySelector('[name="field_1"]');
    if(firstName){firstName.required=true;firstName.setAttribute('aria-required','true');firstName.autocomplete='given-name';}
    const email=form.querySelector('input[type="email"]');
    if(email)email.autocomplete='email';
    const consent=form.querySelector('input[name="consent"]');
    if(consent){consent.required=true;consent.setAttribute('aria-required','true');}
    status('We’ll send the playbook and practical follow-ups. Check your inbox for a confirmation request.');
  }
  const observer=new MutationObserver(finishLoading);
  observer.observe(mount,{childList:true,subtree:true});
  document.querySelectorAll('[data-pe-lead-open]').forEach(button=>button.addEventListener('click',show));
  dialog.querySelector('[data-pe-lead-close]').addEventListener('click',close);
  backdrop.addEventListener('click',close);
  dialog.addEventListener('close',()=>{
    backdrop.hidden=true;document.body.classList.remove('pe-lead-modal-open');updateStatus();
    if(returnFocus?.isConnected)returnFocus.focus();returnFocus=null;
  });
  document.addEventListener('keydown',event=>{
    if(!dialog.open)return;
    if(event.key==='Escape'){event.preventDefault();close();return;}
    if(event.key!=='Tab'||document.activeElement?.tagName==='IFRAME')return;
    const fields=[...dialog.querySelectorAll('a[href],button,input:not([type="hidden"]),select,textarea,summary,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);
    const first=fields[0],last=fields.at(-1);if(!first)return;
    if(event.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){event.preventDefault();first.focus();}
  });
  document.addEventListener('emailoctopus:form.success',event=>{
    if(event.detail?.form_id!==config.formId)return;
    shownThisPage=true;clearTimeout(timer);
    status('Signup received. Check your inbox for the playbook or a confirmation request.');
  });
  window.ProperEmailsLeadMagnet=Object.freeze({show,close,getState:()=>({provider:'EmailOctopus',formId:config.formId,ready,placement:'popup'})});
  status('Loading the secure signup form…','loading');
  const embed=document.createElement('script');embed.src=url.href;embed.async=true;embed.dataset.form=config.formId;
  const fail=()=>{if(!ready){observer.disconnect();status('The signup form could not load. Refresh this page or contact support@properemails.com for help signing up.','error');}};
  embed.addEventListener('error',fail,{once:true});timeout=setTimeout(fail,30000);mount.append(embed);
  schedule();
})();
