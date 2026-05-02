import { useState, useEffect } from “react”;

// ─── EXERCISE DATABASE ────────────────────────────────────────────────────────
const exerciseDB = {
chest:     { label:“POITRINE”,   emoji:“🫁”, color:”#FF6B35”, options:[
{ id:“ch1”, name:“Développé couché haltères”,   reps:“8–10”,   sets:4, tip:“Descend lentement 2–3 sec”,           img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-bench-press.gif”, stars:5 },
{ id:“ch2”, name:“Développé couché barre”,      reps:“6–8”,    sets:4, tip:“Classique pour la masse”,             img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/11/incline-barbell-bench-press.gif”, stars:5 },
{ id:“ch3”, name:“Développé incliné haltères”,  reps:“10–12”,  sets:3, tip:“Focus haut de la poitrine”,           img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/11/incline-barbell-bench-press.gif”, stars:4 },
{ id:“ch4”, name:“Écarté câble (chest fly)”,    reps:“12–15”,  sets:3, tip:“Contracte fort en haut”,              img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-chest-fly.gif”, stars:4 },
{ id:“ch5”, name:“Dips (poitrine)”,             reps:“8–12”,   sets:3, tip:“Penche-toi vers l’avant”,             img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/chest-dips.gif”, stars:4 },
{ id:“ch6”, name:“Push-up lesté”,               reps:“12–15”,  sets:3, tip:“Contrôle la descente”,                img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/04/weighted-push-up.gif”, stars:3 },
]},
shoulders: { label:“ÉPAULES”,    emoji:“💡”, color:”#FF9500”, options:[
{ id:“sh1”, name:“Développé militaire haltères”,reps:“10–12”,  sets:3, tip:“Core engagé, pas de cambrure”,        img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-shoulder-press.gif”, stars:5 },
{ id:“sh2”, name:“Développé militaire barre”,   reps:“8–10”,   sets:4, tip:“Mouvement roi des épaules”,           img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/barbell-overhead-press.gif”, stars:5 },
{ id:“sh3”, name:“Élévations latérales”,        reps:“12–15”,  sets:4, tip:“Coudes légèrement fléchis”,           img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-lateral-raise.gif”, stars:5 },
{ id:“sh4”, name:“Élévations frontales”,        reps:“12–15”,  sets:3, tip:“Contrôle la descente”,                img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-front-raise.gif”, stars:3 },
{ id:“sh5”, name:“Face pull câble”,             reps:“15–20”,  sets:4, tip:“Coudes hauts, tire au visage”,        img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-face-pull.gif”, stars:5 },
{ id:“sh6”, name:“Arnold press”,               reps:“10–12”,  sets:3, tip:“Rotation du poignet clé”,              img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-arnold-press.gif”, stars:4 },
]},
triceps:   { label:“TRICEPS”,    emoji:“🦾”, color:”#F43F5E”, options:[
{ id:“tr1”, name:“Triceps cable pushdown”,      reps:“12–15”,  sets:3, tip:“Coudes fixes le long du corps”,       img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-tricep-pushdown.gif”, stars:5 },
{ id:“tr2”, name:“Extension overhead câble”,    reps:“12–15”,  sets:3, tip:“Long chef = volume derrière le bras”, img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-overhead-tricep-extension.gif”, stars:5 },
{ id:“tr3”, name:“Skull crushers EZ”,           reps:“10–12”,  sets:3, tip:“Barre vers le front, contrôle”,       img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/04/barbell-skull-crusher.gif”, stars:4 },
{ id:“tr4”, name:“Dips triceps”,                reps:“10–15”,  sets:3, tip:“Corps droit, coudes serrés”,           img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/tricep-dips.gif”, stars:4 },
{ id:“tr5”, name:“Kickback haltère”,            reps:“12–15”,  sets:3, tip:“Extension complète du coude”,          img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-tricep-kickback.gif”, stars:3 },
]},
back:      { label:“DOS”,        emoji:“🏗️”, color:”#00D4AA”, options:[
{ id:“ba1”, name:“Tractions (pull-ups)”,        reps:“Max”,    sets:4, tip:“Bande si difficile”,                  img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/pull-up.gif”, stars:5 },
{ id:“ba2”, name:“Rowing barre”,                reps:“8–10”,   sets:4, tip:“Dos plat, tire vers le nombril”,      img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/barbell-bent-over-row.gif”, stars:5 },
{ id:“ba3”, name:“Tirage poitrine câble”,       reps:“10–12”,  sets:3, tip:“Omoplate vers le bas en premier”,     img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-lat-pulldown.gif”, stars:4 },
{ id:“ba4”, name:“Rowing haltère unilatéral”,   reps:“10–12”,  sets:3, tip:“Légère rotation du torse”,            img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/single-arm-dumbbell-row.gif”, stars:4 },
{ id:“ba5”, name:“Tirage horizontal câble”,     reps:“12–15”,  sets:3, tip:“Coudes serrés, omoplate ensemble”,    img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-seated-row.gif”, stars:4 },
{ id:“ba6”, name:“Deadlift roumain”,            reps:“8–10”,   sets:4, tip:“Dos droit, descend sur les tibias”,   img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/romanian-deadlift.gif”, stars:5 },
]},
traps:     { label:“TRAPÈZES”,   emoji:“🏔️”, color:”#8B5CF6”, options:[
{ id:“tp1”, name:“Shrugs haltères”,             reps:“15–20”,  sets:3, tip:“Pause 1 sec au sommet”,               img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-shrug.gif”, stars:5 },
{ id:“tp2”, name:“Shrugs barre”,                reps:“12–15”,  sets:4, tip:“Plus de charge possible”,             img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/barbell-shrug.gif”, stars:4 },
{ id:“tp3”, name:“Face pull câble (trapèzes)”,  reps:“15–20”,  sets:4, tip:“Coudes hauts = trapèzes supérieurs”,  img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-face-pull.gif”, stars:5 },
]},
biceps:    { label:“BICEPS”,     emoji:“💪”, color:”#06B6D4”, options:[
{ id:“bi1”, name:“Curl barre EZ”,               reps:“10–12”,  sets:3, tip:“Coudes fixes, aucun balancement”,     img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/ez-bar-curl.gif”, stars:5 },
{ id:“bi2”, name:“Curl marteau haltères”,       reps:“12”,     sets:3, tip:“Isole le brachial”,                   img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/hammer-curl.gif”, stars:5 },
{ id:“bi3”, name:“Curl concentré haltère”,      reps:“12–15”,  sets:3, tip:“Peak de contraction maximal”,         img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/concentration-curl.gif”, stars:4 },
{ id:“bi4”, name:“Curl câble bas”,              reps:“12–15”,  sets:3, tip:“Tension constante tout le mouvement”, img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-bicep-curl.gif”, stars:4 },
{ id:“bi5”, name:“Curl incliné haltères”,       reps:“10–12”,  sets:3, tip:“Étirement maximal du bicep”,          img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/incline-dumbbell-curl.gif”, stars:5 },
]},
forearms:  { label:“AVANT-BRAS”, emoji:“🤜”, color:”#EAB308”, options:[
{ id:“fo1”, name:“Wrist curl haltères”,         reps:“15–20”,  sets:3, tip:“Seulement les poignets bougent”,      img:“https://www.inspireusafoundation.org/wp-content/uploads/2023/02/wrist-curl.gif”, stars:4 },
{ id:“fo2”, name:“Reverse curl barre”,          reps:“12–15”,  sets:3, tip:“Brachioradial = épaisseur visible”,   img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/barbell-reverse-curl.gif”, stars:5 },
{ id:“fo3”, name:“Farmer’s carry”,              reps:“30–40m”, sets:3, tip:“Haltères lourds, marche contrôlée”,   img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/04/farmers-carry.gif”, stars:5 },
]},
legs:      { label:“JAMBES”,     emoji:“🦵”, color:”#A855F7”, options:[
{ id:“le1”, name:“Squat barre”,                 reps:“8–10”,   sets:4, tip:“Descend à parallèle, dos droit”,      img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/barbell-back-squat.gif”, stars:5 },
{ id:“le2”, name:“Bulgarian split squat”,       reps:“10/jam”, sets:3, tip:“Pied arrière sur banc”,               img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/03/dumbbell-bulgarian-split-squat.gif”, stars:5 },
{ id:“le3”, name:“Presse à jambes”,             reps:“10–12”,  sets:3, tip:“Pieds hauts = fessiers”,              img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/leg-press.gif”, stars:4 },
{ id:“le4”, name:“Fentes marchées haltères”,    reps:“10/jam”, sets:3, tip:“Genou avant ne dépasse pas le pied”,  img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/dumbbell-walking-lunge.gif”, stars:3 },
{ id:“le5”, name:“Leg extension”,               reps:“12–15”,  sets:3, tip:“Isole les quadriceps”,                img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/leg-extension.gif”, stars:3 },
{ id:“le6”, name:“Leg curl couché”,             reps:“12–15”,  sets:3, tip:“Descente lente = définition”,         img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/lying-leg-curl.gif”, stars:4 },
]},
calves:    { label:“MOLLETS”,    emoji:“🦶”, color:”#10B981”, options:[
{ id:“ca1”, name:“Calf raise debout”,           reps:“15–20”,  sets:4, tip:“Amplitude complète, pause au top”,    img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/standing-calf-raise.gif”, stars:5 },
{ id:“ca2”, name:“Calf raise assis”,            reps:“15–20”,  sets:3, tip:“Isole le soléaire”,                   img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/seated-calf-raise.gif”, stars:4 },
]},
abs:       { label:“ABDOS”,      emoji:“⚡”, color:”#F59E0B”, options:[
{ id:“ab1”, name:“Crunch câble à genoux”,       reps:“15–20”,  sets:4, tip:“Tension constante = résultats”,       img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/cable-crunch.gif”, stars:5 },
{ id:“ab2”, name:“Relevés de jambes suspendus”, reps:“12–15”,  sets:4, tip:“Descente lente et contrôlée”,         img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/hanging-leg-raise.gif”, stars:5 },
{ id:“ab3”, name:“Planche + rotation latérale”, reps:“20/côté”,sets:3, tip:“Obliques et dentelé antérieur”,       img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/side-plank.gif”, stars:4 },
{ id:“ab4”, name:“Mountain climbers”,           reps:“30 sec”, sets:3, tip:“Cadence rapide = cardio + abdos”,     img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/mountain-climbers.gif”, stars:3 },
{ id:“ab5”, name:“Russian twist lesté”,         reps:“20 rep”, sets:3, tip:“Rotation complète chaque côté”,       img:“https://www.inspireusafoundation.org/wp-content/uploads/2022/01/russian-twist.gif”, stars:4 },
]},
};

