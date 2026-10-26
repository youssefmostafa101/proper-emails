const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={
  LinkedIn:'<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.1 20.45H3.54V9H7.1v11.45Z"/>',
  Facebook:'<path d="M14.3 22v-9.12h3.06l.46-3.56H14.3V7.05c0-1.03.28-1.73 1.76-1.73h1.88V2.14A25.1 25.1 0 0 0 15.2 2c-2.72 0-4.59 1.66-4.59 4.7v2.62H7.54v3.56h3.07V22h3.69Z"/>',
  X:'<path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.4l-5-6.6L6 22H2.9l7.3-8.4L.8 2h6.6l4.5 6L18.9 2Zm-1.1 18h1.7L6.5 3.9H4.7L17.8 20Z"/>',
  Instagram:'<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.25"/>'
};
export function renderSocialLinks(socials){
  if(!socials?.length)return '';
  return `<nav class="pe-socials" aria-label="Proper Emails social profiles"><span class="pe-socials-label">LET’S STAY IN TOUCH</span><div class="pe-socials-links">${socials.map(({name,url})=>{
    if(!icons[name]||!url.startsWith('https://'))throw Error('Unsupported social profile: '+name);
    return `<a class="pe-social-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="Proper Emails on ${escapeHtml(name)} (opens in a new tab)"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">${icons[name]}</svg><span>${escapeHtml(name)}</span><span class="pe-social-arrow" aria-hidden="true">↗</span></a>`;
  }).join('')}</div></nav>`;
}
