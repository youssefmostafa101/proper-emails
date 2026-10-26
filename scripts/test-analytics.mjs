import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url), source=fs.readFileSync(new URL('assets/analytics.js',root),'utf8');
const id='G-0K78J4R1H6', key='properemails.analytics-choice.v1';
function page(saved=null,hostname='properemails.com'){
  const storage=new Map(saved?[[key,JSON.stringify({value:saved,expires:Date.now()+100000})]]:[]);
  class Node{children=[];hidden=false;dataset={};listeners={};append(...nodes){this.children.push(...nodes);}setAttribute(){}addEventListener(event,fn){this.listeners[event]=fn;}click(){this.listeners.click();}focus(){}}
  const head=new Node(),body=new Node(),settings=new Node();
  const document={head,body,cookie:'',referrer:'https://example.com/article?email=private%40example.com',createElement:()=>new Node(),querySelectorAll:selector=>selector==='[data-pe-analytics-settings]'?[settings]:[]};
  const window={}, location={hostname,href:`https://${hostname}/blog/?email=private%40example.com&utm_source=newsletter#hidden`};
  vm.runInNewContext(source,{window,document,location,URL,Set,Date,localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}});
  const panel=body.children[0],actions=panel?.children[2];
  return {window,head,panel,settings,accept:actions?.children[0],reject:actions?.children[1],storage};
}
const blank=page();assert.equal(blank.head.children.length,0,'no Google tag before consent');assert.equal(blank.panel.hidden,false);
blank.reject.click();assert.equal(blank.head.children.length,0);assert.equal(blank.window['ga-disable-'+id],true);assert.equal(JSON.parse(blank.storage.get(key)).value,'denied');
const denied=page('denied');assert.equal(denied.head.children.length,0);assert.equal(denied.panel.hidden,true);
const accepted=page();accepted.accept.click();assert.equal(accepted.head.children.length,1);assert.equal(accepted.head.children[0].src,'https://www.googletagmanager.com/gtag/js?id='+id);
const commands=accepted.window.dataLayer.map(a=>[...a]);const config=commands.find(a=>a[0]==='config');assert.equal(config[1],id);assert.equal(config[2].page_location,'https://properemails.com/blog/?utm_source=newsletter');assert.equal(config[2].page_referrer,'https://example.com/article');assert.equal(config[2].allow_google_signals,false);assert.equal(config[2].allow_ad_personalization_signals,false);
assert.equal(commands.find(a=>a[0]==='consent')[2].ad_storage,'denied');accepted.settings.click();accepted.accept.click();assert.equal(accepted.head.children.length,1,'no duplicate tag on repeated consent');
accepted.settings.click();accepted.reject.click();assert.equal(accepted.window['ga-disable-'+id],true);assert.equal(accepted.window.dataLayer.at(-1)[2].analytics_storage,'denied');
const returning=page('granted');assert.equal(returning.head.children.length,1);assert.equal(returning.panel.hidden,true);
assert.equal(page('granted','localhost').head.children.length,0,'local previews do not pollute production stats');
const files=['index.html','onboarding/index.html','privacy/index.html','terms/index.html',...JSON.parse(fs.readFileSync(new URL('content/generated-blog.json',root),'utf8')).filter(p=>p.endsWith('.html'))];
const socialUrls=JSON.parse(fs.readFileSync(new URL('content/blog.json',root),'utf8')).socials.map(s=>s.url);
for(const file of files){const html=fs.readFileSync(new URL(file,root),'utf8');assert.equal((html.match(/src="\/assets\/analytics\.js"/g)||[]).length,1,file+' has one analytics loader');assert.ok(html.includes('data-pe-analytics-settings'));assert.ok(html.includes('href="/assets/brand/favicon-1024.png"'));for(const url of socialUrls)assert.ok(html.includes(url.replaceAll('&','&amp;')),file+' has '+url);}
const home=fs.readFileSync(new URL('index.html',root),'utf8');const org=JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);assert.equal(org.logo.url,'https://properemails.com/assets/brand/favicon-1024.png');assert.deepEqual(org.sameAs,socialUrls);
console.log('Analytics behavior passed: consent gating, rejection/revocation, one tag, remembered choice, no preview traffic, URL redaction, ads disabled; '+files.length+' pages have social links, favicon and tracking.');
