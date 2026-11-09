import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.argv[2];
if (!root) throw new Error('Pass the profile repository path.');
const base = 'https://raw.githubusercontent.com/yyhJohn/yyhJohn/main/assets';
const repo = 'https://github.com/yyhJohn/yyhJohn/blob/main';
const languages = [
  ['en', 'English', 'README.md', 108],
  ['zh-CN', '简体中文', 'README.zh-CN.md', 112],
  ['ja', '日本語', 'README.ja.md', 98],
  ['de', 'Deutsch', 'README.de.md', 112],
  ['fr', 'Français', 'README.fr.md', 112],
  ['es', 'Español', 'README.es.md', 112],
];
const projects = [
  {name:'GPA Planner', slug:'gpa-planner', url:'https://github.com/yyhJohn/GPA-Planner', category:'AI / EDUCATION', stack:'JAVASCRIPT  /  REACT  /  NODE.JS', accent:'#b9d4c8'},
  {name:'CodeCat', slug:'codecat', url:'https://github.com/yyhJohn/brand-site', category:'WEB / IDENTITY', stack:'TYPESCRIPT  /  REACT  /  TAILWIND', accent:'#d8c9a6'},
  {name:'FTC Robot Controller', slug:'ftc', url:'https://github.com/yyhJohn/FTC-2022-8.1', category:'ROBOTICS / FTC', stack:'JAVA  /  ANDROID  /  FTC SDK 8.1', accent:'#c2c6e2'},
  {name:'FRC', slug:'frc', url:'https://github.com/yyhJohn/FRC', category:'ROBOTICS / FRC', stack:'JAVA  /  ROBOT CONTROL', accent:'#b7cbd8'},
];
export const copy = {
  en: {
    title:'Ideas, made real.', titleSize:83, subtitle:'AI tools. Data exploration. Robotics.',
    eyebrow:'A PERSONAL COLLECTION OF CODE & CURIOSITY',
    intro:'I enjoy turning ideas into practical software and exploring the intersection of AI, data, and robotics.',
    intro2:'From web applications to robot controllers, this is a selection of what I build and explore.',
    about:'The approach', selected:'Selected work', explore:'Explore all repositories', profile:'GitHub profile',
    focus:[['APPLIED AI','Useful tools. Simpler workflows.'],['DATA EXPLORATION','Analysis. Visualization. Questions.'],['ROBOTICS','Code that meets the physical world.']],
    descriptions:[['AI-assisted academic planning.','GPA tools, course simulation','and study-abroad planning.'],['A home for the CodeCat ecosystem.','An AI product brand website','built with React and TypeScript.'],['Software for competition robots.','A robot controller project based','on FIRST Tech Challenge SDK 8.1.'],['From software to the playing field.','FIRST Robotics Competition','robot code in Java.']],
    footer:'Built with curiosity. Refined through practice.',
  },
  'zh-CN': {
    title:'让想法，成为作品。', titleSize:67, subtitle:'AI 工具 · 数据研究 · 机器人',
    eyebrow:'代码与好奇心的个人作品集',
    intro:'我喜欢把想法写成实用的软件，探索 AI、数据与机器人的交汇之处。',
    intro2:'从网页应用到机器人控制，这里记录着我动手构建与探索的项目。',
    about:'关于创造', selected:'精选作品', explore:'浏览全部仓库', profile:'GitHub 个人主页',
    focus:[['实用 AI','让工具有用，让工作流更简单。'],['数据探索','分析、可视化，以及更好的问题。'],['机器人','让代码与真实世界产生联系。']],
    descriptions:[['面向学业规划的 AI 工具。','GPA 计算、选课模拟，','以及留学规划。'],['CodeCat 产品生态的展示窗口。','以 React 与 TypeScript 构建的','AI 产品品牌网站。'],['面向竞赛机器人的控制软件。','基于 FIRST Tech Challenge','SDK 8.1 的机器人控制项目。'],['从软件，走向赛场。','使用 Java 编写的','FRC 机器人代码。']],
    footer:'源于好奇，成于实践。',
  },
  ja: {
    title:'アイデアを、かたちに。', titleSize:60, subtitle:'AI ツール · データ探索 · ロボティクス',
    eyebrow:'コードと好奇心から生まれる作品集',
    intro:'アイデアを実用的なソフトウェアに変え、AI・データ・ロボティクスの接点を探っています。',
    intro2:'Web アプリからロボット制御まで。制作と探究のプロジェクトを紹介します。',
    about:'ものづくりへの姿勢', selected:'主なプロジェクト', explore:'すべてのリポジトリ', profile:'GitHub プロフィール',
    focus:[['実用的な AI','便利なツールとシンプルな作業。'],['データ探索','分析・可視化・新しい問い。'],['ロボティクス','コードと現実世界をつなぐ。']],
    descriptions:[['AI を活用した学業計画ツール。','GPA 計算、履修シミュレーション、','留学プランニング。'],['CodeCat の製品を紹介するサイト。','React と TypeScript による','AI 製品のブランド Web サイト。'],['競技用ロボットの制御ソフトウェア。','FIRST Tech Challenge SDK 8.1','をベースにしたプロジェクト。'],['ソフトウェアから競技フィールドへ。','Java で記述された','FRC ロボットのコード。']],
    footer:'好奇心から始まり、実践で磨く。',
  },
  de: {
    title:'Ideen werden real.', titleSize:72, subtitle:'KI-Werkzeuge. Datenanalyse. Robotik.',
    eyebrow:'EINE PERSÖNLICHE SAMMLUNG AUS CODE & NEUGIER',
    intro:'Ich entwickle praktische Software aus Ideen und erkunde die Schnittstellen von KI, Daten und Robotik.',
    intro2:'Von Webanwendungen bis zur Robotersteuerung: eine Auswahl meiner Projekte und Experimente.',
    about:'Mein Ansatz', selected:'Ausgewählte Projekte', explore:'Alle Repositories ansehen', profile:'GitHub-Profil',
    focus:[['ANGEWANDTE KI','Nützliche Tools. Einfache Abläufe.'],['DATEN ERKUNDEN','Analyse. Visualisierung. Fragen.'],['ROBOTIK','Code trifft auf die physische Welt.']],
    descriptions:[['KI-gestützte Studienplanung.','GPA-Berechnung, Kurssimulation','und Planung eines Auslandsstudiums.'],['Ein Zuhause für das CodeCat-Ökosystem.','Eine KI-Produktwebsite mit','React und TypeScript.'],['Software für Wettbewerbsroboter.','Robotersteuerung auf Basis des','FIRST Tech Challenge SDK 8.1.'],['Von Software auf das Spielfeld.','Java-Code für die','FIRST Robotics Competition.']],
    footer:'Aus Neugier entwickelt. In der Praxis verfeinert.',
  },
  fr: {
    title:'Des idées au réel.', titleSize:79, subtitle:'Outils IA. Exploration des données. Robotique.',
    eyebrow:'UNE COLLECTION PERSONNELLE DE CODE & DE CURIOSITÉ',
    intro:'J’aime transformer des idées en logiciels utiles et explorer les liens entre IA, données et robotique.',
    intro2:'Des applications web au contrôle de robots, voici une sélection de mes projets et explorations.',
    about:'Ma démarche', selected:'Projets sélectionnés', explore:'Voir tous les dépôts', profile:'Profil GitHub',
    focus:[['IA APPLIQUÉE','Des outils utiles. Des tâches simplifiées.'],['EXPLORER LES DONNÉES','Analyse. Visualisation. Questions.'],['ROBOTIQUE','Le code rencontre le monde physique.']],
    descriptions:[['Planification des études avec l’IA.','Calcul du GPA, simulation de cours','et préparation des études à l’étranger.'],['Une vitrine pour l’écosystème CodeCat.','Un site de marque de produits IA,','créé avec React et TypeScript.'],['Des logiciels pour robots de compétition.','Contrôle de robots basé sur le','SDK FIRST Tech Challenge 8.1.'],['Du logiciel au terrain de compétition.','Code de robot en Java pour la','FIRST Robotics Competition.']],
    footer:'Créé par curiosité. Affiné par la pratique.',
  },
  es: {
    title:'Ideas hechas realidad.', titleSize:69, subtitle:'Herramientas de IA. Datos. Robótica.',
    eyebrow:'UNA COLECCIÓN PERSONAL DE CÓDIGO Y CURIOSIDAD',
    intro:'Me gusta convertir ideas en software útil y explorar la intersección entre IA, datos y robótica.',
    intro2:'De aplicaciones web al control de robots: una selección de lo que construyo y exploro.',
    about:'Mi enfoque', selected:'Proyectos destacados', explore:'Ver todos los repositorios', profile:'Perfil de GitHub',
    focus:[['IA APLICADA','Herramientas útiles. Procesos sencillos.'],['EXPLORACIÓN DE DATOS','Análisis. Visualización. Preguntas.'],['ROBÓTICA','Código que conecta con el mundo físico.']],
    descriptions:[['Planificación académica con IA.','Cálculo de GPA, simulación de cursos','y planificación de estudios en el exterior.'],['Un espacio para el ecosistema CodeCat.','Sitio de marca de productos de IA','creado con React y TypeScript.'],['Software para robots de competición.','Control de robots basado en el','SDK FIRST Tech Challenge 8.1.'],['Del software al campo de competición.','Código de robots en Java para','FIRST Robotics Competition.']],
    footer:'Creado con curiosidad. Refinado con práctica.',
  },
};
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const font = `font-family="'Segoe UI','Microsoft YaHei','Yu Gothic',Arial,sans-serif"`;
const svg = (w,h,title,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">${esc(title)}</title>${body}</svg>\n`;
const text = (x,y,value,size=22,color='#aab4c2',extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${font} ${extra}>${esc(value)}</text>`;
const line = (x1,y1,x2,y2,color='#26303e') => `<path d="M${x1} ${y1}H${x2}" stroke="${color}"/>`;

function hero(locale,c) {
  return svg(1200,440,`yyhJohn — ${c.subtitle}`,`
  <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0b1420"/><stop offset="1" stop-color="#111d2b"/></linearGradient><radialGradient id="halo"><stop stop-color="#c8b991" stop-opacity=".12"/><stop offset="1" stop-color="#c8b991" stop-opacity="0"/></radialGradient><linearGradient id="gold"><stop stop-color="#e6d8b4"/><stop offset="1" stop-color="#8b8065"/></linearGradient></defs>
  <rect width="1200" height="440" rx="18" fill="url(#bg)"/>
  <rect x=".5" y=".5" width="1199" height="439" rx="18" stroke="#d8c9a6" stroke-opacity=".22" fill="none"/>
  <path d="M56 49h30" stroke="#d8c9a6" stroke-width="2"/>
  ${text(99,54,'YYHJOHN / PORTFOLIO',15,'#d8c9a6','letter-spacing="3"')}
  ${text(56,116,c.eyebrow,13,'#8d9aa9',locale==='en'?'letter-spacing="2"':'')}
  <text x="51" y="230" font-size="${c.titleSize}" fill="#f0ece3" font-family="Georgia,'Microsoft YaHei','Yu Gothic',serif" letter-spacing="-2">${esc(c.title)}</text>
  ${text(56,287,c.subtitle,24,'#c4b48d')}
  ${line(56,345,684,345)}
  ${text(56,386,'CODE  /  DATA  /  ROBOTICS',14,'#8d9aa9','letter-spacing="3"')}
  <circle cx="985" cy="222" r="210" fill="url(#halo)"/>
  <g transform="translate(985 222)">
    <circle r="133" fill="none" stroke="#d8c9a6" stroke-opacity=".22"/>
    <circle r="106" fill="none" stroke="#d8c9a6" stroke-opacity=".33"/>
    <ellipse rx="106" ry="42" fill="none" stroke="#d8c9a6" stroke-opacity=".35" transform="rotate(-35)"/>
    <ellipse rx="42" ry="106" fill="none" stroke="#d8c9a6" stroke-opacity=".35" transform="rotate(-35)"/>
    <path d="M-155 0H155M0-155V155" stroke="#d8c9a6" stroke-opacity=".12"/>
    <path d="M-102 -85A133 133 0 0 1 130 29" fill="none" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="-102" cy="-85" r="5" fill="#d8c9a6"/>
    <circle cx="130" cy="29" r="4" fill="#d8c9a6"/>
    <circle r="29" fill="#101b28" stroke="#d8c9a6" stroke-opacity=".55"/>
    <text y="9" text-anchor="middle" font-family="Georgia,serif" font-size="27" fill="#d8c9a6">J</text>
  </g>
  ${text(1108,395,locale.toUpperCase(),12,'#8d9aa9','text-anchor="end" letter-spacing="2"')}`);
}
function focus(c) {
  return svg(1200,128,c.focus.map(x=>x[0]).join(' / '),`
  <rect width="1200" height="128" rx="14" fill="#111b28"/>
  <path d="M400 30V98M800 30V98" stroke="#2a3543"/>
  ${c.focus.map((f,i)=>text(26+i*400,35,`0${i+1}`,12,'#9c8b68','letter-spacing="2"')+text(26+i*400,66,f[0],17,'#e5dfd2','font-weight="600"')+text(26+i*400,99,f[1],15,'#98a5b6')).join('')}`);
}
function card(p,desc,index) {
  return svg(584,292,`${p.name} — ${desc.join(' ')}`,`
  <defs><linearGradient id="c" x2="1" y2="1"><stop stop-color="#101b29"/><stop offset="1" stop-color="#0c1521"/></linearGradient></defs>
  <rect x=".5" y=".5" width="583" height="291" rx="14" fill="url(#c)" stroke="#2a3545"/>
  ${text(28,35,`0${index+1} / ${p.category}`,12,p.accent,'letter-spacing="2"')}
  <path d="M531 30h18v18m0-18-23 23" fill="none" stroke="${p.accent}" stroke-width="1.5"/>
  ${text(27,91,p.name,p.slug==='ftc'?33:40,'#f0ece3','font-weight="600" letter-spacing="-1"')}
  ${desc.map((l,i)=>text(28,133+i*28,l,19,'#aeb9c7')).join('')}
  ${line(28,236,556,236)}
  ${text(28,267,p.stack,11.5,p.accent,'letter-spacing="1"')}`);
}

await fs.mkdir(path.join(root,'assets'),{recursive:true});
for (const [code,label,,width] of languages) {
  for(const active of [false,true]) {
    const body=`<rect x=".5" y=".5" width="${width-1}" height="33" rx="17" fill="${active?'#d8c9a6':'#101a27'}" stroke="${active?'#d8c9a6':'#2d3948'}"/>${text(width/2,22,label,13,active?'#101a27':'#c5cdd7','text-anchor="middle" font-weight="600"')}`;
    await fs.writeFile(path.join(root,'assets',`lang-${code}${active?'-active':''}.svg`),svg(width,34,label,body));
  }
}
for(const [locale,,filename] of languages) {
  const c=copy[locale];
  await fs.writeFile(path.join(root,'assets',`hero-${locale}.svg`),hero(locale,c));
  await fs.writeFile(path.join(root,'assets',`focus-${locale}.svg`),focus(c));
  for(let i=0;i<projects.length;i++) await fs.writeFile(path.join(root,'assets',`${projects[i].slug}-${locale}.svg`),card(projects[i],c.descriptions[i],i));
  const langnav=languages.map(([code,label,file])=>`<a href="${repo}/${file}"><img src="${base}/lang-${code}${code===locale?'-active':''}.svg" height="30" alt="${label}${code===locale?' ✓':''}" /></a>`).join('\n');
  const cards=projects.map(p=>`<a href="${p.url}"><img src="${base}/${p.slug}-${locale}.svg" width="49%" alt="${p.name} — ${esc(c.descriptions[projects.indexOf(p)].join(' '))}" /></a>`);
  const readme=`<p align="center">\n${langnav}\n</p>\n\n<img src="${base}/hero-${locale}.svg" width="100%" alt="yyhJohn — ${c.subtitle}" />\n\n<img src="${base}/focus-${locale}.svg" width="100%" alt="${c.focus.map(x=>x[0]).join(' / ')}" />\n\n### ${c.about}\n\n${c.intro}\n\n${c.intro2}\n\n### ${c.selected}\n\n<p>\n${cards.slice(0,2).join('\n')}\n</p>\n<p>\n${cards.slice(2).join('\n')}\n</p>\n\n<p align="center">\n<a href="https://github.com/yyhJohn?tab=repositories"><b>${c.explore} ↗</b></a> &nbsp; · &nbsp; <a href="https://github.com/yyhJohn">${c.profile}</a>\n</p>\n\n---\n\n<p align="center"><sub>${c.footer}</sub></p>\n`;
  await fs.writeFile(path.join(root,filename),readme);
}
console.log(`Generated ${languages.length} complete language editions with local SVG artwork.`);
