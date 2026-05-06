import { useState, useMemo } from "react";

const P = {
  bg: "#FAF6F1", surface: "#FFFFFF", surfaceHover: "#F5EDE4",
  border: "#E8DDD0", borderLight: "#F0E8DD",
  text: "#3D3229", textMuted: "#9A8B7A",
  accent: "#C4652E", accentSoft: "rgba(196,101,46,0.08)",
  green: "#5B8C5A", greenSoft: "rgba(91,140,90,0.10)",
  red: "#C45D4D", redSoft: "rgba(196,93,77,0.10)",
  orange: "#D4943A", orangeSoft: "rgba(212,148,58,0.10)",
  blue: "#5B7FA6", blueSoft: "rgba(91,127,166,0.10)",
  purple: "#8B6DB0", purpleSoft: "rgba(139,109,176,0.10)",
  sage: "#7A9B76", sand: "#D6C9B6",
  sidebar: "#3D3229", sidebarMuted: "#8A7D6E",
  sidebarActive: "rgba(196,101,46,0.18)",
};
const crd = { background: P.surface, border: "1px solid " + P.border, borderRadius: 16, boxShadow: "0 1px 3px rgba(61,50,41,0.04)" };
const MONO = "'Source Code Pro', monospace";
const SANS = "'DM Sans', sans-serif";
const SERIF = "'Playfair Display', serif";

function Badge({ label, color }) {
  return <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600, background: color + "14", color: color }}>{label}</span>;
}

function Pill({ children, active, onClick }) {
  return <button onClick={onClick} style={{ padding: "9px 20px", borderRadius: 24, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, background: active ? P.accent : "transparent", color: active ? "#fff" : P.textMuted, display: "flex", alignItems: "center", gap: 6 }}>{children}</button>;
}

function MiniBar({ value, max, color }) {
  var pct = max > 0 ? (value / max * 100) : 0;
  return <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}>
    <div style={{ flex: 1, height: 8, borderRadius: 4, background: P.bg, overflow: "hidden" }}>
      <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 4 }} />
    </div>
    <span style={{ fontSize: 11, fontFamily: MONO, color: P.text, fontWeight: 600, minWidth: 35, textAlign: "right" }}>{pct.toFixed(0)}%</span>
  </div>;
}

function Spark({ data, color, w, h }) {
  if (!data || data.length < 2) return null;
  var width = w || 100; var height = h || 28;
  var mn = Math.min.apply(null, data); var mx = Math.max.apply(null, data); var range = mx - mn || 1;
  var pts = data.map(function (v, i) { return ((i / (data.length - 1)) * width) + "," + (height - ((v - mn) / range) * (height - 4) - 2); }).join(" ");
  return <svg width={width} height={height} style={{ display: "block" }}><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

var MOIS = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];

