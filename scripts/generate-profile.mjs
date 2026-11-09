// Run from this repository: node scripts/generate-profile.mjs .
// Skill icons: https://github.com/tandpfun/skill-icons (MIT; see licenses/).
import fs from 'node:fs/promises';
import path from 'node:path';
import {copy} from './profile-copy.mjs';
const root=path.resolve(process.argv[2]||'.');
const data=JSON.parse(await fs.readFile(path.join(root,'scripts/public-profile.json'),'utf8'));
const base='https://raw.githubusercontent.com/yyhJohn/yyhJohn/main/assets';
const repo='https://github.com/yyhJohn/yyhJohn/blob/main';
const version='developer-20261109';
const languages=[['en','English','README.md'],['zh-CN','简体中文','README.zh-CN.md'],['ja','日本語','README.ja.md'],['de','Deutsch','README.de.md'],['fr','Français','README.fr.md'],['es','Español','README.es.md']];
const ui={
 en:{greeting:"Hi 👋, I'm yyhJohn",about:'About me',tools:'Languages & tools',projects:'Featured projects',stats:'GitHub stats',top:'Most used languages',metrics:['Public repositories','Stars earned','Forks received','Followers'],note:'Public repositories · Code size ·',typing:['Building practical AI tools','Exploring data & visualization','Programming FTC / FRC robots'],bullets:['🔭 Building practical AI tools and web applications.','📊 Exploring data analysis, visualization, and research tools.','🤖 Programming robots with Java through FTC and FRC projects.']},
 'zh-CN':{greeting:'你好 👋，我是 yyhJohn',about:'关于我',tools:'语言与工具',projects:'精选项目',stats:'GitHub 统计',top:'常用代码语言',metrics:['公开仓库','获得的 Star','获得的 Fork','关注者'],note:'公开仓库 · 按代码字节统计 ·',typing:['动手构建实用的 AI 工具','探索数据分析与可视化','编写 FTC / FRC 机器人程序'],bullets:['🔭 动手构建实用的 AI 工具和网页应用。','📊 探索数据分析、可视化与研究工具。','🤖 使用 Java 编写 FTC、FRC 机器人项目。']},
 ja:{greeting:'こんにちは 👋、yyhJohn です',about:'自己紹介',tools:'言語とツール',projects:'主なプロジェクト',stats:'GitHub 統計',top:'主なコード言語',metrics:['公開リポジトリ','獲得スター','獲得フォーク','フォロワー'],note:'公開リポジトリ · コードのサイズ ·',typing:['実用的な AI ツールを開発','データ分析と可視化を探究','FTC / FRC ロボットをプログラミング'],bullets:['🔭 実用的な AI ツールと Web アプリを制作しています。','📊 データ分析・可視化・研究ツールに関心があります。','🤖 Java で FTC・FRC ロボットのプログラムを作っています。']},
 de:{greeting:'Hallo 👋, ich bin yyhJohn',about:'Über mich',tools:'Sprachen & Werkzeuge',projects:'Ausgewählte Projekte',stats:'GitHub-Statistik',top:'Häufigste Codesprachen',metrics:['Öffentliche Repos','Erhaltene Sterne','Erhaltene Forks','Follower'],note:'Öffentliche Repos · Codegröße ·',typing:['Praktische KI-Werkzeuge entwickeln','Daten analysieren und visualisieren','FTC- und FRC-Roboter programmieren'],bullets:['🔭 Ich entwickle praktische KI-Werkzeuge und Webanwendungen.','📊 Ich erkunde Datenanalyse, Visualisierung und Forschungswerkzeuge.','🤖 Ich programmiere FTC- und FRC-Roboter mit Java.']},
 fr:{greeting:'Bonjour 👋, moi c’est yyhJohn',about:'À propos',tools:'Langages et outils',projects:'Projets sélectionnés',stats:'Statistiques GitHub',top:'Principaux langages',metrics:['Dépôts publics','Étoiles reçues','Forks reçus','Abonnés'],note:'Dépôts publics · Taille du code ·',typing:['Créer des outils IA utiles','Explorer et visualiser les données','Programmer des robots FTC / FRC'],bullets:['🔭 Je crée des outils IA utiles et des applications web.','📊 J’explore l’analyse de données, la visualisation et les outils de recherche.','🤖 Je programme des robots FTC et FRC en Java.']},
 es:{greeting:'Hola 👋, soy yyhJohn',about:'Sobre mí',tools:'Lenguajes y herramientas',projects:'Proyectos destacados',stats:'Estadísticas de GitHub',top:'Lenguajes principales',metrics:['Repositorios públicos','Estrellas recibidas','Forks recibidos','Seguidores'],note:'Repositorios públicos · Tamaño del código ·',typing:['Crear herramientas de IA útiles','Explorar y visualizar datos','Programar robots FTC / FRC'],bullets:['🔭 Desarrollo herramientas de IA útiles y aplicaciones web.','📊 Exploro el análisis de datos, la visualización y las herramientas de investigación.','🤖 Programo robots FTC y FRC con Java.']},
};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const colors={JavaScript:'#f1e05a',Java:'#b07219',TypeScript:'#3178c6',CSS:'#563d7c',HTML:'#e34c26'};
const text=(x,y,s,size=18,color='#a9b1d6',extra='')=>`<text x="${x}" y="${y}" font-family="'Segoe UI','Microsoft YaHei','Yu Gothic',sans-serif" font-size="${size}" fill="${color}" ${extra}>${esc(s)}</text>`;
const svg=(w,h,title,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">${esc(title)}</title>${body}</svg>\n`;
const panel=(w,h)=>`<rect x=".5" y=".5" width="${w-1}" height="${h-1}" rx="6" fill="#1a1b27" stroke="#30364a"/>`;
const image=(file)=>`${base}/${file}?v=${version}`;
const projects=[['GPA-Planner','gpa-planner'],['brand-site','codecat'],['FTC-2022-8.1','ftc'],['FRC','frc']];
function typingFixed(u){
 // Animate the clipping rectangle directly; no JavaScript or external service.
 return svg(760,52,u.typing.join(' / '),`<style>.static{display:none}@media(prefers-reduced-motion:reduce){.animated{display:none}.static{display:block}}</style>${u.typing.map((s,i)=>`<defs><clipPath id="typing-${i}"><rect x="0" y="0" width="0" height="52"><animate attributeName="width" values="0;760;760;0;0" keyTimes="0;.20;.27;.33;1" dur="12s" begin="${i*4}s" repeatCount="indefinite"/></rect></clipPath></defs><g class="animated" clip-path="url(#typing-${i})"><text x="380" y="35" text-anchor="middle" font-family="Consolas,'Microsoft YaHei','Yu Gothic',monospace" font-size="24" fill="#70a5fd">${esc(s)} <tspan fill="#bb9af7">_</tspan></text></g>`).join('')}<g class="static">${text(380,35,u.typing[0],24,'#70a5fd','text-anchor="middle"')}</g>`);
}
function pin(p,desc){
 return svg(520,186,p.name,`${panel(520,186)}<path d="M24 25h16v19H24zm4 0v19M24 39h16" fill="none" stroke="#70a5fd" stroke-width="1.6"/>${text(51,42,p.name,22,'#70a5fd','font-weight="600"')}${desc.map((s,i)=>text(24,80+i*25,s,17)).join('')}<circle cx="30" cy="164" r="6" fill="${colors[p.language]||'#aaa'}"/>${text(44,169,p.language,15)}${text(325,169,`☆ ${p.stargazers_count}     ⑂ ${p.forks_count}`,16,'#7aa2f7')}`);
}
function stats(u){
 const values=[data.publicRepos,data.stars,data.forks,data.followers];
 const icons=['▣','☆','⑂','♧'];
 return svg(520,218,u.stats,`${panel(520,218)}${text(24,36,`yyhJohn · ${u.stats}`,22,'#70a5fd','font-weight="600"')}${u.metrics.map((s,i)=>text(24,77+i*33,icons[i],20,'#bb9af7')+text(58,77+i*33,s,17)+text(468,77+i*33,values[i],19,'#c0caf5','text-anchor="end" font-weight="600"')).join('')}`);
}
function topLanguages(u){
 const entries=Object.entries(data.languages).sort((a,b)=>b[1]-a[1]);
 const total=entries.reduce((s,x)=>s+x[1],0);
 let offset=24;
 const bars=entries.map(([name,n])=>{const w=n/total*472;const result=`<rect x="${offset.toFixed(2)}" y="62" width="${w.toFixed(2)}" height="14" fill="${colors[name]||'#70a5fd'}"/>`;offset+=w;return result;}).join('');
 return svg(520,218,u.top,`${panel(520,218)}${text(24,36,u.top,22,'#70a5fd','font-weight="600"')}<defs><clipPath id="bar"><rect x="24" y="62" width="472" height="14" rx="7"/></clipPath></defs><g clip-path="url(#bar)">${bars}</g>${entries.map(([name,n],i)=>{const x=i%2===0?24:276,y=111+Math.floor(i/2)*31;return `<circle cx="${x+5}" cy="${y-5}" r="5" fill="${colors[name]||'#70a5fd'}"/>`+text(x+18,y,`${name} ${(n/total*100).toFixed(1)}%`,15);}).join('')}${text(24,204,`${u.note} ${data.updated}`,11,'#7c86a5')}`);
}
await fs.mkdir(path.join(root,'assets'),{recursive:true});
for(const [locale,,filename] of languages){
 const c=copy[locale],u=ui[locale];
 await fs.writeFile(path.join(root,`assets/typing-${locale}.svg`),typingFixed(u));
 await fs.writeFile(path.join(root,`assets/stats-${locale}.svg`),stats(u));
 await fs.writeFile(path.join(root,`assets/languages-${locale}.svg`),topLanguages(u));
 for(let i=0;i<projects.length;i++){
  const [name,slug]=projects[i],p=data.projects.find(x=>x.name===name);
  await fs.writeFile(path.join(root,`assets/${slug}-${locale}.svg`),pin(p,c.descriptions[i]));
 }
 const nav=languages.map(([code,label,file])=>code===locale?`<b>${label}</b>`:`<a href="${repo}/${file}">${label}</a>`).join(' &nbsp; | &nbsp; ');
 const pins=projects.map(([name,slug],i)=>`<a href="https://github.com/yyhJohn/${name}"><img src="${image(`${slug}-${locale}.svg`)}" width="49%" alt="${name} — ${esc(c.descriptions[i].join(' '))}" /></a>`);
 const md=`<h1 align="center">${u.greeting}</h1>\n\n<p align="center"><img src="${image(`typing-${locale}.svg`)}" width="760" height="52" alt="${u.typing.join(' · ')}" /></p>\n\n<p align="center">${nav}</p>\n\n## 👨‍💻 ${u.about}\n\n${u.bullets.map(s=>`- ${s}`).join('\n')}\n\n## 🛠️ ${u.tools}\n\n<p><a href="https://skillicons.dev"><img src="${image('skills.svg')}" height="48" alt="Java, JavaScript, TypeScript, React, Node.js, Tailwind CSS, Git" /></a></p>\n\n## 📊 ${u.stats}\n\n<p>\n<a href="https://github.com/yyhJohn"><img src="${image(`stats-${locale}.svg`)}" width="49%" alt="${u.metrics.map((s,i)=>s+': '+[data.publicRepos,data.stars,data.forks,data.followers][i]).join('; ')}" /></a>\n<a href="https://github.com/yyhJohn?tab=repositories"><img src="${image(`languages-${locale}.svg`)}" width="49%" alt="${u.top} — ${u.note} ${data.updated}" /></a>\n</p>\n\n## 🚀 ${u.projects}\n\n<p>\n${pins.slice(0,2).join('\n')}\n</p>\n<p>\n${pins.slice(2).join('\n')}\n</p>\n\n<p align="center"><a href="https://github.com/yyhJohn?tab=repositories">${c.explore} →</a> &nbsp; · &nbsp; <a href="https://github.com/yyhJohn">${c.profile}</a></p>\n`;
 await fs.writeFile(path.join(root,filename),md);
}
console.log(`Generated ${languages.length} developer-style profile editions from public GitHub data.`);
