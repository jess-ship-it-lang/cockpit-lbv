import { useState } from "react";

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
  sidebar: "#3D3229", sidebarMuted: "#8A7D6E", sidebarActive: "rgba(196,101,46,0.18)",
};
const crd = { background: P.surface, border: "1px solid " + P.border, borderRadius: 16, boxShadow: "0 1px 3px rgba(61,50,41,0.04)" };
const MONO = "'Source Code Pro', monospace";
const SANS = "'DM Sans', sans-serif";
const SERIF = "'Playfair Display', serif";

function Badge({ label, color }) {
  return <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, fontWeight: 600, background: color + "14", color }}>{label}</span>;
}
function Pill({ children, active, onClick }) {
  return <button onClick={onClick} style={{ padding: "9px 20px", borderRadius: 24, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: SANS, background: active ? P.accent : "transparent", color: active ? "#fff" : P.textMuted, display: "flex", alignItems: "center", gap: 6 }}>{children}</button>;
}
function MiniBar({ value, max, color }) {
  var pct = max > 0 ? (value / max * 100) : 0;
  return <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 100 }}>
    <div style={{ flex: 1, height: 8, borderRadius: 4, background: P.bg, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 4 }} /></div>
    <span style={{ fontSize: 11, fontFamily: MONO, color: P.text, fontWeight: 600, minWidth: 35, textAlign: "right" }}>{pct.toFixed(0)}%</span>
  </div>;
}

/* ═══ DATA ═══ */
var TRAFIC = [
  { categ: "Boissons", visites: 12400, ajoutPanier: 3100, achats: 1860, tauxConv: 15.0, tauxAjout: 25.0, diagnostic: "Bon trafic, bonne conversion — catégorie pilier" },
  { categ: "Épicerie", visites: 9800, ajoutPanier: 2450, achats: 1372, tauxConv: 14.0, tauxAjout: 25.0, diagnostic: "Volume stable, conversion correcte" },
  { categ: "Crémerie", visites: 7200, ajoutPanier: 1580, achats: 864, tauxConv: 12.0, tauxAjout: 21.9, diagnostic: "Conversion en baisse — revoir les prix ?" },
  { categ: "Petit-déjeuner", visites: 5400, ajoutPanier: 918, achats: 432, tauxConv: 8.0, tauxAjout: 17.0, diagnostic: "⚠ Taux conversion faible — offre à retravailler" },
  { categ: "Hygiène", visites: 4100, ajoutPanier: 820, achats: 369, tauxConv: 9.0, tauxAjout: 20.0, diagnostic: "Trafic faible — pousser via newsletter" },
  { categ: "Surgelés", visites: 3200, ajoutPanier: 896, achats: 544, tauxConv: 17.0, tauxAjout: 28.0, diagnostic: "Excellente conversion mais trafic limité — fort potentiel" },
  { categ: "Bio", visites: 2800, ajoutPanier: 560, achats: 252, tauxConv: 9.0, tauxAjout: 20.0, diagnostic: "Niche fidèle mais trafic à développer" },
  { categ: "Entretien", visites: 2100, ajoutPanier: 378, achats: 189, tauxConv: 9.0, tauxAjout: 18.0, diagnostic: "Catégorie fonctionnelle — conversion attendue" },
];

var EMERCH = [
  { categ: "Boissons", posHomepage: 2, banniere: true, derniereMaj: "28/04/2026", problemes: [], score: "optimal" },
  { categ: "Épicerie", posHomepage: 1, banniere: false, derniereMaj: "25/04/2026", problemes: [], score: "optimal" },
  { categ: "Crémerie", posHomepage: 4, banniere: false, derniereMaj: "15/04/2026", problemes: ["3 produits en rupture encore mis en avant", "Visuel categ daté (> 3 mois)"], score: "a_revoir" },
  { categ: "Petit-déjeuner", posHomepage: 3, banniere: false, derniereMaj: "20/03/2026", problemes: ["Ordonnancement non mis à jour depuis 6 semaines", "Top ventes pas en tête de catégorie"], score: "a_revoir" },
  { categ: "Surgelés", posHomepage: 6, banniere: false, derniereMaj: "01/04/2026", problemes: ["Peu visible — position 6 sur homepage"], score: "sous_exploite" },
  { categ: "Hygiène", posHomepage: 5, banniere: false, derniereMaj: "10/04/2026", problemes: ["Pas de visuel dédié"], score: "sous_exploite" },
];