var CATS = [
  { rayon: "Épicerie", categ: "Pâtes & Riz", nbRefs: 87, largeur: 4, profondeur: 21.8, ca: 48200, caEvol: 5.2, caPoids: 12.6, marge: 26.3, margeEvol: -0.8, vmhMoy: 34.2, vmhEvol: 3.1, rupture: 2.3, score: "performante",
    marques: [{ nom: "Barilla", refs: 28, pdm: 42.3, vmhMoy: 45.1, marge: 24.8 },{ nom: "Panzani", refs: 22, pdm: 28.7, vmhMoy: 38.4, marge: 27.1 },{ nom: "Système U", refs: 18, pdm: 15.2, vmhMoy: 22.6, marge: 32.5 },{ nom: "Lustucru", refs: 12, pdm: 8.9, vmhMoy: 18.3, marge: 25.4 },{ nom: "Autres", refs: 7, pdm: 4.9, vmhMoy: 12.1, marge: 28.0 }],
    concurrents: { nous: 87, laFourche: 45, naturalia: 32, monoprix: 112 },
    saisonData: [3200,3400,3600,3800,4100,3900,3200,3100,4500,4200,3800,4300],
    deref: [{ id: "12045", nom: "Panzani Torti Bio 250g", vmh: 3, marge: 12.1, raison: "VMH < 5, marge faible" },{ id: "12089", nom: "Lustucru Lasagne Fraîche 300g", vmh: 7, marge: 8.5, raison: "DLC courte = gaspillage" }],
    ajout: [{ produit: "Garofalo Spaghetti 500g", marque: "Garofalo", raison: "Marque premium tendance", priorite: "haute" },{ produit: "Rummo Penne 500g", marque: "Rummo", raison: "Référencée chez Monoprix", priorite: "moyenne" }] },
  { rayon: "Boissons", categ: "Eaux", nbRefs: 34, largeur: 2, profondeur: 17, ca: 62300, caEvol: 2.1, caPoids: 16.3, marge: 18.7, margeEvol: -1.2, vmhMoy: 112.4, vmhEvol: 1.8, rupture: 1.1, score: "performante",
    marques: [{ nom: "Evian", refs: 8, pdm: 35.2, vmhMoy: 189.3, marge: 16.2 },{ nom: "Cristaline", refs: 6, pdm: 28.4, vmhMoy: 156.7, marge: 22.1 },{ nom: "Volvic", refs: 7, pdm: 18.6, vmhMoy: 98.4, marge: 17.8 },{ nom: "Vittel", refs: 5, pdm: 10.1, vmhMoy: 67.2, marge: 15.9 },{ nom: "Autres", refs: 8, pdm: 7.7, vmhMoy: 34.5, marge: 19.3 }],
    concurrents: { nous: 34, laFourche: 12, naturalia: 18, monoprix: 56 },
    saisonData: [4200,4000,4500,5100,5800,6500,7200,7000,5600,4800,4300,4100],
    deref: [], ajout: [{ produit: "Perrier Fines Bulles 50cl x6", marque: "Perrier", raison: "Format snacking absent", priorite: "haute" }] },
  { rayon: "Crémerie", categ: "Yaourts", nbRefs: 96, largeur: 3, profondeur: 32, ca: 41500, caEvol: -3.4, caPoids: 10.8, marge: 29.1, margeEvol: 0.4, vmhMoy: 26.8, vmhEvol: -5.2, rupture: 4.8, score: "a_surveiller",
    marques: [{ nom: "Danone", refs: 32, pdm: 38.1, vmhMoy: 32.4, marge: 27.5 },{ nom: "Yoplait", refs: 24, pdm: 25.3, vmhMoy: 28.1, marge: 30.2 },{ nom: "Système U", refs: 20, pdm: 18.7, vmhMoy: 19.5, marge: 35.8 },{ nom: "Nestlé", refs: 12, pdm: 11.2, vmhMoy: 24.6, marge: 26.1 },{ nom: "Autres", refs: 8, pdm: 6.7, vmhMoy: 15.2, marge: 28.9 }],
    concurrents: { nous: 96, laFourche: 28, naturalia: 42, monoprix: 134 },
    saisonData: [3800,3600,3500,3400,3300,3100,2800,2900,3600,3700,3500,3900],
    deref: [{ id: "23401", nom: "Yoplait Panier Ananas 4x125g", vmh: 4, marge: 18.2, raison: "VMH < 5, rotation lente" },{ id: "23456", nom: "Nestlé LC1 Nature 4x125g", vmh: 6, marge: 14.1, raison: "Marge < 15%" },{ id: "23478", nom: "Yoplait Perle de Lait Citron x4", vmh: 8, marge: 16.3, raison: "Cannibalise les autres parfums" }],
    ajout: [{ produit: "Skyr Siggi's Nature 450g", marque: "Siggi's", raison: "Tendance protéiné, absent catalogue", priorite: "haute" },{ produit: "Michel & Augustin Yaourt Vanille", marque: "Michel & Augustin", raison: "Premium, bon levier marge", priorite: "moyenne" }] },
  { rayon: "Petit-déj", categ: "Céréales", nbRefs: 52, largeur: 2, profondeur: 26, ca: 28900, caEvol: -8.1, caPoids: 7.5, marge: 31.4, margeEvol: -0.3, vmhMoy: 18.9, vmhEvol: -9.8, rupture: 1.5, score: "en_difficulte",
    marques: [{ nom: "Kellogg's", refs: 18, pdm: 34.5, vmhMoy: 22.1, marge: 28.6 },{ nom: "Nestlé", refs: 16, pdm: 29.8, vmhMoy: 20.5, marge: 30.1 },{ nom: "Jordans", refs: 6, pdm: 12.1, vmhMoy: 15.3, marge: 35.2 },{ nom: "Système U", refs: 8, pdm: 15.4, vmhMoy: 14.8, marge: 38.5 },{ nom: "Autres", refs: 4, pdm: 8.2, vmhMoy: 9.7, marge: 32.0 }],
    concurrents: { nous: 52, laFourche: 18, naturalia: 35, monoprix: 78 },
    saisonData: [2800,2600,2400,2300,2200,2000,1800,1900,3200,3000,2700,2900],
    deref: [{ id: "31205", nom: "Kellogg's All-Bran Plus 500g", vmh: 2, marge: 19.5, raison: "VMH < 3, segment en déclin" },{ id: "31234", nom: "Nestlé Fitness Chocolat 375g", vmh: 5, marge: 21.2, raison: "Cannibalise Fitness Nature" },{ id: "31256", nom: "Jordans Granola Tropical 400g", vmh: 4, marge: 22.8, raison: "Rotation insuffisante" },{ id: "31278", nom: "MDD Muesli Fruits 500g", vmh: 6, marge: 15.1, raison: "MDD sous-performante" }],
    ajout: [{ produit: "Nature's Path Granola Bio", marque: "Nature's Path", raison: "Bio premium en croissance +25%", priorite: "haute" }] },
  { rayon: "Hygiène", categ: "Soins corps", nbRefs: 68, largeur: 3, profondeur: 22.7, ca: 22100, caEvol: 1.8, caPoids: 5.8, marge: 34.5, margeEvol: 0.6, vmhMoy: 14.2, vmhEvol: 0.5, rupture: 3.2, score: "a_surveiller",
    marques: [{ nom: "Dove", refs: 14, pdm: 28.5, vmhMoy: 18.9, marge: 32.1 },{ nom: "Nivea", refs: 12, pdm: 22.3, vmhMoy: 16.4, marge: 33.8 },{ nom: "Le Petit Marseillais", refs: 16, pdm: 24.1, vmhMoy: 15.2, marge: 35.6 },{ nom: "Système U", refs: 18, pdm: 16.8, vmhMoy: 10.1, marge: 40.2 },{ nom: "Autres", refs: 8, pdm: 8.3, vmhMoy: 8.5, marge: 31.5 }],
    concurrents: { nous: 68, laFourche: 22, naturalia: 85, monoprix: 145 },
    saisonData: [1700,1650,1750,1800,1900,2000,2100,2050,1900,1850,1800,1950],
    deref: [{ id: "71023", nom: "MDD Gel Douche Vanille 250ml", vmh: 3, marge: 28.5, raison: "VMH < 5" }],
    ajout: [{ produit: "CeraVe Gel Nettoyant 236ml", marque: "CeraVe", raison: "TikTok effect, forte demande", priorite: "haute" },{ produit: "Bioderma Sensibio Gel", marque: "Bioderma", raison: "Gap dermo-cosmétique", priorite: "haute" }] },
  { rayon: "Surgelés", categ: "Glaces", nbRefs: 28, largeur: 2, profondeur: 14, ca: 15800, caEvol: 12.5, caPoids: 4.1, marge: 35.2, margeEvol: 1.1, vmhMoy: 22.1, vmhEvol: 15.3, rupture: 0.8, score: "performante",
    marques: [{ nom: "Häagen-Dazs", refs: 8, pdm: 38.4, vmhMoy: 28.6, marge: 33.1 },{ nom: "Magnum", refs: 6, pdm: 24.5, vmhMoy: 25.3, marge: 34.8 },{ nom: "Ben & Jerry's", refs: 8, pdm: 26.1, vmhMoy: 24.9, marge: 36.2 },{ nom: "Autres", refs: 6, pdm: 11.0, vmhMoy: 12.4, marge: 37.5 }],
    concurrents: { nous: 28, laFourche: 8, naturalia: 15, monoprix: 62 },
    saisonData: [800,750,900,1100,1500,2000,2400,2200,1600,1200,900,1400],
    deref: [],
    ajout: [{ produit: "La Laitière Vanille 450ml", marque: "Nestlé", raison: "Marque nationale absente", priorite: "haute" },{ produit: "Carte d'Or Chocolat 900ml", marque: "Unilever", raison: "Format familial manquant", priorite: "moyenne" }] },
];

