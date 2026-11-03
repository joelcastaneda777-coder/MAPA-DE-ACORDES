/* Mapa de Acordes — optional GA4 measurement. */
(function(){
'use strict';
const ID='G-2XN7NGYWM2',KEY='mapa-analytics-consent';
let choice=null,enabled=false,loaded=false;
try{choice=localStorage.getItem(KEY);}catch(e){}
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
function enable(){
 if(enabled)return;enabled=true;
 gtag('consent','update',{analytics_storage:'granted'});
 if(!loaded){
  loaded=true;gtag('js',new Date());
  gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname,page_referrer:document.referrer.split('?')[0].split('#')[0]});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(script);
 }
}
window.mapaTrack=function(name,params){if(enabled)gtag('event',name,params||{});};
const style=document.createElement('style');
style.textContent='#mapa-consent{position:fixed;bottom:16px;left:16px;z-index:9999;max-width:min(420px,calc(100vw - 32px));padding:16px;background:#123642;color:#f2fafb;border:1px solid #69858e;border-radius:16px;box-shadow:0 8px 32px #0004;font:13px/1.5 system-ui,sans-serif}#mapa-consent p{margin:0 0 10px}#mapa-consent .choices{display:flex;gap:8px;flex-wrap:wrap}#mapa-consent button,#mapa-privacy{font:inherit;cursor:pointer;border:1px solid #8aafb7;border-radius:9px;padding:8px 12px;background:#164b58;color:#fff}#mapa-consent button:focus-visible,#mapa-privacy:focus-visible{outline:2px solid #ffe08d;outline-offset:3px}#mapa-consent details{margin:10px 0}#mapa-privacy{position:fixed;bottom:8px;left:8px;z-index:9998;font:11px system-ui,sans-serif;padding:5px 8px}';
document.head.appendChild(style);
const panel=document.createElement('section');panel.id='mapa-consent';panel.setAttribute('aria-label','Preferencias de medición');
panel.innerHTML='<p><strong>Ayúdanos a mejorar Mapa de Acordes</strong><br>¿Permites cookies de Google Analytics para medir visitas y uso de las herramientas? Puedes seguir usando todo si rechazas.</p><details><summary>Qué medimos</summary><p>Visitas, dispositivo, país aproximado y acciones como reproducir progresiones. No enviamos el texto libre del buscador. Google procesa estos datos mediante Analytics. Puedes cambiar tu elección aquí cuando quieras. Rechazar detiene las nuevas mediciones y elimina las cookies de Analytics accesibles desde este sitio.</p></details><div class="choices"><button type="button" data-consent="yes">Aceptar</button><button type="button" data-consent="no">Rechazar</button></div>';
const privacy=document.createElement('button');privacy.type='button';privacy.id='mapa-privacy';privacy.textContent='Privacidad';privacy.setAttribute('aria-controls','mapa-consent');privacy.addEventListener('click',()=>{panel.hidden=false;panel.querySelector('button').focus();});
panel.addEventListener('click',e=>{
 const button=e.target.closest('[data-consent]');if(!button)return;
 choice=button.dataset.consent;try{localStorage.setItem(KEY,choice);}catch(e){}
 if(choice==='yes')enable();
 else{
  enabled=false;gtag('consent','update',{analytics_storage:'denied'});
  document.cookie.split(';').forEach(c=>{const name=c.split('=')[0].trim();if(name==='_ga'||name.startsWith('_ga_')){for(const domain of ['',location.hostname,'.'+location.hostname])document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');}});
 }
 panel.hidden=true;privacy.focus({preventScroll:true});
});
document.body.appendChild(panel);document.body.appendChild(privacy);
panel.hidden=choice==='yes'||choice==='no';if(choice==='yes')enable();
})();