var SEO = [
  { produit: "Barilla Penne 500g", titre: 65, description: 40, motsCles: 30, image: 90, scoreGlobal: 56, priorite: "haute" },
  { produit: "Evian 1.5L", titre: 80, description: 70, motsCles: 60, image: 95, scoreGlobal: 76, priorite: "moyenne" },
  { produit: "Nutella 400g", titre: 90, description: 85, motsCles: 75, image: 95, scoreGlobal: 86, priorite: "basse" },
  { produit: "Activia Nature 4x125g", titre: 50, description: 20, motsCles: 15, image: 70, scoreGlobal: 39, priorite: "haute" },
  { produit: "Cristaline 1.5L", titre: 55, description: 30, motsCles: 25, image: 85, scoreGlobal: 49, priorite: "haute" },
  { produit: "Système U Lait 1L", titre: 45, description: 15, motsCles: 10, image: 60, scoreGlobal: 33, priorite: "haute" },
  { produit: "Coca-Cola 1.5L", titre: 85, description: 80, motsCles: 70, image: 95, scoreGlobal: 83, priorite: "basse" },
  { produit: "Dove Gel Douche 400ml", titre: 60, description: 45, motsCles: 35, image: 75, scoreGlobal: 54, priorite: "moyenne" },
];

var VEILLE_MK = [
  { concurrent: "La Fourche", observations: [
    { type: "promo", detail: "Opé -20% sur tout le rayon bio — durée 10j", date: "29/04/2026" },
    { type: "assortiment", detail: "Lancement d'une gamme MDD bio (15 réfs)", date: "22/04/2026" },
    { type: "comm", detail: "Newsletter mettant en avant le vrac et zéro déchet", date: "28/04/2026" },
  ]},
  { concurrent: "Naturalia", observations: [
    { type: "promo", detail: "3ème gratuit sur les boissons végétales", date: "30/04/2026" },
    { type: "assortiment", detail: "Ajout de 20 réfs cosmétiques naturelles (Weleda, Cattier)", date: "25/04/2026" },
  ]},
  { concurrent: "Monoprix", observations: [
    { type: "promo", detail: "Carte fidélité x3 points sur épicerie sucrée", date: "27/04/2026" },
    { type: "comm", detail: "Campagne été 'Monoprix fait sa fraîche' — focus surgelés et boissons", date: "01/05/2026" },
    { type: "assortiment", detail: "Extension rayon traiteur frais (+30 réfs)", date: "20/04/2026" },
    { type: "prix", detail: "Baisse de prix sur 50 réfs de base (lait, œufs, beurre)", date: "15/04/2026" },
  ]},
];

var PARTENARIATS = [
  { id: "ESP-001", marque: "Danone", type: "Bannière homepage", duree: "14j", debut: "01/06/2026", fin: "15/06/2026", prix: 3000, statut: "reserve" },
  { id: "ESP-002", marque: "Coca-Cola", type: "Bannière homepage", duree: "7j", debut: "20/04/2026", fin: "27/04/2026", prix: 1500, statut: "termine" },
  { id: "ESP-003", marque: "Nestlé", type: "Mise en avant catégorie", duree: "30j", debut: "15/05/2026", fin: "14/06/2026", prix: 2200, statut: "actif" },
  { id: "ESP-004", marque: "Unilever", type: "Push notification", duree: "1j", debut: "10/05/2026", fin: "10/05/2026", prix: 800, statut: "reserve" },
];