var scoreColors = { performante: P.green, a_surveiller: P.orange, en_difficulte: P.red };
var scoreLabels = { performante: "Performante", a_surveiller: "À surveiller", en_difficulte: "En difficulté" };

export function CategTab() {
  var [sub, setSub] = useState("analyse");
  var [selCat, setSelCat] = useState(null);
  var totalDeref = CATS.reduce(function (a, c) { return a + c.deref.length; }, 0);
  var totalAjout = CATS.reduce(function (a, c) { return a + c.ajout.length; }, 0);

  return <div>
    <div style={{ display: "flex", gap: 4, marginBottom: 24, background: P.surface, borderRadius: 28, padding: 4, width: "fit-content", border: "1px solid " + P.border, flexWrap: "wrap" }}>
      {[{ key: "analyse", label: "Analyse Catégorielle" },{ key: "assortiment", label: "Revue d'Assortiment" },{ key: "pdm", label: "PDM Internes" },{ key: "mapping", label: "Mapping Concurrentiel" },{ key: "recos", label: "Recommandations" },{ key: "saison", label: "Saisonnalité" }].map(function (t) {
        var badge = t.key === "recos" ? totalDeref + totalAjout : null;
        return <Pill key={t.key} active={sub === t.key} onClick={function () { setSub(t.key); setSelCat(null); }}>
          {t.label}
          {badge && <span style={{ fontSize: 10, background: sub === t.key ? "rgba(255,255,255,0.25)" : P.purpleSoft, color: sub === t.key ? "#fff" : P.purple, padding: "2px 7px", borderRadius: 12, fontWeight: 700 }}>{badge}</span>}
        </Pill>;
      })}
    </div>

    {/* ANALYSE */}
    {sub === "analyse" && !selCat && <div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        {[{ l: "Catégories", v: CATS.length, c: P.text },{ l: "Performantes", v: CATS.filter(function (c) { return c.score === "performante"; }).length, c: P.green },{ l: "À surveiller", v: CATS.filter(function (c) { return c.score === "a_surveiller"; }).length, c: P.orange },{ l: "En difficulté", v: CATS.filter(function (c) { return c.score === "en_difficulte"; }).length, c: P.red }].map(function (s, i) {
          return <div key={i} style={{ ...crd, padding: "18px 22px", flex: "1 1 140px" }}><div style={{ fontSize: 11, color: P.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{s.l}</div><span style={{ fontSize: 28, fontWeight: 700, color: s.c, fontFamily: MONO }}>{s.v}</span></div>;
        })}
      </div>
      <div style={{ ...crd, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid " + P.borderLight }}>
            {["Rayon","Catégorie","Réfs","CA","Évol.","Poids CA","Marge","VMH moy","Rupture","Score"].map(function (h) { return <th key={h} style={{ padding: "12px 10px", textAlign: "left", color: P.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>; })}
          </tr></thead>
          <tbody>{CATS.map(function (c, i) {
            return <tr key={i} onClick={function () { setSelCat(c); }} style={{ borderBottom: "1px solid " + P.borderLight, cursor: "pointer" }} onMouseEnter={function (e) { e.currentTarget.style.background = P.surfaceHover; }} onMouseLeave={function (e) { e.currentTarget.style.background = "transparent"; }}>
              <td style={{ padding: "12px 10px", color: P.textMuted, fontSize: 12 }}>{c.rayon}</td>
              <td style={{ padding: "12px 10px", color: P.text, fontWeight: 700 }}>{c.categ}</td>
              <td style={{ padding: "12px 10px", fontFamily: MONO }}>{c.nbRefs}</td>
              <td style={{ padding: "12px 10px", fontFamily: MONO, fontWeight: 600 }}>{(c.ca/1000).toFixed(1)}k€</td>
              <td style={{ padding: "12px 10px" }}><span style={{ fontFamily: MONO, fontWeight: 700, color: c.caEvol >= 0 ? P.green : P.red, fontSize: 12 }}>{c.caEvol > 0 ? "+" : ""}{c.caEvol}%</span></td>
              <td style={{ padding: "12px 10px" }}><MiniBar value={c.caPoids} max={20} color={P.accent} /></td>
              <td style={{ padding: "12px 10px", fontFamily: MONO, color: c.marge > 30 ? P.green : P.text, fontWeight: 600 }}>{c.marge}%</td>
              <td style={{ padding: "12px 10px", fontFamily: MONO }}>{c.vmhMoy.toFixed(0)}</td>
              <td style={{ padding: "12px 10px" }}><span style={{ fontFamily: MONO, color: c.rupture > 3 ? P.red : c.rupture > 1.5 ? P.orange : P.green, fontWeight: 600 }}>{c.rupture}%</span></td>
              <td style={{ padding: "12px 10px" }}><Badge label={scoreLabels[c.score]} color={scoreColors[c.score]} /></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>}

    {sub === "analyse" && selCat && <div>
      <button onClick={function () { setSelCat(null); }} style={{ background: "none", border: "none", color: P.accent, fontSize: 13, cursor: "pointer", fontWeight: 600, marginBottom: 16 }}>← Retour</button>
      <div style={{ ...crd, padding: "24px 28px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><h3 style={{ fontSize: 20, fontWeight: 700, color: P.text, margin: 0, fontFamily: SERIF }}>{selCat.categ}</h3><p style={{ fontSize: 13, color: P.textMuted, margin: "6px 0 0" }}>{selCat.rayon} · {selCat.nbRefs} réf. · Largeur {selCat.largeur} · Prof. moy. {selCat.profondeur}</p></div>
          <Badge label={scoreLabels[selCat.score]} color={scoreColors[selCat.score]} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[{ l: "CA mensuel", v: (selCat.ca/1000).toFixed(1)+"k€", s: (selCat.caEvol>0?"+":"")+selCat.caEvol+"% vs M-1", c: selCat.caEvol>=0?P.green:P.red },{ l: "Poids CA", v: selCat.caPoids+"%", c: P.accent },{ l: "Marge moy.", v: selCat.marge+"%", s: (selCat.margeEvol>0?"+":"")+selCat.margeEvol+" pts", c: selCat.marge>25?P.green:P.orange },{ l: "VMH moy.", v: selCat.vmhMoy.toFixed(0), s: (selCat.vmhEvol>0?"+":"")+selCat.vmhEvol+"%", c: selCat.vmhEvol>=0?P.green:P.red }].map(function (x, i) {
          return <div key={i} style={{ ...crd, padding: "16px 20px" }}><div style={{ fontSize: 11, color: P.textMuted, textTransform: "uppercase", marginBottom: 8 }}>{x.l}</div><div style={{ fontSize: 24, fontWeight: 700, color: P.text, fontFamily: MONO }}>{x.v}</div>{x.s && <div style={{ fontSize: 12, color: x.c, fontWeight: 600, marginTop: 4 }}>{x.s}</div>}</div>;
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ ...crd, padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: P.text, marginBottom: 14, fontFamily: SERIF }}>Courbe saisonnière</div>
          <Spark data={selCat.saisonData} color={P.accent} w={280} h={60} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>{MOIS.map(function (m, i) { return <span key={i} style={{ fontSize: 9, color: P.textMuted }}>{m}</span>; })}</div>
        </div>
        <div style={{ ...crd, padding: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: P.text, marginBottom: 14, fontFamily: SERIF }}>PDM Marques</div>
          {selCat.marques.map(function (m, i) { return <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < selCat.marques.length-1 ? "1px solid "+P.borderLight : "none" }}><span style={{ fontSize: 13, color: P.text, fontWeight: 500, width: 140 }}>{m.nom}</span><MiniBar value={m.pdm} max={50} color={i===0?P.accent:i===1?P.blue:P.sage} /></div>; })}
        </div>
      </div>
    </div>}

    {/* ASSORTIMENT */}
    {sub === "assortiment" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Réfs sous-performantes (déréférencement) et segments à compléter.</div>
      {CATS.filter(function (c) { return c.deref.length > 0 || c.ajout.length > 0; }).map(function (c) {
        return <div key={c.categ} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: P.text, fontFamily: SERIF }}>{c.categ}</span>
            <span style={{ fontSize: 12, color: P.textMuted }}>{c.rayon} · {c.nbRefs} réf.</span>
            <Badge label={scoreLabels[c.score]} color={scoreColors[c.score]} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {c.deref.length > 0 && <div style={{ ...crd, padding: 20, border: "1px solid "+P.red+"22" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: P.red, marginBottom: 12 }}>Déréférencement ({c.deref.length})</div>
              {c.deref.map(function (r, i) { return <div key={i} style={{ padding: "10px 0", borderBottom: i<c.deref.length-1?"1px solid "+P.borderLight:"none" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><div><span style={{ fontSize: 11, fontFamily: MONO, color: P.accent, fontWeight: 700, marginRight: 8 }}>{r.id}</span><span style={{ fontSize: 13, color: P.text }}>{r.nom}</span></div><div style={{ display: "flex", gap: 8 }}><span style={{ fontSize: 11, fontFamily: MONO, color: P.red }}>VMH {r.vmh}</span><span style={{ fontSize: 11, fontFamily: MONO, color: P.orange }}>Marge {r.marge}%</span></div></div>
                <div style={{ fontSize: 11, color: P.textMuted, marginTop: 4, fontStyle: "italic" }}>{r.raison}</div>
              </div>; })}
            </div>}
            {c.ajout.length > 0 && <div style={{ ...crd, padding: 20, border: "1px solid "+P.green+"22" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: P.green, marginBottom: 12 }}>À ajouter ({c.ajout.length})</div>
              {c.ajout.map(function (r, i) { return <div key={i} style={{ padding: "10px 0", borderBottom: i<c.ajout.length-1?"1px solid "+P.borderLight:"none" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13, color: P.text, fontWeight: 500 }}>{r.produit}</span><Badge label={r.priorite} color={r.priorite==="haute"?P.red:P.orange} /></div>
                <div style={{ fontSize: 11, color: P.textMuted, marginTop: 4 }}>{r.marque} — {r.raison}</div>
              </div>; })}
            </div>}
          </div>
        </div>;
      })}
    </div>}

    {/* PDM */}
    {sub === "pdm" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Poids de chaque marque par catégorie — PDM CA, réfs, VMH, marge, et ratio efficience.</div>
      {CATS.map(function (c) { return <div key={c.categ} style={{ ...crd, padding: 22, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: P.text, marginBottom: 4, fontFamily: SERIF }}>{c.categ}</div>
        <div style={{ fontSize: 12, color: P.textMuted, marginBottom: 16 }}>{c.rayon} · {c.nbRefs} réf. · CA {(c.ca/1000).toFixed(1)}k€</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid "+P.borderLight }}>{["Marque","Réfs","PDM (CA)","","VMH moy","Marge","Efficience"].map(function (h) { return <th key={h} style={{ padding: "10px 10px", textAlign: "left", color: P.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>; })}</tr></thead>
          <tbody>{c.marques.map(function (m, i) {
            var rPct = (m.refs/c.nbRefs*100).toFixed(0);
            var ratio = (m.pdm/parseFloat(rPct)).toFixed(2);
            var rC = ratio >= 1.2 ? P.green : ratio <= 0.8 ? P.red : P.text;
            var rL = ratio >= 1.2 ? "Efficient" : ratio <= 0.8 ? "Sur-représenté" : "Équilibré";
            return <tr key={i} style={{ borderBottom: "1px solid "+P.borderLight }} onMouseEnter={function (e) { e.currentTarget.style.background=P.surfaceHover; }} onMouseLeave={function (e) { e.currentTarget.style.background="transparent"; }}>
              <td style={{ padding: "10px 10px", fontWeight: 600, color: P.text }}>{m.nom}</td>
              <td style={{ padding: "10px 10px", fontFamily: MONO, color: P.textMuted }}>{m.refs} ({rPct}%)</td>
              <td style={{ padding: "10px 10px", fontFamily: MONO, fontWeight: 700, color: P.accent }}>{m.pdm}%</td>
              <td style={{ padding: "10px 10px" }}><MiniBar value={m.pdm} max={50} color={P.accent} /></td>
              <td style={{ padding: "10px 10px", fontFamily: MONO }}>{m.vmhMoy.toFixed(0)}</td>
              <td style={{ padding: "10px 10px", fontFamily: MONO, color: m.marge>30?P.green:P.text }}>{m.marge}%</td>
              <td style={{ padding: "10px 10px" }}><Badge label={rL} color={rC} /></td>
            </tr>;
          })}</tbody>
        </table>
      </div>; })}
    </div>}

    {/* MAPPING */}
    {sub === "mapping" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Nombre de réfs par catégorie vs concurrents — détection des gaps.</div>
      <div style={{ ...crd, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid "+P.borderLight }}>{["Catégorie","Nous","La Fourche","Naturalia","Monoprix","Position","Analyse"].map(function (h) { return <th key={h} style={{ padding: "12px 12px", textAlign: "left", color: P.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>; })}</tr></thead>
          <tbody>{CATS.map(function (c, i) {
            var cn = c.concurrents; var mx = Math.max(cn.laFourche, cn.naturalia, cn.monoprix);
            var pos = cn.nous >= mx ? "leader" : cn.nous >= mx*0.7 ? "dans_la_course" : "gap";
            var posC = pos==="leader"?P.green:pos==="dans_la_course"?P.orange:P.red;
            var posL = pos==="leader"?"Leader":pos==="dans_la_course"?"Dans la course":"Gap important";
            var analyse = cn.monoprix > cn.nous*1.5 ? "Monoprix bien plus profond" : cn.nous > cn.monoprix ? "Plus profond que Monoprix" : "Comparable";
            function rp(val) { var d=((val/cn.nous-1)*100).toFixed(0); return <span><span style={{ fontFamily: MONO, color: P.text }}>{val}</span><span style={{ fontSize: 10, marginLeft: 4, color: parseInt(d)>0?P.green:P.red, fontWeight: 600 }}>{parseInt(d)>0?"+":""}{d}%</span></span>; }
            return <tr key={i} style={{ borderBottom: "1px solid "+P.borderLight }} onMouseEnter={function (e) { e.currentTarget.style.background=P.surfaceHover; }} onMouseLeave={function (e) { e.currentTarget.style.background="transparent"; }}>
              <td style={{ padding: "12px 12px" }}><div style={{ fontWeight: 600, color: P.text }}>{c.categ}</div><div style={{ fontSize: 11, color: P.textMuted }}>{c.rayon}</div></td>
              <td style={{ padding: "12px 12px", fontFamily: MONO, fontWeight: 700, color: P.accent }}>{cn.nous}</td>
              <td style={{ padding: "12px 12px" }}>{rp(cn.laFourche)}</td>
              <td style={{ padding: "12px 12px" }}>{rp(cn.naturalia)}</td>
              <td style={{ padding: "12px 12px" }}>{rp(cn.monoprix)}</td>
              <td style={{ padding: "12px 12px" }}><Badge label={posL} color={posC} /></td>
              <td style={{ padding: "12px 12px", fontSize: 12, color: P.textMuted, fontStyle: "italic" }}>{analyse}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>}

    {/* RECOMMANDATIONS */}
    {sub === "recos" && <div>
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {[{ l: "À déréférencer", v: totalDeref, c: P.red },{ l: "À ajouter", v: totalAjout, c: P.green },{ l: "Catég. impactées", v: CATS.filter(function (c) { return c.deref.length>0||c.ajout.length>0; }).length, c: P.accent }].map(function (s, i) { return <div key={i} style={{ ...crd, padding: "18px 22px", flex: 1 }}><div style={{ fontSize: 11, color: P.textMuted, textTransform: "uppercase", marginBottom: 8 }}>{s.l}</div><span style={{ fontSize: 28, fontWeight: 700, color: s.c, fontFamily: MONO }}>{s.v}</span></div>; })}
      </div>
      {CATS.filter(function (c) { return c.deref.length>0||c.ajout.length>0||c.caEvol<-5||c.rupture>3; }).map(function (c) {
        var actions = [];
        c.deref.forEach(function (r) { actions.push({ type: "suppr", label: "Déréférencer "+r.nom, detail: r.raison, prio: "haute" }); });
        c.ajout.forEach(function (r) { actions.push({ type: "ajout", label: "Référencer "+r.produit+" ("+r.marque+")", detail: r.raison, prio: r.priorite }); });
        if (c.caEvol < -5) actions.push({ type: "prix", label: "Revoir le pricing", detail: "CA en baisse de "+Math.abs(c.caEvol)+"%", prio: "moyenne" });
        if (c.rupture > 3) actions.push({ type: "stock", label: "Réduire rupture ("+c.rupture+"%)", detail: "Au-dessus du seuil 3%", prio: "haute" });
        var icons = { suppr: "🔴", ajout: "🟢", prix: "💰", stock: "⚠️" };
        return <div key={c.categ} style={{ ...crd, padding: "22px 26px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><div><span style={{ fontSize: 16, fontWeight: 700, color: P.text, fontFamily: SERIF }}>{c.categ}</span><span style={{ fontSize: 12, color: P.textMuted, marginLeft: 12 }}>{c.rayon}</span></div><Badge label={scoreLabels[c.score]} color={scoreColors[c.score]} /></div>
          {actions.map(function (a, i) { return <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i<actions.length-1?"1px solid "+P.borderLight:"none" }}>
            <span style={{ fontSize: 14, marginTop: 2 }}>{icons[a.type]}</span>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: P.text, fontWeight: 600 }}>{a.label}</div><div style={{ fontSize: 11, color: P.textMuted, marginTop: 3 }}>{a.detail}</div></div>
            <Badge label={a.prio} color={a.prio==="haute"?P.red:P.orange} />
          </div>; })}
        </div>;
      })}
    </div>}

    {/* SAISONNALITÉ */}
    {sub === "saison" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Courbes mensuelles par catégorie — pics, creux, anticipation commandes et promos.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {CATS.map(function (c) {
          var maxV = Math.max.apply(null, c.saisonData); var minV = Math.min.apply(null, c.saisonData);
          var peakM = MOIS[c.saisonData.indexOf(maxV)]; var lowM = MOIS[c.saisonData.indexOf(minV)];
          var tc = c.saisonData[11] >= c.saisonData[0] ? P.green : P.red;
          return <div key={c.categ} style={{ ...crd, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div><div style={{ fontSize: 14, fontWeight: 700, color: P.text, fontFamily: SERIF }}>{c.categ}</div><div style={{ fontSize: 11, color: P.textMuted }}>{c.rayon}</div></div>
              <Badge label={scoreLabels[c.score]} color={scoreColors[c.score]} />
            </div>
            <Spark data={c.saisonData} color={tc} w={260} h={50} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, marginBottom: 12 }}>{MOIS.map(function (m, i) { var isMax=i===c.saisonData.indexOf(maxV); var isMin=i===c.saisonData.indexOf(minV); return <span key={i} style={{ fontSize: 8, color: isMax?P.green:isMin?P.red:P.textMuted, fontWeight: isMax||isMin?700:400 }}>{m}</span>; })}</div>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <span style={{ color: P.green }}>📈 Pic : <strong>{peakM}</strong></span>
              <span style={{ color: P.red }}>📉 Creux : <strong>{lowM}</strong></span>
            </div>
          </div>;
        })}
      </div>
    </div>}
  </div>;
}

/* ═══════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════ */
export default function App() {
  return <div style={{ fontFamily: SANS, background: P.bg, color: P.text, minHeight: "100vh", display: "flex" }}>
    <style>{"@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Source+Code+Pro:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-thumb{background:"+P.sand+";border-radius:3px;}"}</style>
    <div style={{ width: 220, background: P.sidebar, padding: "28px 12px", display: "flex", flexDirection: "column", gap: 4, position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
      <div style={{ padding: "0 14px 22px", marginBottom: 14, borderBottom: "1px solid rgba(214,201,182,0.12)" }}>
        <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, color: "#F5EDE4" }}>La Belle Vie</div>
        <div style={{ fontSize: 11, color: P.sidebarMuted, marginTop: 4 }}>Cockpit Achats</div>
      </div>
      {[{ label: "Dashboard", icon: "🏠", dis: true },{ label: "Achats", icon: "📦", dis: true },{ label: "Offre", icon: "🏷️", dis: true },{ label: "Marketing", icon: "📣", dis: true },{ label: "Trade MK", icon: "📢", dis: true },{ label: "Categ Mgmt", icon: "📊", dis: false }].map(function (t) {
        var isA = !t.dis;
        return <button key={t.label} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 14px", borderRadius: 12, border: "none", cursor: t.dis?"default":"pointer", fontSize: 13, fontWeight: isA?600:400, fontFamily: SANS, background: isA?P.sidebarActive:"transparent", color: isA?"#F5EDE4":P.sidebarMuted, opacity: t.dis&&!isA?0.4:1, textAlign: "left", width: "100%" }}><span style={{ fontSize: 16 }}>{t.icon}</span>{t.label}</button>;
      })}
      <div style={{ marginTop: "auto", padding: 14, borderTop: "1px solid rgba(214,201,182,0.12)" }}><div style={{ fontSize: 10, color: P.sidebarMuted }}>v0.5 · Categ Mgmt<br /><span style={{ color: P.accent }}>données fictives</span></div></div>
    </div>
    <div style={{ flex: 1, padding: "32px 36px", overflowY: "auto", minWidth: 0 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: P.text, fontFamily: SERIF }}>📊 Category Management</h1>
        <p style={{ fontSize: 13, color: P.textMuted, margin: "8px 0 0" }}>Analyse catégorielle · Revue d'assortiment · PDM · Mapping concurrentiel · Recommandations · Saisonnalité</p>
      </div>
      <CategTab />
    </div>
  </div>;
}
