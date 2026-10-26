/* Proper Emails GA4. Optional analytics loads only after visitor consent.
 * No form values, email addresses, user IDs or advertising features are sent.
 */
(() => {
  'use strict';
  if(!['properemails.com','www.properemails.com'].includes(location.hostname))return;
  const id='G-0K78J4R1H6', key='properemails.analytics-choice.v1';
  let loaded=false;
  const read=()=>{try{const saved=JSON.parse(localStorage.getItem(key));return saved?.expires>Date.now()?saved.value:null;}catch{return null;}};
  const remember=value=>{try{localStorage.setItem(key,JSON.stringify({value,expires:Date.now()+180*86400000}));}catch{/* Choice remains usable for this page. */}};
  function start() {
    window['ga-disable-'+id]=false;
    if(loaded){window.gtag('consent','update',{analytics_storage:'granted'});return;}
    loaded=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('set','ads_data_redaction',true);
    window.gtag('js',new Date());
    const page=new URL(location.href);
    const allowed=new Set(['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id']);
    for(const name of [...page.searchParams.keys()])if(!allowed.has(name))page.searchParams.delete(name);
    page.hash='';
    let referrer='';try{const previous=new URL(document.referrer);referrer=previous.origin+previous.pathname;}catch{/* No valid referrer. */}
    window.gtag('config',id,{allow_google_signals:false,allow_ad_personalization_signals:false,page_location:page.href,page_referrer:referrer});
    const tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+id;tag.dataset.peAnalytics='';document.head.append(tag);
  }
  function stop() {
    window['ga-disable-'+id]=true;
    if(loaded)window.gtag('consent','update',{analytics_storage:'denied'});
    for(const cookie of document.cookie.split(';')){
      const name=cookie.split('=')[0].trim();if(!/^_ga(?:_|$)/.test(name))continue;
      for(const domain of ['',location.hostname,'.'+location.hostname])document.cookie=name+'=; Max-Age=0; Path=/; SameSite=Lax; Secure'+(domain?'; Domain='+domain:'');
    }
  }
  const panel=document.createElement('section');panel.className='pe-analytics-choice';panel.setAttribute('aria-label','Analytics preferences');panel.hidden=true;
  const title=document.createElement('strong');title.textContent='A little insight. Your choice.';
  const text=document.createElement('p');text.textContent='Allow optional Google Analytics cookies to help us understand which pages are useful? Your form answers are not sent to Google.';
  const actions=document.createElement('div');actions.className='pe-analytics-actions';
  const accept=document.createElement('button');accept.type='button';accept.textContent='Allow analytics';
  const reject=document.createElement('button');reject.type='button';reject.textContent='No thanks';reject.className='pe-analytics-reject';
  const privacy=document.createElement('a');privacy.href='/privacy/';privacy.textContent='Privacy';
  actions.append(accept,reject,privacy);panel.append(title,text,actions);document.body.append(panel);
  function choose(value){remember(value);value==='granted'?start():stop();panel.hidden=true;}
  accept.addEventListener('click',()=>choose('granted'));reject.addEventListener('click',()=>choose('denied'));
  document.querySelectorAll('[data-pe-analytics-settings]').forEach(button=>button.addEventListener('click',()=>{panel.hidden=false;accept.focus();}));
  const saved=read();
  if(saved==='granted')start();else{stop();if(saved!=='denied')panel.hidden=false;}
})();