/* ═══ LEGAL REFERENCE ═══ */
var LEGAL_REFS = [
  { titre: "Seuil de Revente à Perte (SRP)", ref: "Art. L.442-2 Code de commerce", detail: "Il est interdit de revendre un produit en dessous de son prix d'achat effectif (PA + frais). Le SRP+10% (loi EGAlim 2) s'applique aux denrées alimentaires." },
  { titre: "Encadrement des promotions", ref: "Loi EGAlim 2 (2021) — Art. L.441-4", detail: "Les avantages promotionnels sur les denrées alimentaires ne peuvent excéder 34% de la valeur du produit. Les promotions en valeur sont plafonnées à 25% du CA prévisionnel." },
  { titre: "NIP — Nouveaux Instruments Promotionnels", ref: "Accord interprofessionnel", detail: "Les NIP (bons de réduction, offres de remboursement) ne sont pas soumis au plafond de 34% mais doivent respecter le SRP." },
  { titre: "Revente à perte — Sanctions", ref: "Art. L.442-2 Code de commerce", detail: "Amende de 75 000€ pour une personne physique, 375 000€ pour une personne morale. Peut aller jusqu'à 50% des dépenses de publicité." },
  { titre: "Mentions obligatoires promo", ref: "Art. L.112-1 Code de la conso", detail: "Toute communication promo doit mentionner : prix avant réduction (prix barré = prix le + bas des 30 derniers jours), durée de l'offre, conditions." },
  { titre: "Lot virtuel / Vente par lot", ref: "Art. L.121-11 Code de la conso", detail: "La vente par lots est autorisée si chaque produit est aussi vendu séparément et si le prix du lot est inférieur à la somme des prix unitaires." },
  { titre: "Délais de paiement", ref: "Art. L.441-10 Code de commerce", detail: "Délai max 60 jours date de facture ou 45 jours fin de mois. Produits alimentaires périssables : 30 jours max après fin de décade de livraison." },
  { titre: "RFA — Ristournes de Fin d'Année", ref: "Art. L.441-3 Code de commerce", detail: "Les RFA doivent figurer dans la convention annuelle. Elles sont calculées sur le CA annuel et soumises à la transparence (CGV)." },
];