const DAY_TEMPLATES = [
{ id:“push”,  label:“PUSH”,  desc:“Poitrine · Épaules · Triceps”,              emoji:“💪”, color:”#FF6B35”, groups:[“chest”,“shoulders”,“triceps”] },
{ id:“pull”,  label:“PULL”,  desc:“Dos · Trapèzes · Biceps · Avant-bras”,      emoji:“🦾”, color:”#00D4AA”, groups:[“back”,“traps”,“biceps”,“forearms”] },
{ id:“legs”,  label:“LEGS”,  desc:“Jambes · Mollets · Abdos”,                  emoji:“🦵”, color:”#A855F7”, groups:[“legs”,“calves”,“abs”] },
{ id:“upper”, label:“UPPER”, desc:“Poitrine · Dos · Épaules · Bras”,           emoji:“🏋️”, color:”#F43F5E”, groups:[“chest”,“back”,“shoulders”,“biceps”,“triceps”] },
{ id:“lower”, label:“LOWER”, desc:“Jambes · Mollets · Abdos · Avant-bras”,     emoji:“🦵”, color:”#8B5CF6”, groups:[“legs”,“calves”,“abs”,“forearms”] },
{ id:“full”,  label:“FULL”,  desc:“Corps complet”,                              emoji:“⚡”, color:”#EAB308”, groups:[“chest”,“back”,“legs”,“shoulders”,“abs”] },
];

const SINGLE_PICK = new Set([“forearms”,“calves”,“traps”]);
const MIN_PICKS = 3;
const PROTEIN_GOAL = 150;

const MEALS = {
breakfast:[
{ title:“Omelette musclée”,       time:“8 min”,  items:[“🥚 4 œufs + 2 blancs”,“🧀 Fromage cottage (3 c.s.)”,“🫑 Poivron + épinards”,“🌿 Herbes, sel, poivre”],          macros:“~420 kcal · 42g prot”, img:“https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&q=80”, badge:“💪 HIGH PROT” },
{ title:“Bowl avoine power”,       time:“5 min”,  items:[“🥣 Avoine (80g) + lait”,“🍌 Banane”,“🥜 Beurre d’arachide”,“🍯 Miel + 1 scoop whey”],                           macros:“~620 kcal · 45g prot”, img:“https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&q=80”, badge:“⚡ ÉNERGIE” },
{ title:“Toast avocat + œufs”,     time:“10 min”, items:[“🍞 2 toasts seigle”,“🥑 Avocat écrasé + citron”,“🥚 3 œufs pochés”,“🌶️ Flocons piment + chia”],               macros:“~550 kcal · 32g prot”, img:“https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80”, badge:“🔥 FAVORI” },
{ title:“Pancakes protéinés”,      time:“12 min”, items:[“🥚 3 œufs + 1 banane”,“🥣 50g avoine moulu”,“🥛 100ml lait + levure”,“🍓 Fraises + yogourt grec”],             macros:“~500 kcal · 36g prot”, img:“https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&q=80”, badge:“🥞 WEEKEND” },
{ title:“Yogourt parfait maison”,  time:“3 min”,  items:[“🫙 Yogourt grec 0% (300g)”,“🍓 Fruits (100g)”,“🌰 Granola + noix (40g)”,“🍯 Miel + graines de chia”],         macros:“~380 kcal · 30g prot”, img:“https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80”, badge:“⚡ RAPIDE” },
],
pre:[
{ title:“Option 1 — Classique”,   time:“60–90 min avant”, items:[“🥣 Avoine (80g) + lait”,“🍌 1 banane”,“🥚 2 œufs brouillés”],          macros:“~550 kcal · 30g prot · 65g glucides”, img:“https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400&q=80” },
{ title:“Option 2 — Rapide”,      time:“30–45 min avant”, items:[“🍞 2 toasts blé entier”,“🥜 Beurre d’arachide (2 c.s.)”,“🍯 Miel”],    macros:“~420 kcal · 16g prot · 55g glucides”, img:“https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80” },
{ title:“Option 3 — Smoothie”,    time:“20–30 min avant”, items:[“🥤 Whey (1 scoop)”,“🍌 Banane congelée”,“🫐 Bleuets (100g)”,“🥛 250ml lait”], macros:“~400 kcal · 35g prot · 50g glucides”, img:“https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80” },
],
post:[
{ title:“Option 1 — Meal prep”,   time:“Dans 45 min”, items:[“🍗 Poulet grillé (150g)”,“🍚 Riz (200g cuit)”,“🥦 Brocoli vapeur”,“🫒 Huile d’olive”],    macros:“~620 kcal · 48g prot · 70g glucides”, img:“https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80” },
{ title:“Option 2 — Rapide”,      time:“Dans 45 min”, items:[“🥚 4 œufs + 2 blancs”,“🍞 2 toasts”,“🥑 ½ avocat”,“🍅 Tomates cerises”],                   macros:“~550 kcal · 40g prot · 40g glucides”, img:“https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80” },
{ title:“Option 3 — Shake”,       time:“Immédiatement”,  items:[“🥤 Whey (1 scoop)”,“🍌 Banane”,“🍽️ Repas solide 1h après”],                             macros:“~350 kcal · 40g prot (shake)”, img:“https://images.unsplash.com/photo-1622484211148-b6c1cc6b6e11?w=400&q=80” },
],
lunch:[
{ title:“Bowl protéiné thon”,      time:“5 min”,  items:[“🐟 Thon (2 boîtes)”,“🍚 Riz ou quinoa (150g)”,“🥬 Épinards”,“🍋 Citron + sauce soya”], macros:“~520 kcal · 58g prot”, img:“https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80”, badge:“⚡ RAPIDE” },
{ title:“Wrap poulet grillé”,      time:“10 min”, items:[“🌯 Tortilla blé entier”,“🍗 Poulet (130g)”,“🧀 Fromage cottage”,“🥬 Laitue, tomate, avocat”], macros:“~580 kcal · 48g prot”, img:“https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80”, badge:“🔥 FAVORI” },
{ title:“Pasta poulet parmesan”,   time:“15 min”, items:[“🍝 Penne (80g sec)”,“🍗 Poulet haché (150g)”,“🍅 Sauce tomate”,“🧀 Parmesan (20g)”],    macros:“~680 kcal · 52g prot”, img:“https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&q=80”, badge:“🍝 MASSE” },
],
dessert:[
{ title:“Yogourt grec & baies”,    items:[“🫙 Yogourt grec 2% (200g)”,“🫐 Bleuets (100g)”,“🍯 Miel”,“🌰 Granola (30g)”],      macros:“~280 kcal · 22g prot”, why:“Caséine lente pour les muscles la nuit”, img:“https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80” },
{ title:“Pudding chia chocolat”,   items:[“🥛 250ml lait”,“🍫 2 c.s. cacao”,“🌱 4 c.s. graines de chia”,“🍯 Sirop d’érable”], macros:“~300 kcal · 14g prot”, why:“Oméga-3 réduit l’inflammation musculaire”, img:“https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&q=80” },
{ title:“Banane beurre d’arachide”,items:[“🍌 1 grande banane”,“🥜 2 c.s. beurre d’arachide”,“🍫 Chocolat noir (optionnel)”], macros:“~350 kcal · 10g prot”, why:“Potassium prévient les crampes”,           img:“https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&q=80” },
],
};

const QUICK_PROTEIN = [
[“🍗 Poulet 100g”,“31”],[“🥚 1 œuf”,“7”],[“🐟 Thon 1 boîte”,“30”],[“🫙 Yogourt grec 200g”,“20”],
[“🥤 Whey 1 scoop”,“25”],[“🧀 Cottage 100g”,“11”],[“🥩 Bœuf 100g”,“26”],[“🥛 Lait 250ml”,“8”],
];

// ─── STORAGE — artifact persistent window.storage (survives sessions) ────────
const todayKey = () => new Date().toISOString().slice(0, 10);

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────
function Stars({ n }) {
return <span>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:9,color:i<=n?”#f4c430”:”#222”}}>★</span>)}</span>;
}
function MiniChart({ entries, color }) {
const vals = entries.map(e => parseFloat(e.weight)||0).filter(v=>v>0);
if (vals.length < 2) return null;
const mn = Math.min(…vals), mx = Math.max(…vals), rng = mx-mn||1;
const W=90, H=28;
const pts = vals.map((v,i)=>`${(i/(vals.length-1))*W},${H-((v-mn)/rng)*(H-4)-2}`).join(” “);
return (
<svg width={W} height={H} style={{overflow:“visible”,flexShrink:0}}>
<polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
{vals.map((v,i)=>{const x=(i/(vals.length-1))*W,y=H-((v-mn)/rng)*(H-4)-2;return<circle key={i} cx={x} cy={y} r="2.5" fill={color}/>;})}
</svg>
);
}
function PRBadge({ delta }) {
if (!delta) return null;
const up = delta > 0;
return <span style={{background:up?”#00D4AA20”:”#ff444420”,color:up?”#00D4AA”:”#ff4444”,borderRadius:20,padding:“2px 8px”,fontFamily:”‘Sora’,sans-serif”,fontSize:10,fontWeight:700}}>{up?`▲ +${delta}kg`:`▼ ${delta}kg`}</span>;
}
function MealCard({ m, accentColor=”#FF6B35”, badge }) {
return (
<div style={{background:”#111”,border:“1px solid #1c1c1c”,borderRadius:16,overflow:“hidden”,marginBottom:14}}>
<img src={m.img} alt={m.title} style={{width:“100%”,height:130,objectFit:“cover”,display:“block”}} onError={e=>e.target.style.display=“none”}/>
<div style={{padding:16}}>
<div style={{display:“flex”,alignItems:“center”,justifyContent:“space-between”,marginBottom:8}}>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:19,letterSpacing:1}}>{m.title}</div>
{(badge||m.badge||m.time) && <span style={{background:accentColor+“20”,color:accentColor,borderRadius:20,padding:“3px 9px”,fontFamily:”‘Sora’,sans-serif”,fontSize:10,fontWeight:600,flexShrink:0}}>{badge||m.badge||m.time}</span>}
</div>
{m.time && m.badge && <div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:10,color:”#444”,marginBottom:8}}>⏱ {m.time}</div>}
{m.why && <div style={{background:”#A855F715”,border:“1px solid #A855F730”,borderRadius:10,padding:“9px 12px”,marginBottom:10}}><div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:11,color:”#A855F7”}}>✨ {m.why}</div></div>}
{m.items.map((item,j)=><div key={j} style={{fontFamily:”‘Sora’,sans-serif”,fontSize:13,color:”#ccc”,marginBottom:4}}>{item}</div>)}
<div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:11,color:”#555”,borderTop:“1px solid #1a1a1a”,paddingTop:10,marginTop:10}}>📊 {m.macros}</div>
</div>
</div>
);
}

// ─── BUILDER STEPS ────────────────────────────────────────────────────────────
function BuilderStepDays({ onSelect }) {
return (
<div>
<div style={S.stepTitle}>COMBIEN DE JOURS ?</div>
<div style={S.stepSub}>Choisis selon ton emploi du temps</div>
<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:12,marginTop:24}}>
{[3,4,5,6].map(n=>(
<button key={n} onClick={()=>onSelect(n)} style={S.bigBtn}
onMouseOver={e=>{e.currentTarget.style.borderColor=”#FF6B35”;e.currentTarget.style.background=”#FF6B3510”;}}
onMouseOut={e=>{e.currentTarget.style.borderColor=”#252525”;e.currentTarget.style.background=”#111”;}}>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:50,color:”#FF6B35”,lineHeight:1}}>{n}</div>
<div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:10,color:”#555”,marginTop:4}}>jours / semaine</div>
<div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:10,color:”#333”,marginTop:6}}>
{n===3?“Idéal débutant”:n===4?“Bon équilibre”:n===5?“Avancé”:“Expert”}
</div>
</button>
))}
</div>
</div>
);
}

function BuilderStepSchedule({ numDays, onSelect }) {
const opts = {
3:[{days:[“LUN”,“MER”,“VEN”],label:“Classique 3j”,desc:“Récupération optimale”},{days:[“MAR”,“JEU”,“SAM”],label:“Décalé 3j”,desc:“Flexibilité accrue”}],
4:[{days:[“LUN”,“MAR”,“JEU”,“VEN”],label:“4j semaine”,desc:“Week-end libre”},{days:[“LUN”,“MER”,“JEU”,“SAM”],label:“4j répartis”,desc:“Récupération équilibrée”}],
5:[{days:[“LUN”,“MAR”,“MER”,“JEU”,“VEN”],label:“Semaine complète”,desc:“Week-end de repos”},{days:[“LUN”,“MAR”,“JEU”,“VEN”,“SAM”],label:“5j répartis”,desc:“Repos midweek”}],
6:[{days:[“LUN”,“MAR”,“MER”,“JEU”,“VEN”,“SAM”],label:“6j / 1 repos”,desc:“Dimanche libre”}],
}[numDays]||[];
const ALL = [“LUN”,“MAR”,“MER”,“JEU”,“VEN”,“SAM”,“DIM”];
return (
<div>
<div style={S.stepTitle}>QUEL HORAIRE ?</div>
<div style={S.stepSub}>Choisis les jours qui s’intègrent à ta semaine</div>
<div style={{display:“flex”,flexDirection:“column”,gap:12,marginTop:24}}>
{opts.map((opt,i)=>(
<button key={i} onClick={()=>onSelect(opt.days)} style={{…S.bigBtn,textAlign:“left”,padding:“18px 20px”}}
onMouseOver={e=>{e.currentTarget.style.borderColor=”#00D4AA”;e.currentTarget.style.background=”#00D4AA10”;}}
onMouseOut={e=>{e.currentTarget.style.borderColor=”#252525”;e.currentTarget.style.background=”#111”;}}>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:17,color:”#fff”,letterSpacing:1,marginBottom:10}}>{opt.label}</div>
<div style={{display:“flex”,gap:5,marginBottom:8}}>
{ALL.map(d=>{const a=opt.days.includes(d);return(
<div key={d} style={{flex:1,textAlign:“center”}}>
<div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:8,color:a?”#fff”:”#222”,marginBottom:4,fontWeight:600}}>{d}</div>
<div style={{height:26,borderRadius:6,background:a?”#00D4AA25”:”#0f0f0f”,border:`1px solid ${a?"#00D4AA60":"#181818"}`,display:“flex”,alignItems:“center”,justifyContent:“center”,fontFamily:”‘Sora’,sans-serif”,fontSize:7,color:a?”#00D4AA”:”#1a1a1a”}}>
{a?“GYM”:”—”}
</div>
</div>
);})}
</div>
<div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:11,color:”#555”}}>{opt.desc}</div>
</button>
))}
</div>
</div>
);
}

function BuilderStepType({ dayIdx, gymDays, onSelect }) {
return (
<div>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:13,color:”#444”,letterSpacing:2,marginBottom:4}}>JOUR {dayIdx+1} / {gymDays.length} · {gymDays[dayIdx]}</div>
<div style={S.stepTitle}>TYPE DE SÉANCE</div>
<div style={S.stepSub}>Choisis le focus musculaire</div>
<div style={{display:“flex”,flexDirection:“column”,gap:10,marginTop:20}}>
{DAY_TEMPLATES.map(t=>(
<button key={t.id} onClick={()=>onSelect(t)} style={{background:”#111”,border:“1px solid #252525”,borderRadius:14,padding:“16px 18px”,cursor:“pointer”,textAlign:“left”,transition:“all .2s”,display:“flex”,alignItems:“center”,gap:14}}
onMouseOver={e=>{e.currentTarget.style.borderColor=t.color;e.currentTarget.style.background=t.color+“12”;}}
onMouseOut={e=>{e.currentTarget.style.borderColor=”#252525”;e.currentTarget.style.background=”#111”;}}>
<span style={{fontSize:24,flexShrink:0}}>{t.emoji}</span>
<div>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:19,color:t.color,letterSpacing:1}}>{t.label}</div>
<div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:11,color:”#555”,marginTop:2}}>{t.desc}</div>
</div>
</button>
))}
</div>
</div>
);
}

function BuilderStepPicker({ dayConfig, onComplete }) {
const { dayName, template } = dayConfig;
const groups = template.groups.map(g=>exerciseDB[g]).filter(Boolean);
const [picks, setPicks] = useState(()=>{
const init={};
template.groups.forEach(gk=>{ init[gk]=SINGLE_PICK.has(gk)?null:new Set(); });
return init;
});
const [preview, setPreview] = useState(null);

const isSingle = gk => SINGLE_PICK.has(gk);
const toggle = (gk, ex) => {
if (isSingle(gk)) { setPicks(p=>({…p,[gk]:p[gk]===ex.id?null:ex.id})); }
else { setPicks(p=>{const s=new Set(p[gk]);s.has(ex.id)?s.delete(ex.id):s.add(ex.id);return{…p,[gk]:s};}); }
};
const isPicked = (gk,id) => isSingle(gk)?picks[gk]===id:picks[gk]?.has(id);
const cnt = gk => isSingle(gk)?(picks[gk]?1:0):(picks[gk]?.size||0);
const min = gk => isSingle(gk)?1:MIN_PICKS;
const met = gk => cnt(gk)>=min(gk);
const canConfirm = template.groups.every(gk=>cnt(gk)>0);
const groupsMet = template.groups.filter(gk=>cnt(gk)>0).length;

const getAll = () => {
const r=[];
template.groups.forEach(gk=>{
const g=exerciseDB[gk]; if(!g)return;
if(isSingle(gk)){if(picks[gk])r.push(g.options.find(e=>e.id===picks[gk]));}
else picks[gk]?.forEach(id=>{const e=g.options.find(x=>x.id===id);if(e)r.push(e);});
});
return r.filter(Boolean);
};

return (
<div>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:13,color:”#444”,letterSpacing:2,marginBottom:4}}>{dayName} · {template.label}</div>
<div style={S.stepTitle}>CHOISIS TES EXERCICES</div>
<div style={S.stepSub}>Min <strong style={{color:”#fff”}}>3 par groupe</strong> · {groupsMet}/{template.groups.length} groupes</div>
<div style={{height:3,background:”#1a1a1a”,borderRadius:10,margin:“14px 0 22px”}}>
<div style={{height:“100%”,width:`${(groupsMet/template.groups.length)*100}%`,borderRadius:10,background:template.color,transition:“width .4s”}}/>
</div>
{groups.map((group,gi)=>{
const gk=template.groups[gi]; const single=isSingle(gk); const count=cnt(gk); const m=min(gk);
return (
<div key={gk} style={{marginBottom:22}}>
<div style={{display:“flex”,alignItems:“center”,gap:8,marginBottom:8}}>
<span style={{fontSize:15}}>{group.emoji}</span>
<span style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:15,color:met(gk)?group.color:”#555”,letterSpacing:2}}>{group.label}</span>
<span style={{fontFamily:”‘Sora’,sans-serif”,fontSize:10,color:met(gk)?group.color:”#444”}}>
{single?(count?“✓ choisi”:“choisir 1”):`${count}/${m}${count>=m?" ✓":""}`}
</span>
{!single&&<span style={{marginLeft:“auto”,fontFamily:”‘Sora’,sans-serif”,fontSize:9,color:”#333”,letterSpacing:1}}>MULTI</span>}
</div>
{!single&&<div style={{height:2,background:”#1a1a1a”,borderRadius:10,marginBottom:8}}><div style={{height:“100%”,width:`${Math.min((count/m)*100,100)}%`,borderRadius:10,background:met(gk)?group.color:”#444”,transition:“width .3s”}}/></div>}
<div style={{display:“flex”,flexDirection:“column”,gap:7}}>
{group.options.map(ex=>{
const picked=isPicked(gk,ex.id); const isP=preview===ex.id;
return (
<div key={ex.id} style={{background:picked?group.color+“15”:”#111”,border:`1px solid ${picked?group.color:"#1c1c1c"}`,borderRadius:12,overflow:“hidden”,transition:“all .2s”}}>
<div style={{display:“flex”,alignItems:“center”,gap:11,padding:“11px 13px”,cursor:“pointer”}} onClick={()=>toggle(gk,ex)}>
<div style={{width:21,height:21,flexShrink:0,borderRadius:single?“50%”:5,border:`2px solid ${picked?group.color:"#2a2a2a"}`,background:picked?group.color:“none”,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:10,color:”#000”,transition:“all .2s”}}>{picked?“✓”:””}</div>
<div style={{flex:1}}>
<div style={{fontFamily:”‘Sora’,sans-serif”,fontWeight:600,fontSize:13,color:picked?”#fff”:”#ccc”}}>{ex.name}</div>
<div style={{display:“flex”,gap:8,marginTop:3,alignItems:“center”}}><Stars n={ex.stars}/><span style={{fontFamily:”‘Sora’,sans-serif”,fontSize:10,color:”#444”}}>{ex.sets}×{ex.reps}</span></div>
</div>
<button onClick={e=>{e.stopPropagation();setPreview(isP?null:ex.id);}} style={{background:“none”,border:“1px solid #2a2a2a”,borderRadius:6,padding:“4px 7px”,color:”#444”,fontSize:9,cursor:“pointer”,flexShrink:0,fontFamily:”‘Sora’,sans-serif”}}>{isP?“▲”:“GIF”}</button>
</div>
{isP&&<div style={{borderTop:“1px solid #1c1c1c”}}><img src={ex.img} alt={ex.name} style={{width:“100%”,height:120,objectFit:“cover”,display:“block”}} onError={e=>e.target.style.display=“none”}/><div style={{padding:“9px 13px 11px”,fontFamily:”‘Sora’,sans-serif”,fontSize:11,color:”#666”}}>💡 {ex.tip}</div></div>}
</div>
);
})}
</div>
</div>
);
})}
{getAll().length>0&&(
<div style={{background:”#0e0e0e”,border:“1px solid #1a1a1a”,borderRadius:12,padding:“13px 15px”,marginBottom:12}}>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:12,color:”#444”,letterSpacing:2,marginBottom:9}}>RÉSUMÉ — {getAll().length} EXERCICES</div>
{getAll().map((ex,i)=><div key={ex.id} style={{display:“flex”,alignItems:“center”,gap:8,marginBottom:5}}><span style={{fontFamily:”‘Sora’,sans-serif”,fontSize:10,color:”#333”,minWidth:16}}>{i+1}.</span><span style={{fontFamily:”‘Sora’,sans-serif”,fontSize:12,color:”#888”}}>{ex.name}</span><span style={{marginLeft:“auto”,fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:12,color:template.color,letterSpacing:1}}>{ex.sets}×{ex.reps}</span></div>)}
</div>
)}
<button disabled={!canConfirm} onClick={()=>onComplete(getAll())} style={{width:“100%”,padding:“14px”,borderRadius:12,border:“none”,background:canConfirm?template.color:”#1a1a1a”,color:canConfirm?”#000”:”#333”,fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:17,letterSpacing:2,cursor:canConfirm?“pointer”:“not-allowed”,transition:“all .2s”,marginBottom:6}}>
{canConfirm?`CONFIRMER — ${getAll().length} EXERCICES`:`COMPLÈTE TOUS LES GROUPES (${groupsMet}/${template.groups.length})`}
</button>
</div>
);
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const S = {
stepTitle:{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:28,letterSpacing:1.5,lineHeight:1.1,marginBottom:4},
stepSub:{fontFamily:”‘Sora’,sans-serif”,fontSize:12,color:”#555”},
bigBtn:{background:”#111”,border:“1px solid #252525”,borderRadius:16,padding:20,cursor:“pointer”,textAlign:“center”,transition:“all .2s”,display:“block”,width:“100%”},
};

export default function App() {
// Builder state
const [builderStep, setBuilderStep] = useState(“days”);
const [numDays, setNumDays]         = useState(null);
const [gymDays, setGymDays]         = useState([]);
const [dayConfigs, setDayConfigs]   = useState([]);
const [dayExercises, setDayExercises] = useState([]);
const [builderDayIdx, setBuilderDayIdx] = useState(0);
const [plan, setPlan]               = useState(null);

// Dashboard state
const [loaded, setLoaded]           = useState(false);
const [activeTab, setActiveTab]     = useState(“workout”);
const [activeDay, setActiveDay]     = useState(0);
const [activeMeal, setActiveMeal]   = useState(“breakfast”);
const [expandedEx, setExpandedEx]   = useState(null);
const [logs, setLogs]               = useState({});
const [logModal, setLogModal]       = useState(null);
const [logForm, setLogForm]         = useState({weight:””,reps:””,note:””});
const [histEx, setHistEx]           = useState(null);
const [proteinLog, setProteinLog]   = useState({});
const [protForm, setProtForm]       = useState({name:””,g:””});
const [photos, setPhotos]           = useState([]);
const [photoModal, setPhotoModal]   = useState(false);
const [photoNote, setPhotoNote]     = useState(””);
const [viewPhoto, setViewPhoto]     = useState(null);

// Load all data on mount from persistent storage
useEffect(() => {
async function load() {
try {
const [p, l, pr, ph] = await Promise.all([
window.storage.get(“gym_plan”).catch(()=>null),
window.storage.get(“gym_logs”).catch(()=>null),
window.storage.get(“gym_prot”).catch(()=>null),
window.storage.get(“gym_photos”).catch(()=>null),
]);
if (p)  setPlan(JSON.parse(p.value));
if (l)  setLogs(JSON.parse(l.value));
if (pr) setProteinLog(JSON.parse(pr.value));
if (ph) setPhotos(JSON.parse(ph.value));
} catch(e) { console.log(“load error”, e); }
setLoaded(true);
}
load();
}, []);

// Save whenever data changes (only after initial load)
useEffect(() => { if(loaded) window.storage.set(“gym_logs”,    JSON.stringify(logs)).catch(()=>{}); }, [logs, loaded]);
useEffect(() => { if(loaded) window.storage.set(“gym_prot”,    JSON.stringify(proteinLog)).catch(()=>{}); }, [proteinLog, loaded]);
useEffect(() => { if(loaded) window.storage.set(“gym_photos”,  JSON.stringify(photos)).catch(()=>{}); }, [photos, loaded]);
useEffect(() => {
if (!loaded) return;
if (plan) window.storage.set(“gym_plan”, JSON.stringify(plan)).catch(()=>{});
else       window.storage.delete(“gym_plan”).catch(()=>{});
}, [plan, loaded]);

const handleReset = () => {
window.storage.delete(“gym_plan”).catch(()=>{});
setPlan(null);
setBuilderStep(“days”); setNumDays(null); setGymDays([]);
setDayConfigs([]); setDayExercises([]); setBuilderDayIdx(0);
setActiveTab(“workout”); setActiveDay(0);
};

const today = todayKey();
const todayProt = (proteinLog[today]||[]).reduce((a,e)=>a+(parseFloat(e.g)||0),0);

// Protein helpers
const addProtEntry = () => {
if(!protForm.name||!protForm.g) return;
const entry={id:Date.now(),name:protForm.name,g:parseFloat(protForm.g)};
setProteinLog(p=>({…p,[today]:[…(p[today]||[]),entry]}));
setProtForm({name:””,g:””});
};
const removeProtEntry = id => setProteinLog(p=>({…p,[today]:(p[today]||[]).filter(e=>e.id!==id)}));
const quickAddProt = (label,g) => setProteinLog(p=>({…p,[today]:[…(p[today]||[]),{id:Date.now(),name:label,g:parseFloat(g)}]}));

// Photo helpers
const handlePhotoUpload = e => {
const file=e.target.files[0]; if(!file)return;
const reader=new FileReader();
reader.onload=ev=>{ setPhotos(p=>[…p,{id:Date.now(),date:today,week:p.length+1,dataUrl:ev.target.result,note:photoNote}]); setPhotoModal(false); setPhotoNote(””); };
reader.readAsDataURL(file);
};

// Workout log helpers
const getExLogs = id => logs[id]||[];
const lastEntry = id => { const a=getExLogs(id); return a.length?a[a.length-1]:null; };
const prDelta   = id => { const a=getExLogs(id).filter(l=>parseFloat(l.weight)>0); if(a.length<2)return null; return parseFloat(a[a.length-1].weight)-parseFloat(a[a.length-2].weight); };
const saveLog   = () => {
if(!logModal)return;
const entry={date:today,weight:logForm.weight,reps:logForm.reps,note:logForm.note};
setLogs(p=>{const arr=p[logModal.ex.id]?[…p[logModal.ex.id],entry]:[entry];return{…p,[logModal.ex.id]:arr};});
setLogModal(null); setLogForm({weight:””,reps:””,note:””});
};

// Builder flow
const resetBuilder = () => { setBuilderStep(“days”); setNumDays(null); setGymDays([]); setDayConfigs([]); setDayExercises([]); setBuilderDayIdx(0); };
const finishBuilder = (lastExs) => {
const exs=[…dayExercises,lastExs];
const built=dayConfigs.map((dc,i)=>({dayName:dc.dayName,template:dc.template,exercises:exs[i]||[]}));
setPlan(built);
setActiveTab(“workout”);
};

// ── LOADING ────────────────────────────────────────────────────────────────
if (!loaded) {
return (
<div style={{minHeight:“100vh”,background:”#070707”,display:“flex”,flexDirection:“column”,alignItems:“center”,justifyContent:“center”,gap:16}}>
<style>{css}</style>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:32,color:”#fff”,letterSpacing:3}}>BUILD & DEFINE</div>
<div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:12,color:”#444”}}>Chargement de tes données…</div>
<div style={{width:48,height:48,border:“3px solid #1a1a1a”,borderTop:“3px solid #FF6B35”,borderRadius:“50%”,animation:“spin 1s linear infinite”}}/>
<style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
</div>
);
}

// ── BUILDER UI ─────────────────────────────────────────────────────────────
if (!plan) {
const totalSteps = 2 + (gymDays.length||3)*2;
const stepIdx = builderStep===“days”?0:builderStep===“schedule”?1:gymDays.reduce((a,_,i)=>builderStep===`type-${i}`?2+i*2:builderStep===`pick-${i}`?3+i*2:a,0);
return (
<div style={{minHeight:“100vh”,background:”#070707”,fontFamily:”‘Bebas Neue’,Impact,sans-serif”,color:”#fff”}}>
<style>{css}</style>
<div style={{background:”#0e0e0e”,borderBottom:“1px solid #181818”,padding:“14px 18px”}}>
<div style={{maxWidth:600,margin:“0 auto”,display:“flex”,alignItems:“center”,justifyContent:“space-between”}}>
<div>
<div style={{fontFamily:”‘Bebas Neue’,sans-serif”,fontSize:22,letterSpacing:3}}>GYM BUILDER</div>
<div style={{fontFamily:”‘Sora’,sans-serif”,fontSize:10,color:”#333”,marginTop:1}}>Construis ton plan personnalisé</div>
</div>
{builderStep!==“days”&&<button onClick={resetBuilder} style={{background:“none”,border:“1px solid #222”,borderRadius:8,padding:“5px 11px”,color:”#444”,fontFamily:”‘Sora’,sans-serif”,fontSize:11,cursor:“pointer”}}>↩ Recommencer</button>}
</div>
{builderStep!==“days”&&<div style={{maxWidth:600,margin:“10px auto 0”}}><div style={{height:2,background:”#1a1a1a”,borderRadius:10}}><div style={{height:“100%”,width:`${(stepIdx/totalSteps)*100}%`,background:“linear-gradient(90deg,#FF6B35,#A855F7)”,borderRadius:10,transition:“width .5s”}}/></div></div>}
</div>
<div style={{maxWidth:600,margin:“0 auto”,padding:“26px 16px 80px”}} className=“fade-up” key={builderStep}>
{builderStep===“days” && <BuilderStepDays onSelect={n=>{setNumDays(n);setBuilderStep(“schedule”);}}/>}
{builderStep===“schedule” && <BuilderStepSchedule numDays={numDays} onSelect={days=>{setGymDays(days);setBuilderDayIdx(0);setBuilderStep(“type-0”);}}/>}
{gymDays.map((_,i)=>[
builderStep===`type-${i}`&&<BuilderStepType key={`t${i}`} dayIdx={i} gymDays={gymDays} onSelect={t=>{const nc=[…dayConfigs];nc[i]={dayName:gymDays[i],template:t};setDayConfigs(nc);setBuilderStep(`pick-${i}`);}}/>,
builderStep===`pick-${i}`&&dayConfigs[i]&&<BuilderStepPicker key={`p${i}`} dayConfig={dayConfigs[i]} onComplete={exs=>{
if(i+1<gymDays.length){const ne=[…dayExercises];ne[i]=exs;setDayExercises(ne);setBuilderDayIdx(i+1);setBuilderStep(`type-${i+1}`);}
else{const ne=[…dayExercises];ne[i]=exs;const built=dayConfigs.map((dc,j)=>({dayName:dc.dayName,template:dc.template,exercises:ne[j]||[]}));setPlan(built);setActiveTab(“workout”);}
}}/>,
])}
</div>
</div>
);
}

// ── DASHBOARD UI ───────────────────────────────────────────────────────────
const currentDay = plan[activeDay];
const TABS = [[“workout”,“🏋️ SÉANCES”],[“progress”,“📈 GAINS”],[“protein”,“🥩 PROTÉINES”],[“photos”,“📸 PHOTOS”],[“nutrition”,“🍽️ REPAS”]];

return (
<div style={{minHeight:“100vh”,background:”#080808”,fontFamily:”‘Bebas Neue’,Impact,sans-serif”,color:”#fff”}}>
<style>{css}</style>

```
  {/* NAV */}
  <div style={{background:"#0e0e0e",borderBottom:"1px solid #1a1a1a",position:"sticky",top:0,zIndex:100}}>
    <div style={{maxWidth:620,margin:"0 auto",padding:"0 14px"}}>
      <div style={{display:"flex",alignItems:"center",padding:"13px 0 9px"}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:21,letterSpacing:2}}>BUILD & DEFINE</div>
          <div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#333",marginTop:1}}>{plan.length} jours · {plan.reduce((a,d)=>a+d.exercises.length,0)} exercices</div>
        </div>
        <button onClick={handleReset} style={{marginLeft:"auto",background:"none",border:"1px solid #222",borderRadius:8,padding:"5px 10px",color:"#444",fontFamily:"'Sora',sans-serif",fontSize:10,cursor:"pointer"}}>✏️ Nouveau plan</button>
      </div>
      <div style={{display:"flex",overflowX:"auto"}}>
        {TABS.map(([id,label])=>(
          <button key={id} onClick={()=>setActiveTab(id)} style={{flex:"0 0 auto",padding:"11px 10px",background:"none",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:"11px",letterSpacing:2,color:activeTab===id?"#fff":"#444",cursor:"pointer",borderBottom:activeTab===id?"2px solid #FF6B35":"2px solid transparent",whiteSpace:"nowrap",transition:"all .2s"}}>{label}</button>
        ))}
      </div>
    </div>
  </div>

  <div style={{maxWidth:620,margin:"0 auto",padding:"20px 15px 80px"}}>

    {/* ── WORKOUT ─────────────────────────────────────────────────────── */}
    {activeTab==="workout"&&(
      <div className="fade-up">
        {/* Day pills */}
        <div style={{display:"flex",gap:7,marginBottom:18,overflowX:"auto",paddingBottom:4}}>
          {plan.map((d,i)=>(
            <button key={i} onClick={()=>setActiveDay(i)} style={{padding:"7px 14px",borderRadius:100,whiteSpace:"nowrap",background:activeDay===i?d.template.color+"25":"#111",border:`1px solid ${activeDay===i?d.template.color:"#222"}`,color:activeDay===i?"#fff":"#555",fontFamily:"'Bebas Neue',sans-serif",fontSize:12,letterSpacing:2,cursor:"pointer",transition:"all .2s"}}>
              {d.dayName} · {d.template.label}
            </button>
          ))}
        </div>
        {/* Day header */}
        <div style={{background:"#111",border:`1px solid ${currentDay.template.color}30`,borderRadius:14,padding:"14px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>{currentDay.template.emoji}</span>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:1}}>{currentDay.dayName} — <span style={{color:currentDay.template.color}}>{currentDay.template.label}</span></div>
            <div style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#555",marginTop:2}}>{currentDay.template.desc}</div>
          </div>
          <div style={{marginLeft:"auto",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:currentDay.template.color,letterSpacing:1}}>{currentDay.exercises.length} EX</div>
        </div>
        {/* Exercises */}
        {currentDay.exercises.map((ex,i)=>{
          const isOpen=expandedEx===ex.id; const last=lastEntry(ex.id); const delta=prDelta(ex.id);
          return (
            <div key={ex.id} style={{background:"#111",border:`1px solid ${isOpen?currentDay.template.color:"#1c1c1c"}`,borderRadius:14,marginBottom:9,overflow:"hidden",transition:"border-color .2s",cursor:"pointer"}} onClick={()=>setExpandedEx(isOpen?null:ex.id)}>
              <div style={{display:"flex",alignItems:"center",gap:11,padding:"13px 13px"}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:currentDay.template.color+"20",border:`1px solid ${currentDay.template.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:currentDay.template.color,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Sora',sans-serif",fontWeight:600,fontSize:13,color:"#eee"}}>{ex.name}</div>
                  <div style={{display:"flex",gap:8,marginTop:4,alignItems:"center",flexWrap:"wrap"}}>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:currentDay.template.color,letterSpacing:1}}>{ex.sets}×{ex.reps}</span>
                    {last&&<span style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#555"}}>Dernier: {last.weight?`${last.weight}kg`:""}{last.reps?` ×${last.reps}`:""}</span>}
                    <PRBadge delta={delta}/>
                  </div>
                </div>
                <span style={{color:"#333",fontSize:11}}>{isOpen?"▲":"▼"}</span>
              </div>
              {isOpen&&(
                <div>
                  <img src={ex.img} alt={ex.name} style={{width:"100%",height:140,objectFit:"cover",display:"block",borderTop:"1px solid #1c1c1c"}} onError={e=>e.target.style.display="none"}/>
                  <div style={{padding:"10px 13px 4px",fontFamily:"'Sora',sans-serif",fontSize:11,color:"#666"}}>💡 {ex.tip}</div>
                  {getExLogs(ex.id).length>0&&(
                    <div style={{padding:"0 13px 10px"}}>
                      <div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#333",letterSpacing:1,marginBottom:5}}>DERNIÈRES SÉANCES</div>
                      {getExLogs(ex.id).slice(-3).reverse().map((l,j)=>(
                        <div key={j} style={{display:"flex",gap:8,fontFamily:"'Sora',sans-serif",fontSize:11,color:"#666",marginBottom:2}}>
                          <span style={{color:"#2a2a2a",minWidth:70}}>{l.date}</span>
                          {l.weight&&<span style={{color:"#aaa"}}>{l.weight}kg</span>}
                          {l.reps&&<span style={{color:"#888"}}>×{l.reps}</span>}
                          {l.note&&<span style={{color:"#555",fontStyle:"italic"}}>— {l.note}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{display:"flex",gap:8,padding:"0 13px 13px"}}>
                    <button onClick={e=>{e.stopPropagation();setLogModal({ex,color:currentDay.template.color});setLogForm({weight:"",reps:"",note:""}); }} style={{background:currentDay.template.color+"20",border:`1px solid ${currentDay.template.color}50`,color:currentDay.template.color,borderRadius:8,padding:"6px 12px",fontFamily:"'Sora',sans-serif",fontSize:11,fontWeight:600,cursor:"pointer"}}>＋ Logger</button>
                    {getExLogs(ex.id).length>0&&<button onClick={e=>{e.stopPropagation();setHistEx(ex.id);}} style={{background:"none",border:"1px solid #222",color:"#555",borderRadius:8,padding:"6px 10px",fontFamily:"'Sora',sans-serif",fontSize:10,cursor:"pointer"}}>Historique ({getExLogs(ex.id).length})</button>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {/* Weekly schedule */}
        <div style={{background:"#0e0e0e",border:"1px solid #1a1a1a",borderRadius:14,padding:16,marginTop:18}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"#444",letterSpacing:2,marginBottom:12}}>HORAIRE SEMAINE</div>
          <div style={{display:"flex",gap:4}}>
            {["LUN","MAR","MER","JEU","VEN","SAM","DIM"].map((d,i)=>{
              const gymDay=plan.find(p=>p.dayName===d);
              return (
                <div key={d} style={{flex:1,textAlign:"center"}}>
                  <div style={{fontFamily:"'Sora',sans-serif",fontSize:8,fontWeight:600,color:gymDay?"#fff":"#222",marginBottom:5}}>{d}</div>
                  <div style={{height:34,borderRadius:7,background:gymDay?gymDay.template.color+"20":"#0f0f0f",border:`1px solid ${gymDay?gymDay.template.color+"50":"#181818"}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:9,color:gymDay?gymDay.template.color:"#1a1a1a",letterSpacing:1}}>
                    {gymDay?gymDay.template.label:"—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )}

    {/* ── PROGRESS ────────────────────────────────────────────────────── */}
    {activeTab==="progress"&&(
      <div className="fade-up">
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,letterSpacing:1,marginBottom:4}}>MA PROGRESSION</div>
        <div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:22}}>
          {Object.values(logs).reduce((a,v)=>a+v.length,0)===0?"Commence par logger des sets dans l'onglet Séances.":
          `${Object.values(logs).reduce((a,v)=>a+v.length,0)} sets enregistrés`}
        </div>
        {/* Summary cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:26}}>
          {[
            {label:"Sets totaux",val:Object.values(logs).reduce((a,v)=>a+v.length,0),icon:"🔢",c:"#FF6B35"},
            {label:"Exercices trackés",val:Object.keys(logs).length,icon:"📊",c:"#00D4AA"},
            {label:"Photos semaines",val:photos.length,icon:"📸",c:"#A855F7"},
            {label:"Jours actifs",val:(()=>{const w=new Set();Object.values(logs).forEach(arr=>arr.forEach(l=>w.add(l.date)));return w.size;})(),icon:"📅",c:"#f4c430"},
          ].map((n,i)=>(
            <div key={i} style={{background:"#111",border:`1px solid ${n.c}25`,borderRadius:12,padding:14}}>
              <div style={{fontSize:20,marginBottom:6}}>{n.icon}</div>
              <div style={{fontFamily:"'Sora',sans-serif",fontSize:9,color:"#444",letterSpacing:1,textTransform:"uppercase"}}>{n.label}</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:n.c,letterSpacing:1}}>{n.val}</div>
            </div>
          ))}
        </div>
        {/* Per-day breakdown */}
        {plan.map(d=>{
          const exWithData=d.exercises.filter(ex=>getExLogs(ex.id).length>0);
          if(!exWithData.length)return null;
          return (
            <div key={d.dayName} style={{marginBottom:22}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <span style={{fontSize:18}}>{d.template.emoji}</span>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:19,letterSpacing:1}}>{d.dayName} · {d.template.label}</span>
              </div>
              {exWithData.map(ex=>{
                const exLogs=getExLogs(ex.id); const delta=prDelta(ex.id); const last=lastEntry(ex.id);
                const best=exLogs.filter(l=>parseFloat(l.weight)>0).reduce((a,l)=>parseFloat(l.weight)>a?parseFloat(l.weight):a,0);
                return (
                  <div key={ex.id} style={{background:"#0e0e0e",border:"1px solid #181818",borderRadius:12,padding:13,marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,marginBottom:10}}>
                      <div>
                        <div style={{fontFamily:"'Sora',sans-serif",fontWeight:600,fontSize:12,color:"#ddd"}}>{ex.name}</div>
                        <div style={{display:"flex",gap:8,marginTop:4,flexWrap:"wrap"}}>
                          {last?.weight&&<span style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#666"}}>Dernière: {last.weight}kg</span>}
                          {best>0&&<span style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#555"}}>Meilleur: {best}kg</span>}
                          <PRBadge delta={delta}/>
                        </div>
                      </div>
                      <MiniChart entries={exLogs} color={d.template.color}/>
                    </div>
                    <button onClick={()=>setHistEx(ex.id)} style={{background:"none",border:"1px solid #222",color:"#555",borderRadius:8,padding:"4px 9px",fontFamily:"'Sora',sans-serif",fontSize:10,cursor:"pointer"}}>Voir {exLogs.length} entrée{exLogs.length>1?"s":""}</button>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* Rules */}
        <div style={{background:"#111",border:"1px solid #1a1a1a",borderRadius:14,padding:16,marginTop:8}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:"#f4c430",letterSpacing:2,marginBottom:12}}>⚡ RÈGLES — PROGRÈS RAPIDE</div>
          {[["Tempo 3-1","Descend en 3 sec, remonte en 1. Temps sous tension = muscle sculpté."],["Surcharge progressive","Complètes toutes les reps 2x → +2.5kg. Règle #1 pour progresser."],["Stop 1–2 reps avant l'échec","Tu récupères mieux, tu t'entraînes plus souvent."],["Déload semaine 5","−20% du poids 1 semaine. Les muscles repoussent plus forts après."]].map(([t,d],i)=>(
            <div key={i} style={{marginBottom:11,paddingBottom:11,borderBottom:i<3?"1px solid #1a1a1a":"none"}}>
              <div style={{fontFamily:"'Sora',sans-serif",fontWeight:600,fontSize:12,color:"#ccc",marginBottom:2}}>{t}</div>
              <div style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#555",lineHeight:1.6}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* ── PROTEIN ─────────────────────────────────────────────────────── */}
    {activeTab==="protein"&&(
      <div className="fade-up">
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,letterSpacing:1,marginBottom:4}}>PROTÉINES DU JOUR</div>
        <div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:20}}>Objectif : {PROTEIN_GOAL}g · {today}</div>
        {/* Ring */}
        {(()=>{
          const pct=Math.min(todayProt/PROTEIN_GOAL,1),r=68,cx=80,cy=80,stroke=11,circ=2*Math.PI*r,dash=pct*circ;
          const color=todayProt>=PROTEIN_GOAL?"#00D4AA":todayProt>=PROTEIN_GOAL*0.7?"#f4c430":"#FF6B35";
          return (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:24}}>
              <div style={{position:"relative",width:160,height:160}}>
                <svg width="160" height="160">
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a1a" strokeWidth={stroke}/>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 80 80)" style={{transition:"stroke-dasharray .6s"}}/>
                </svg>
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,color,lineHeight:1}}>{Math.round(todayProt)}</div>
                  <div style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#555"}}>/ {PROTEIN_GOAL}g</div>
                  <div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:todayProt>=PROTEIN_GOAL?"#00D4AA":"#444",marginTop:4,fontWeight:600}}>
                    {todayProt>=PROTEIN_GOAL?"✅ OBJECTIF!":`${PROTEIN_GOAL-Math.round(todayProt)}g restants`}
                  </div>
                </div>
              </div>
              <div style={{width:"100%",maxWidth:300,marginTop:14}}>
                <div style={{height:6,background:"#1a1a1a",borderRadius:10,overflow:"hidden"}}><div style={{height:"100%",borderRadius:10,width:`${pct*100}%`,background:color,transition:"width .5s"}}/></div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#333"}}>0g</span><span style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#333"}}>{PROTEIN_GOAL}g</span></div>
              </div>
            </div>
          );
        })()}
        {/* Add entry */}
        <div style={{background:"#111",border:"1px solid #1f1f1f",borderRadius:14,padding:15,marginBottom:18}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"#555",letterSpacing:2,marginBottom:11}}>＋ AJOUTER</div>
          <div style={{display:"flex",gap:8,marginBottom:9}}>
            <input className="inp" style={{flex:2}} placeholder="Aliment…" value={protForm.name} onChange={e=>setProtForm(f=>({...f,name:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addProtEntry()}/>
            <input className="inp" style={{flex:1}} type="number" placeholder="g prot" value={protForm.g} onChange={e=>setProtForm(f=>({...f,g:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&addProtEntry()}/>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
            {QUICK_PROTEIN.map(([label,g])=>(
              <button key={label} onClick={()=>quickAddProt(label,g)} style={{background:"#0e0e0e",border:"1px solid #252525",borderRadius:20,padding:"4px 9px",fontFamily:"'Sora',sans-serif",fontSize:10,color:"#777",cursor:"pointer"}}>
                {label} <span style={{color:"#00D4AA",fontWeight:600}}>+{g}g</span>
              </button>
            ))}
          </div>
          <button onClick={addProtEntry} style={{width:"100%",padding:"10px",background:"#FF6B3520",border:"1px solid #FF6B3550",borderRadius:10,color:"#FF6B35",fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,cursor:"pointer"}}>AJOUTER</button>
        </div>
        {/* Today */}
        {(proteinLog[today]||[]).length>0&&(
          <div style={{marginBottom:18}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#444",letterSpacing:2,marginBottom:9}}>AUJOURD'HUI</div>
            {(proteinLog[today]||[]).map(e=>(
              <div key={e.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #141414"}}>
                <div style={{flex:1,fontFamily:"'Sora',sans-serif",fontSize:13,color:"#ccc"}}>{e.name}</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,color:"#00D4AA",letterSpacing:1}}>+{e.g}g</div>
                <button onClick={()=>removeProtEntry(e.id)} style={{background:"none",border:"none",color:"#2a2a2a",cursor:"pointer",fontSize:14}}>✕</button>
              </div>
            ))}
          </div>
        )}
        {/* History */}
        {(()=>{
          const past=Object.entries(proteinLog).filter(([d])=>d!==today).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,7);
          if(!past.length)return null;
          return (
            <div style={{background:"#0e0e0e",border:"1px solid #1a1a1a",borderRadius:14,padding:16}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#444",letterSpacing:2,marginBottom:13}}>7 DERNIERS JOURS</div>
              {past.map(([date,entries])=>{
                const total=entries.reduce((a,e)=>a+(parseFloat(e.g)||0),0); const hit=total>=PROTEIN_GOAL;
                return (
                  <div key={date} style={{marginBottom:9}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                      <span style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#444"}}>{date}</span>
                      <span style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:hit?"#00D4AA":"#555",fontWeight:600}}>{Math.round(total)}g {hit?"✅":""}</span>
                    </div>
                    <div style={{height:3,background:"#1a1a1a",borderRadius:10}}><div style={{height:"100%",width:`${Math.min(total/PROTEIN_GOAL*100,100)}%`,borderRadius:10,background:hit?"#00D4AA":total>=PROTEIN_GOAL*0.7?"#f4c430":"#FF6B35",transition:"width .4s"}}/></div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    )}

    {/* ── PHOTOS ──────────────────────────────────────────────────────── */}
    {activeTab==="photos"&&(
      <div className="fade-up">
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,letterSpacing:1,marginBottom:4}}>PROGRESSION PHYSIQUE</div>
        <div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:18}}>Une photo par semaine pour voir ta transformation 📸</div>
        <button onClick={()=>setPhotoModal(true)} style={{width:"100%",padding:"15px",background:"#111",border:"2px dashed #2a2a2a",borderRadius:16,color:"#555",fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:2,cursor:"pointer",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"center",gap:10,transition:"all .2s"}}
          onMouseOver={e=>{e.currentTarget.style.borderColor="#FF6B35";e.currentTarget.style.color="#FF6B35";}}
          onMouseOut={e=>{e.currentTarget.style.borderColor="#2a2a2a";e.currentTarget.style.color="#555";}}>
          📸 AJOUTER SEMAINE {photos.length+1}
        </button>
        <div style={{background:"#111",border:"1px solid #1f1f1f",borderRadius:12,padding:"11px 14px",marginBottom:20,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{fontSize:16,flexShrink:0}}>💡</span>
          <div style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#555",lineHeight:1.7}}>Même heure chaque semaine (matin à jeun idéal), même lumière, même angle. Quelques reps avant pour pomper les muscles.</div>
        </div>
        {photos.length===0?(
          <div style={{textAlign:"center",padding:"50px 20px"}}>
            <div style={{fontSize:48,marginBottom:14}}>📷</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"#222"}}>AUCUNE PHOTO ENCORE</div>
            <div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#333",marginTop:6}}>Ta première photo est ta baseline — la plus importante.</div>
          </div>
        ):(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
              {photos.map((p,i)=>(
                <div key={p.id} onClick={()=>setViewPhoto(p)} style={{cursor:"pointer",borderRadius:14,overflow:"hidden",border:"1px solid #1a1a1a",position:"relative",aspectRatio:"3/4",background:"#111"}}>
                  <img src={p.dataUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,.85))",padding:"18px 10px 10px"}}>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:"#fff",letterSpacing:1}}>SEMAINE {p.week}</div>
                    <div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#888"}}>{p.date}</div>
                  </div>
                  {i===photos.length-1&&<div style={{position:"absolute",top:8,right:8,background:"#FF6B35",borderRadius:20,padding:"2px 7px",fontFamily:"'Sora',sans-serif",fontSize:8,fontWeight:700,color:"#000"}}>LATEST</div>}
                </div>
              ))}
            </div>
            {photos.length>=2&&(
              <div style={{background:"#111",border:"1px solid #1f1f1f",borderRadius:14,overflow:"hidden",marginBottom:14}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"#555",letterSpacing:2,padding:"13px 15px 9px"}}>AVANT → MAINTENANT</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:"#1a1a1a"}}>
                  {[photos[0],photos[photos.length-1]].map((p,i)=>(
                    <div key={p.id} style={{position:"relative",aspectRatio:"3/4",background:"#111"}}>
                      <img src={p.dataUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                      <div style={{position:"absolute",top:8,left:8,background:i===0?"#1a1a1a":"#FF6B35",borderRadius:20,padding:"3px 9px",fontFamily:"'Bebas Neue',sans-serif",fontSize:11,color:i===0?"#666":"#000",letterSpacing:1}}>{i===0?"SEMAINE 1":`SEM. ${p.week}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )}

    {/* ── NUTRITION ───────────────────────────────────────────────────── */}
    {activeTab==="nutrition"&&(
      <div className="fade-up">
        <div style={{display:"flex",borderBottom:"1px solid #1a1a1a",marginBottom:22,overflowX:"auto"}}>
          {[["breakfast","🍳 DÉJEUNER"],["pre","☀️ AVANT"],["post","⚡ APRÈS"],["lunch","🍽️ DÎNER"],["dessert","🍫 DESSERT"]].map(([id,label])=>(
            <button key={id} onClick={()=>setActiveMeal(id)} style={{flex:"0 0 auto",padding:"10px 10px",background:"none",border:"none",fontFamily:"'Bebas Neue',sans-serif",fontSize:"11px",letterSpacing:2,color:activeMeal===id?"#fff":"#444",cursor:"pointer",borderBottom:activeMeal===id?"2px solid #f4c430":"2px solid transparent",whiteSpace:"nowrap",transition:"all .2s"}}>{label}</button>
          ))}
        </div>
        {activeMeal==="breakfast"&&(<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:1,marginBottom:4}}>IDÉES DE DÉJEUNER</div><div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:14}}>Commence avec 30–40g de protéines 🍳</div><div style={{background:"#FF6B3510",border:"1px solid #FF6B3330",borderRadius:11,padding:"11px 13px",marginBottom:18,display:"flex",gap:9}}><span style={{fontSize:16}}>⚡</span><div style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#888",lineHeight:1.7}}>La synthèse protéique est à son pic le matin. Un bon déjeuner rend l'objectif de 150g beaucoup plus facile.</div></div>{MEALS.breakfast.map((m,i)=><MealCard key={i} m={m} accentColor="#FF6B35"/>)}</div>)}
        {activeMeal==="pre"&&(<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:1,marginBottom:4}}>AVANT L'ENTRAÎNEMENT</div><div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:16}}>Glucides pour l'énergie + protéines pour protéger les muscles</div>{MEALS.pre.map((m,i)=><MealCard key={i} m={m} accentColor="#FF9500"/>)}</div>)}
        {activeMeal==="post"&&(<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:1,marginBottom:4}}>APRÈS L'ENTRAÎNEMENT</div><div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:16}}>Protéines pour réparer + glucides pour recharger</div>{MEALS.post.map((m,i)=><MealCard key={i} m={m} accentColor="#00D4AA"/>)}</div>)}
        {activeMeal==="lunch"&&(<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:1,marginBottom:4}}>IDÉES DE DÎNER</div><div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:16}}>Rapide, riche en protéines 🍽️</div>{MEALS.lunch.map((m,i)=><MealCard key={i} m={m} accentColor="#f4c430"/>)}</div>)}
        {activeMeal==="dessert"&&(<div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:1,marginBottom:4}}>DESSERTS SANTÉ</div><div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:16}}>Satisfaire le craving sucré sans ruiner les gains 🎯</div>{MEALS.dessert.map((m,i)=><MealCard key={i} m={m} accentColor="#A855F7"/>)}<div style={{background:"#111",border:"1px solid #1a1a1a",borderRadius:13,padding:16,marginTop:4}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"#f4c430",letterSpacing:2,marginBottom:9}}>⚠️ RÈGLE DU 80/20</div><div style={{fontFamily:"'Sora',sans-serif",fontSize:13,color:"#777",lineHeight:1.7}}>Mange bien 80% du temps → tu peux te permettre tes desserts préférés 20% du temps sans compromettre tes progrès.</div></div></div>)}
        {/* Macro summary */}
        <div style={{background:"#0e0e0e",border:"1px solid #1a1a1a",borderRadius:13,padding:16,marginTop:22}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:"#444",letterSpacing:2,marginBottom:12}}>OBJECTIFS JOURNALIERS</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {[{label:"Calories",val:"2 600–2 900",icon:"🔥",c:"#FF6B35"},{label:"Protéines",val:"150g+",icon:"🥩",c:"#00D4AA"},{label:"Eau",val:"3–4L",icon:"💧",c:"#38bdf8"},{label:"Sommeil",val:"8h+",icon:"😴",c:"#A855F7"}].map((n,i)=>(
              <div key={i} style={{background:"#111",borderRadius:11,padding:13,border:`1px solid ${n.c}22`}}>
                <div style={{fontSize:18,marginBottom:5}}>{n.icon}</div>
                <div style={{fontFamily:"'Sora',sans-serif",fontSize:9,color:"#444",letterSpacing:1,textTransform:"uppercase"}}>{n.label}</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:n.c,letterSpacing:1}}>{n.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>

  {/* ── LOG MODAL ──────────────────────────────────────────────────────── */}
  {logModal&&(
    <div className="modal-overlay" onClick={()=>setLogModal(null)}>
      <div className="modal-box slide-up" onClick={e=>e.stopPropagation()}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:21,letterSpacing:1,marginBottom:3}}>ENREGISTRER</div>
        <div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:18}}>{logModal.ex.name}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:9}}>
          <div><div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#444",letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>Poids (kg)</div><input className="inp" type="number" placeholder="ex: 30" value={logForm.weight} onChange={e=>setLogForm(f=>({...f,weight:e.target.value}))}/></div>
          <div><div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#444",letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>Reps faites</div><input className="inp" type="number" placeholder="ex: 10" value={logForm.reps} onChange={e=>setLogForm(f=>({...f,reps:e.target.value}))}/></div>
        </div>
        <div style={{marginBottom:4}}><div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#444",letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>Note</div><input className="inp" placeholder="facile, PR, dos douloureux…" value={logForm.note} onChange={e=>setLogForm(f=>({...f,note:e.target.value}))}/></div>
        {lastEntry(logModal.ex.id)&&<div style={{background:"#0e0e0e",borderRadius:9,padding:"9px 13px",marginTop:9,marginBottom:2}}><div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#333",marginBottom:2}}>DERNIÈRE SÉANCE ({lastEntry(logModal.ex.id).date})</div><div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#777"}}>{lastEntry(logModal.ex.id).weight&&`${lastEntry(logModal.ex.id).weight}kg`}{lastEntry(logModal.ex.id).reps&&` × ${lastEntry(logModal.ex.id).reps} reps`}</div></div>}
        <button onClick={saveLog} style={{width:"100%",padding:"13px",border:"none",borderRadius:11,background:logModal.color,color:"#000",fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:2,cursor:"pointer",marginTop:11}}>SAUVEGARDER</button>
        <button onClick={()=>setLogModal(null)} style={{width:"100%",padding:"11px",border:"1px solid #252525",borderRadius:11,background:"none",color:"#555",fontFamily:"'Sora',sans-serif",fontSize:12,cursor:"pointer",marginTop:7}}>Annuler</button>
      </div>
    </div>
  )}

  {/* ── HISTORY MODAL ─────────────────────────────────────────────────── */}
  {histEx&&(()=>{
    const ex=plan.flatMap(d=>d.exercises).find(e=>e.id===histEx);
    const d=plan.find(day=>day.exercises.some(e=>e.id===histEx));
    const exLogs=getExLogs(histEx);
    return (
      <div className="modal-overlay" onClick={()=>setHistEx(null)}>
        <div className="modal-box slide-up" style={{maxHeight:"80vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:21,letterSpacing:1,marginBottom:2}}>HISTORIQUE</div>
          <div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:14}}>{ex?.name}</div>
          {exLogs.length>1&&<div style={{marginBottom:14}}><MiniChart entries={exLogs} color={d?.template.color||"#fff"}/></div>}
          {exLogs.slice().reverse().map((l,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 0",borderBottom:"1px solid #1a1a1a"}}>
              <span style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#444",minWidth:80}}>{l.date}</span>
              <span style={{fontFamily:"'Sora',sans-serif",fontSize:13,color:"#ccc",fontWeight:600}}>{l.weight?`${l.weight}kg`:"—"}</span>
              {l.reps&&<span style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#888"}}>×{l.reps}</span>}
              {l.note&&<span style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#555",fontStyle:"italic",flex:1,textAlign:"right"}}>{l.note}</span>}
            </div>
          ))}
          <button onClick={()=>setHistEx(null)} style={{width:"100%",marginTop:14,padding:"11px",border:"1px solid #252525",borderRadius:11,background:"none",color:"#555",fontFamily:"'Sora',sans-serif",fontSize:12,cursor:"pointer"}}>Fermer</button>
        </div>
      </div>
    );
  })()}

  {/* ── PHOTO UPLOAD MODAL ────────────────────────────────────────────── */}
  {photoModal&&(
    <div className="modal-overlay" onClick={()=>setPhotoModal(false)}>
      <div className="modal-box slide-up" onClick={e=>e.stopPropagation()}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:21,letterSpacing:1,marginBottom:3}}>📸 SEMAINE {photos.length+1}</div>
        <div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#555",marginBottom:18}}>{today}</div>
        <div style={{marginBottom:11}}><div style={{fontFamily:"'Sora',sans-serif",fontSize:10,color:"#444",letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>Note (optionnel)</div><input className="inp" placeholder="ex: +2kg au squat, épaules plus larges…" value={photoNote} onChange={e=>setPhotoNote(e.target.value)}/></div>
        <label style={{display:"block",width:"100%",padding:"15px",background:"#FF6B3512",border:"2px dashed #FF6B3550",borderRadius:12,textAlign:"center",cursor:"pointer",marginTop:8}}>
          <input type="file" accept="image/*" style={{display:"none"}} onChange={handlePhotoUpload}/>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:19,color:"#FF6B35",letterSpacing:2,marginBottom:4}}>CHOISIR UNE PHOTO</div>
          <div style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#555"}}>JPG · PNG · HEIC</div>
        </label>
        <button onClick={()=>setPhotoModal(false)} style={{width:"100%",marginTop:10,padding:"11px",border:"1px solid #252525",borderRadius:11,background:"none",color:"#555",fontFamily:"'Sora',sans-serif",fontSize:12,cursor:"pointer"}}>Annuler</button>
      </div>
    </div>
  )}

  {/* ── PHOTO VIEWER ──────────────────────────────────────────────────── */}
  {viewPhoto&&(
    <div className="modal-overlay" style={{alignItems:"center"}} onClick={()=>setViewPhoto(null)}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:620,maxHeight:"90vh",display:"flex",flexDirection:"column",background:"#0e0e0e",borderRadius:20,overflow:"hidden"}}>
        <img src={viewPhoto.dataUrl} alt="" style={{width:"100%",objectFit:"contain",maxHeight:"70vh"}}/>
        <div style={{padding:"14px 18px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:1}}>SEMAINE {viewPhoto.week}</div>
            <span style={{fontFamily:"'Sora',sans-serif",fontSize:11,color:"#555"}}>{viewPhoto.date}</span>
          </div>
          {viewPhoto.note&&<div style={{fontFamily:"'Sora',sans-serif",fontSize:12,color:"#777",fontStyle:"italic",marginBottom:11}}>{viewPhoto.note}</div>}
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setViewPhoto(null)} style={{flex:1,padding:"11px",border:"1px solid #252525",borderRadius:11,background:"none",color:"#555",fontFamily:"'Sora',sans-serif",fontSize:12,cursor:"pointer"}}>Fermer</button>
            <button onClick={()=>{if(window.confirm("Supprimer?")){setPhotos(p=>p.filter(x=>x.id!==viewPhoto.id));setViewPhoto(null);}}} style={{flex:1,padding:"11px",border:"1px solid #3a1a1a",borderRadius:11,background:"none",color:"#ef4444",fontFamily:"'Sora',sans-serif",fontSize:12,cursor:"pointer"}}>🗑 Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
```

);
}

const css = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sora:wght@300;400;500;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} .fade-up{animation:fadeUp .3s ease forwards;} @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}} .slide-up{animation:slideUp .3s cubic-bezier(.16,1,.3,1) forwards;} .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:200;display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(4px);} .modal-box{background:#111;border:1px solid #252525;border-radius:20px 20px 0 0;width:100%;max-width:620px;padding:22px 18px 34px;} .inp{width:100%;background:#0e0e0e;border:1px solid #252525;border-radius:9px;padding:10px 13px;color:#fff;font-family:'Sora',sans-serif;font-size:14px;outline:none;transition:border-color .2s;} .inp:focus{border-color:#444;} .inp::placeholder{color:#333;} button{outline:none;} ::-webkit-scrollbar{width:3px;height:3px;} ::-webkit-scrollbar-track{background:#111;} ::-webkit-scrollbar-thumb{background:#333;border-radius:10px;}`;
