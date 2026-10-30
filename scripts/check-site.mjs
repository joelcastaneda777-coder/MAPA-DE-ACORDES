import { readFileSync, existsSync } from 'node:fs';
import { Script } from 'node:vm';

const base='https://mapadeacordes.com';
const read = p=>readFileSync(p,'utf8');
let failures=0;
function check(ok,message){console.log((ok?'PASS':'FAIL')+' '+message);if(!ok)failures++;}
const html=read('index.html');
check(html.includes('<html lang="es">'),'Idioma español en el documento principal');
check(html.includes('<title>') && html.includes('</title>'),'Título de la página principal');
check(html.includes('rel="canonical" href="'+base+'/?"') || html.includes('rel="canonical" href="'+base+'/"'),'Canonical de inicio');
for(const id of ['q','piano','fretboard','playFull','seqBpm','seqPlay','seqStop','seqRows','mixPiano','mixHarp','mixPad']){
 check(html.includes('id="'+id+'"'),'Control musical '+id);
}
const scripts=[...html.matchAll(/<script(?![^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)].map(x=>x[1]).filter(x=>x.trim());
check(scripts.length>0,'Scripts musicales presentes');
for(let i=0;i<scripts.length;i++){try{new Script(scripts[i],{filename:'inline-'+i+'.js'});check(true,'JavaScript sintácticamente válido '+i);}catch(e){check(false,'JavaScript '+i+': '+e.message);}}
const robots=read('robots.txt'),sitemap=read('sitemap.xml');
check(robots.includes('Sitemap: '+base+'/sitemap.xml'),'Robots declara el sitemap oficial');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
check(urls.length===21,'Sitemap contiene inicio y 20 páginas piloto');
check(new Set(urls).size===urls.length,'Sitemap sin URL duplicadas');
for(const url of urls){
 check(url.startsWith(base+'/'),'Dominio correcto en '+url);
 const pathname=new URL(url).pathname;
 const path=pathname==='/'?'index.html':pathname.slice(1)+'index.html';
 check(existsSync(path),'Existe '+path);
 if(existsSync(path)){
  const page=read(path);
  check(page.includes(url),'URL canónica en '+path);
  check(/<title>[^<]+<\/title>/.test(page),'Título SEO en '+path);
 }
}
if(failures){console.error(failures+' comprobaciones fallaron');process.exit(1);}
console.log('Comprobaciones terminadas');