function LegalBubble({ show, onClose }) {
  if (!show) return null;
  return <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(61,50,41,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }} onClick={onClose}>
    <div onClick={function (e) { e.stopPropagation(); }} style={{ ...crd, width: 620, maxHeight: "85vh", overflowY: "auto", padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: P.text, margin: 0, fontFamily: SERIF }}>⚖️ Références Légales Commerce</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: P.textMuted, cursor: "pointer" }}>✕</button>
      </div>
      {LEGAL_REFS.map(function (l, i) {
        return <div key={i} style={{ padding: "16px 0", borderBottom: i < LEGAL_REFS.length - 1 ? "1px solid " + P.borderLight : "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: P.text }}>{l.titre}</div>
            <Badge label={l.ref} color={P.blue} />
          </div>
          <div style={{ fontSize: 13, color: P.textMuted, lineHeight: 1.6 }}>{l.detail}</div>
        </div>;
      })}
    </div>
  </div>;
}

/* ═══ MARKETING TAB ═══ */
export function MarketingTab() {
  var [sub, setSub] = useState("trafic");
  var [showLegal, setShowLegal] = useState(false);

  var typeColors = { promo: P.orange, assortiment: P.green, comm: P.blue, prix: P.red };
  var typeLabels = { promo: "Promo", assortiment: "Assortiment", comm: "Communication", prix: "Prix" };

  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 4, background: P.surface, borderRadius: 28, padding: 4, border: "1px solid " + P.border, flexWrap: "wrap" }}>
        {[{ key: "trafic", label: "Trafic & Conversion" }, { key: "emerch", label: "E-merch" }, { key: "seo", label: "Content & SEO" }, { key: "veille", label: "Veille Concurrentielle" }, { key: "espaces", label: "Espaces Commerciaux" }].map(function (t) {
          return <Pill key={t.key} active={sub === t.key} onClick={function () { setSub(t.key); }}>{t.label}</Pill>;
        })}
      </div>
      <button onClick={function () { setShowLegal(true); }} style={{ padding: "9px 18px", borderRadius: 24, border: "1px solid " + P.blue, background: P.blueSoft, color: P.blue, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: SANS, display: "flex", alignItems: "center", gap: 6 }}>
        ⚖️ Réf. légales
      </button>
    </div>

    {/* TRAFIC & CONVERSION */}
    {sub === "trafic" && <div>
      <div style={{ ...crd, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid " + P.borderLight }}>
            {["Catégorie", "Visites", "Ajout panier", "Taux ajout", "Achats", "Taux conv.", "Diagnostic"].map(function (h) {
              return <th key={h} style={{ padding: "12px 10px", textAlign: "left", color: P.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>;
            })}
          </tr></thead>
          <tbody>{TRAFIC.sort(function (a, b) { return b.visites - a.visites; }).map(function (t, i) {
            var convC = t.tauxConv >= 14 ? P.green : t.tauxConv >= 10 ? P.orange : P.red;
            return <tr key={i} style={{ borderBottom: "1px solid " + P.borderLight }}
              onMouseEnter={function (e) { e.currentTarget.style.background = P.surfaceHover; }}
              onMouseLeave={function (e) { e.currentTarget.style.background = "transparent"; }}>
              <td style={{ padding: "12px 10px", fontWeight: 700, color: P.text }}>{t.categ}</td>
              <td style={{ padding: "12px 10px", fontFamily: MONO, fontWeight: 600 }}>{t.visites.toLocaleString()}</td>
              <td style={{ padding: "12px 10px", fontFamily: MONO }}>{t.ajoutPanier.toLocaleString()}</td>
              <td style={{ padding: "12px 10px" }}><MiniBar value={t.tauxAjout} max={35} color={P.blue} /></td>
              <td style={{ padding: "12px 10px", fontFamily: MONO, fontWeight: 600 }}>{t.achats.toLocaleString()}</td>
              <td style={{ padding: "12px 10px" }}><Badge label={t.tauxConv + "%"} color={convC} /></td>
              <td style={{ padding: "12px 10px", fontSize: 12, color: P.textMuted, maxWidth: 220 }}>{t.diagnostic}</td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>}

    {/* E-MERCH */}
    {sub === "emerch" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Organisation visuelle des catégories sur le site — position, visuels, cohérence.</div>
      {EMERCH.map(function (e, i) {
        var sc = e.score === "optimal" ? P.green : e.score === "a_revoir" ? P.orange : P.red;
        var sl = e.score === "optimal" ? "Optimal" : e.score === "a_revoir" ? "À revoir" : "Sous-exploité";
        return <div key={i} style={{ ...crd, padding: "20px 24px", marginBottom: 14, border: e.problemes.length > 0 ? "1px solid " + P.orange + "22" : "1px solid " + P.border }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: P.text }}>{e.categ}</div>
              <span style={{ fontSize: 12, color: P.textMuted }}>Position homepage : #{e.posHomepage}</span>
              {e.banniere && <Badge label="Bannière active" color={P.green} />}
            </div>
            <Badge label={sl} color={sc} />
          </div>
          <div style={{ fontSize: 12, color: P.textMuted, marginBottom: 8 }}>Dernière mise à jour : {e.derniereMaj}</div>
          {e.problemes.length > 0 && <div style={{ background: P.orangeSoft, borderRadius: 10, padding: "10px 14px" }}>
            {e.problemes.map(function (p, j) {
              return <div key={j} style={{ fontSize: 12, color: P.orange, marginBottom: j < e.problemes.length - 1 ? 6 : 0, display: "flex", alignItems: "flex-start", gap: 6 }}>
                <span>⚠</span><span>{p}</span>
              </div>;
            })}
          </div>}
        </div>;
      })}
    </div>}

    {/* CONTENT & SEO */}
    {sub === "seo" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Score qualité marketing des fiches produit — titre, description, mots-clés, image.</div>
      <div style={{ ...crd, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid " + P.borderLight }}>
            {["Produit", "Titre", "Description", "Mots-clés", "Image", "Score global", "Priorité"].map(function (h) {
              return <th key={h} style={{ padding: "12px 10px", textAlign: "left", color: P.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>;
            })}
          </tr></thead>
          <tbody>{SEO.sort(function (a, b) { return a.scoreGlobal - b.scoreGlobal; }).map(function (s, i) {
            function scoreColor(v) { return v >= 70 ? P.green : v >= 50 ? P.orange : P.red; }
            return <tr key={i} style={{ borderBottom: "1px solid " + P.borderLight }}
              onMouseEnter={function (e) { e.currentTarget.style.background = P.surfaceHover; }}
              onMouseLeave={function (e) { e.currentTarget.style.background = "transparent"; }}>
              <td style={{ padding: "12px 10px", fontWeight: 600, color: P.text }}>{s.produit}</td>
              <td style={{ padding: "12px 10px" }}><MiniBar value={s.titre} max={100} color={scoreColor(s.titre)} /></td>
              <td style={{ padding: "12px 10px" }}><MiniBar value={s.description} max={100} color={scoreColor(s.description)} /></td>
              <td style={{ padding: "12px 10px" }}><MiniBar value={s.motsCles} max={100} color={scoreColor(s.motsCles)} /></td>
              <td style={{ padding: "12px 10px" }}><MiniBar value={s.image} max={100} color={scoreColor(s.image)} /></td>
              <td style={{ padding: "12px 10px" }}><Badge label={s.scoreGlobal + "/100"} color={scoreColor(s.scoreGlobal)} /></td>
              <td style={{ padding: "12px 10px" }}><Badge label={s.priorite} color={s.priorite === "haute" ? P.red : s.priorite === "moyenne" ? P.orange : P.textMuted} /></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>}

    {/* VEILLE CONCURRENTIELLE */}
    {sub === "veille" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Observations marketing des concurrents — promos, assortiment, communication, prix.</div>
      {VEILLE_MK.map(function (v) {
        return <div key={v.concurrent} style={{ ...crd, padding: "22px 26px", marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: P.text, marginBottom: 14, fontFamily: SERIF }}>{v.concurrent}</div>
          {v.observations.map(function (o, i) {
            var tc = typeColors[o.type] || P.textMuted;
            var tl = typeLabels[o.type] || o.type;
            return <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < v.observations.length - 1 ? "1px solid " + P.borderLight : "none" }}>
              <Badge label={tl} color={tc} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: P.text, lineHeight: 1.5 }}>{o.detail}</div>
                <div style={{ fontSize: 11, color: P.textMuted, marginTop: 4 }}>{o.date}</div>
              </div>
            </div>;
          })}
        </div>;
      })}
    </div>}

    {/* ESPACES COMMERCIAUX */}
    {sub === "espaces" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Suivi des espaces commerciaux vendus aux marques — bannières, mises en avant, push.</div>
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {[
          { l: "Actifs", v: PARTENARIATS.filter(function (p) { return p.statut === "actif"; }).length, c: P.green },
          { l: "Réservés", v: PARTENARIATS.filter(function (p) { return p.statut === "reserve"; }).length, c: P.orange },
          { l: "Terminés", v: PARTENARIATS.filter(function (p) { return p.statut === "termine"; }).length, c: P.textMuted },
          { l: "Revenus total", v: PARTENARIATS.reduce(function (a, p) { return a + p.prix; }, 0).toLocaleString() + "€", c: P.accent },
        ].map(function (s, i) {
          return <div key={i} style={{ ...crd, padding: "18px 22px", flex: 1 }}><div style={{ fontSize: 11, color: P.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{s.l}</div><span style={{ fontSize: 24, fontWeight: 700, color: s.c, fontFamily: MONO }}>{s.v}</span></div>;
        })}
      </div>
      <div style={{ ...crd, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid " + P.borderLight }}>
            {["ID", "Marque", "Type", "Durée", "Période", "Prix", "Statut"].map(function (h) {
              return <th key={h} style={{ padding: "12px 10px", textAlign: "left", color: P.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>;
            })}
          </tr></thead>
          <tbody>{PARTENARIATS.map(function (p) {
            var sc = p.statut === "actif" ? P.green : p.statut === "reserve" ? P.orange : P.textMuted;
            var sl = p.statut === "actif" ? "Actif" : p.statut === "reserve" ? "Réservé" : "Terminé";
            return <tr key={p.id} style={{ borderBottom: "1px solid " + P.borderLight }}
              onMouseEnter={function (e) { e.currentTarget.style.background = P.surfaceHover; }}
              onMouseLeave={function (e) { e.currentTarget.style.background = "transparent"; }}>
              <td style={{ padding: "12px 10px", fontFamily: MONO, fontSize: 11, color: P.accent, fontWeight: 700 }}>{p.id}</td>
              <td style={{ padding: "12px 10px", fontWeight: 700, color: P.text }}>{p.marque}</td>
              <td style={{ padding: "12px 10px", color: P.textMuted }}>{p.type}</td>
              <td style={{ padding: "12px 10px", fontFamily: MONO, fontSize: 11 }}>{p.duree}</td>
              <td style={{ padding: "12px 10px", fontSize: 12, color: P.textMuted }}>{p.debut} → {p.fin}</td>
              <td style={{ padding: "12px 10px", fontFamily: MONO, fontWeight: 700, color: P.accent }}>{p.prix.toLocaleString()}€</td>
              <td style={{ padding: "12px 10px" }}><Badge label={sl} color={sc} /></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>}

    <LegalBubble show={showLegal} onClose={function () { setShowLegal(false); }} />
  </div>;
}

/* ═══ MAIN ═══ */
export default function App() {
  return <div style={{ fontFamily: SANS, background: P.bg, color: P.text, minHeight: "100vh", display: "flex" }}>
    <style>{"@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Source+Code+Pro:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-thumb{background:" + P.sand + ";border-radius:3px;}"}</style>
    <div style={{ width: 220, background: P.sidebar, padding: "28px 12px", display: "flex", flexDirection: "column", gap: 4, position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
      <div style={{ padding: "0 14px 22px", marginBottom: 14, borderBottom: "1px solid rgba(214,201,182,0.12)" }}>
        <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, color: "#F5EDE4" }}>La Belle Vie</div>
        <div style={{ fontSize: 11, color: P.sidebarMuted, marginTop: 4 }}>Cockpit Achats</div>
      </div>
      {[{ label: "Dashboard", icon: "🏠", dis: true }, { label: "Achats", icon: "📦", dis: true }, { label: "Offre", icon: "🏷️", dis: true }, { label: "Marketing", icon: "📣", dis: false }, { label: "Trade MK", icon: "📢", dis: true }, { label: "Categ Mgmt", icon: "📊", dis: true }].map(function (t) {
        var isA = !t.dis;
        return <button key={t.label} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 14px", borderRadius: 12, border: "none", cursor: t.dis ? "default" : "pointer", fontSize: 13, fontWeight: isA ? 600 : 400, fontFamily: SANS, background: isA ? P.sidebarActive : "transparent", color: isA ? "#F5EDE4" : P.sidebarMuted, opacity: t.dis && !isA ? 0.4 : 1, textAlign: "left", width: "100%" }}><span style={{ fontSize: 16 }}>{t.icon}</span>{t.label}</button>;
      })}
      <div style={{ marginTop: "auto", padding: 14, borderTop: "1px solid rgba(214,201,182,0.12)" }}><div style={{ fontSize: 10, color: P.sidebarMuted }}>v0.5 · Marketing<br /><span style={{ color: P.accent }}>données fictives</span></div></div>
    </div>
    <div style={{ flex: 1, padding: "32px 36px", overflowY: "auto", minWidth: 0 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: P.text, fontFamily: SERIF }}>📣 Marketing</h1>
        <p style={{ fontSize: 13, color: P.textMuted, margin: "8px 0 0" }}>Trafic & Conversion · E-merch · Content & SEO · Veille Concurrentielle · Espaces Commerciaux</p>
      </div>
      <MarketingTab />
    </div>
  </div>;
}
