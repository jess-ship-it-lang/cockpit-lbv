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

/* ═══════════════════════════════════════════════
   FOURNISSEURS DATA
   ═══════════════════════════════════════════════ */
var FOURNISSEURS = [
  { id: "F001", nom: "Système U", type: "Central", siret: "377 291 234 00032", contact: "Jean Dupont", email: "jdupont@systeme-u.fr", tel: "01 45 67 89 00",
    adresse: "1 rue du Commerce, 94500 Champigny", franco: "350€", delai: "J+1 (sauf mercredi)", rfa: "2.5%", contratFin: "2026-12-31",
    ca: 156000, caPoids: 42.3, nbRefs: 892, ruptures: 12, margeM: 28.4, classABC: "A",
    negosEnCours: [{ objet: "Renouvellement annuel 2027", statut: "en_cours", objectif: "RFA +0.5%, franco maintenu", echeance: "2026-10-15" }] },
  { id: "F002", nom: "Metro France", type: "Central", siret: "622 008 925 00019", contact: "Sophie Martin", email: "smartin@metro.fr", tel: "01 42 33 55 00",
    adresse: "5 rue des Grossistes, 92000 Nanterre", franco: "500€", delai: "J+2", rfa: "1.8%", contratFin: "2026-09-30",
    ca: 89000, caPoids: 24.1, nbRefs: 456, ruptures: 8, margeM: 25.7, classABC: "A",
    negosEnCours: [{ objet: "Extension catalogue bio", statut: "en_cours", objectif: "150 réfs bio à intégrer, franco -50€", echeance: "2026-06-30" }] },
  { id: "F003", nom: "Danone", type: "Direct", siret: "552 100 554 00014", contact: "Marc Leroy", email: "mleroy@danone.com", tel: "01 44 35 20 00",
    adresse: "17 bd Haussmann, 75009 Paris", franco: "250€", delai: "J+3", rfa: "3.2%", contratFin: "2027-03-31",
    ca: 34500, caPoids: 9.4, nbRefs: 67, ruptures: 3, margeM: 27.1, classABC: "B",
    negosEnCours: [] },
  { id: "F004", nom: "Nestlé", type: "Direct", siret: "542 014 428 00091", contact: "Claire Dubois", email: "cdubois@nestle.com", tel: "01 55 42 60 00",
    adresse: "7 bd Pierre Carle, 77186 Noisiel", franco: "300€", delai: "J+2", rfa: "2.8%", contratFin: "2026-12-31",
    ca: 28700, caPoids: 7.8, nbRefs: 54, ruptures: 2, margeM: 30.2, classABC: "B",
    negosEnCours: [{ objet: "Plan promo été 2026", statut: "finalisation", objectif: "Budget promo +15%, exclusivités été", echeance: "2026-05-15" }] },
  { id: "F005", nom: "Coca-Cola", type: "Direct", siret: "421 254 555 00013", contact: "Pierre Moreau", email: "pmoreau@coca-cola.com", tel: "01 58 55 40 00",
    adresse: "9 ch. de Bretagne, 92130 Issy", franco: "500€", delai: "J+2", rfa: "2.0%", contratFin: "2027-06-30",
    ca: 22300, caPoids: 6.0, nbRefs: 18, ruptures: 0, margeM: 22.5, classABC: "B",
    negosEnCours: [] },
  { id: "F006", nom: "Barilla", type: "Direct", siret: "347 567 891 00045", contact: "Laura Bianchi", email: "lbianchi@barilla.com", tel: "01 49 88 30 00",
    adresse: "12 rue de Milan, 75009 Paris", franco: "200€", delai: "J+3", rfa: "1.5%", contratFin: "2026-11-30",
    ca: 18200, caPoids: 4.9, nbRefs: 42, ruptures: 1, margeM: 24.8, classABC: "C",
    negosEnCours: [{ objet: "Référencement gamme pesto", statut: "en_cours", objectif: "8 nouvelles réfs pesto, PA compétitif", echeance: "2026-06-15" }] },
  { id: "F007", nom: "Unilever", type: "Direct", siret: "552 032 534 00087", contact: "Anne Petit", email: "apetit@unilever.com", tel: "01 48 61 30 00",
    adresse: "23 rue F. Jacob, 92500 Rueil", franco: "400€", delai: "J+2", rfa: "2.2%", contratFin: "2026-08-31",
    ca: 12400, caPoids: 3.4, nbRefs: 35, ruptures: 4, margeM: 33.6, classABC: "C",
    negosEnCours: [] },
  { id: "F008", nom: "PepsiCo", type: "Direct", siret: "389 234 567 00012", contact: "Julien Roux", email: "jroux@pepsico.com", tel: "01 41 10 20 00",
    adresse: "420 rue d'Estienne d'Orves, 92700 Colombes", franco: "450€", delai: "J+3", rfa: "1.2%", contratFin: "2027-01-31",
    ca: 8100, caPoids: 2.2, nbRefs: 22, ruptures: 1, margeM: 29.8, classABC: "C",
    negosEnCours: [] },
];

var SOURCING_SPLIT = [
  { source: "Système U", pct: 62, nbRefs: 892, avantages: "Largeur gamme, prix compétitifs, livraison J+1", limites: "Pas de bio premium, ruptures fréquentes sur MDD" },
  { source: "Metro France", pct: 26, nbRefs: 456, avantages: "Bio, produits spécialisés, marques premium", limites: "Franco élevé (500€), délai J+2" },
  { source: "Fournisseurs directs", pct: 12, nbRefs: 238, avantages: "Exclusivités, promos dédiées, RFA supérieures", limites: "Gestion multiple, francos variables" },
];

/* ═══════════════════════════════════════════════
   ACHATS TAB
   ═══════════════════════════════════════════════ */

export function AchatsTab() {
  var [sub, setSub] = useState("dashboard");
  var [selF, setSelF] = useState(null);

  var totalCA = FOURNISSEURS.reduce(function (a, f) { return a + f.ca; }, 0);
  var totalRuptures = FOURNISSEURS.reduce(function (a, f) { return a + f.ruptures; }, 0);
  var negosCount = FOURNISSEURS.reduce(function (a, f) { return a + f.negosEnCours.length; }, 0);
  var contratsExpiring = FOURNISSEURS.filter(function (f) { return new Date(f.contratFin) < new Date("2026-10-01"); }).length;

  return <div>
    <div style={{ display: "flex", gap: 4, marginBottom: 24, background: P.surface, borderRadius: 28, padding: 4, width: "fit-content", border: "1px solid " + P.border, flexWrap: "wrap" }}>
      {[{ key: "dashboard", label: "Dashboard" }, { key: "fiches", label: "Fiches Fournisseurs" }, { key: "negos", label: "Négociations" }, { key: "abc", label: "Classification ABC" }, { key: "sourcing", label: "Sourcing" }].map(function (t) {
        var badge = t.key === "negos" && negosCount > 0 ? negosCount : null;
        return <Pill key={t.key} active={sub === t.key} onClick={function () { setSub(t.key); setSelF(null); }}>
          {t.label}
          {badge && <span style={{ fontSize: 10, background: sub === t.key ? "rgba(255,255,255,0.25)" : P.orangeSoft, color: sub === t.key ? "#fff" : P.orange, padding: "2px 7px", borderRadius: 12, fontWeight: 700 }}>{badge}</span>}
        </Pill>;
      })}
    </div>

    {/* DASHBOARD */}
    {sub === "dashboard" && <div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        {[
          { l: "Fournisseurs actifs", v: FOURNISSEURS.length, c: P.text },
          { l: "CA total mensuel", v: (totalCA / 1000).toFixed(0) + "k€", c: P.accent },
          { l: "Ruptures totales", v: totalRuptures, c: totalRuptures > 10 ? P.red : P.orange },
          { l: "Négos en cours", v: negosCount, c: P.blue },
          { l: "Contrats à renouveler", v: contratsExpiring, c: contratsExpiring > 0 ? P.red : P.green },
        ].map(function (s, i) {
          return <div key={i} style={{ ...crd, padding: "18px 22px", flex: "1 1 140px" }}><div style={{ fontSize: 11, color: P.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{s.l}</div><span style={{ fontSize: 28, fontWeight: 700, color: s.c, fontFamily: MONO }}>{s.v}</span></div>;
        })}
      </div>

      {/* Alertes */}
      <div style={{ ...crd, padding: 22, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: P.text, marginBottom: 16 }}>Alertes fournisseurs</div>
        {FOURNISSEURS.filter(function (f) { return f.ruptures > 0 || new Date(f.contratFin) < new Date("2026-10-01"); }).map(function (f, i) {
          var alerts = [];
          if (f.ruptures > 5) alerts.push({ sev: "high", msg: f.nom + " : " + f.ruptures + " ruptures actives" });
          else if (f.ruptures > 0) alerts.push({ sev: "medium", msg: f.nom + " : " + f.ruptures + " rupture(s)" });
          if (new Date(f.contratFin) < new Date("2026-10-01")) alerts.push({ sev: "medium", msg: f.nom + " : contrat expire le " + f.contratFin });
          return alerts.map(function (a, j) {
            return <div key={i + "-" + j} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "12px 14px", background: a.sev === "high" ? P.redSoft : P.bg, borderRadius: 12, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.sev === "high" ? P.red : P.orange, marginTop: 5, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13, color: P.text, lineHeight: 1.5 }}>{a.msg}</span>
            </div>;
          });
        })}
      </div>
    </div>}

    {/* FICHES FOURNISSEURS */}
    {sub === "fiches" && !selF && <div>
      <div style={{ ...crd, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid " + P.borderLight }}>
            {["ID", "Fournisseur", "Type", "Réfs", "CA", "Poids CA", "Marge", "Ruptures", "Franco", "Délai", "ABC"].map(function (h) {
              return <th key={h} style={{ padding: "12px 8px", textAlign: "left", color: P.textMuted, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{h}</th>;
            })}
          </tr></thead>
          <tbody>{FOURNISSEURS.map(function (f) {
            var abcC = f.classABC === "A" ? P.green : f.classABC === "B" ? P.orange : P.textMuted;
            return <tr key={f.id} onClick={function () { setSelF(f); }} style={{ borderBottom: "1px solid " + P.borderLight, cursor: "pointer" }}
              onMouseEnter={function (e) { e.currentTarget.style.background = P.surfaceHover; }}
              onMouseLeave={function (e) { e.currentTarget.style.background = "transparent"; }}>
              <td style={{ padding: "10px 8px", fontFamily: MONO, fontSize: 11, color: P.accent, fontWeight: 700 }}>{f.id}</td>
              <td style={{ padding: "10px 8px", fontWeight: 700, color: P.text }}>{f.nom}</td>
              <td style={{ padding: "10px 8px" }}><Badge label={f.type} color={f.type === "Central" ? P.blue : P.sage} /></td>
              <td style={{ padding: "10px 8px", fontFamily: MONO }}>{f.nbRefs}</td>
              <td style={{ padding: "10px 8px", fontFamily: MONO, fontWeight: 600 }}>{(f.ca / 1000).toFixed(1)}k€</td>
              <td style={{ padding: "10px 8px" }}><MiniBar value={f.caPoids} max={50} color={P.accent} /></td>
              <td style={{ padding: "10px 8px", fontFamily: MONO, color: f.margeM > 28 ? P.green : P.text }}>{f.margeM}%</td>
              <td style={{ padding: "10px 8px", fontFamily: MONO, color: f.ruptures > 5 ? P.red : f.ruptures > 0 ? P.orange : P.green, fontWeight: 600 }}>{f.ruptures}</td>
              <td style={{ padding: "10px 8px", fontFamily: MONO, fontSize: 11 }}>{f.franco}</td>
              <td style={{ padding: "10px 8px", fontFamily: MONO, fontSize: 11 }}>{f.delai}</td>
              <td style={{ padding: "10px 8px" }}><Badge label={"Classe " + f.classABC} color={abcC} /></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>}

    {/* Fiche détail */}
    {sub === "fiches" && selF && <div>
      <button onClick={function () { setSelF(null); }} style={{ background: "none", border: "none", color: P.accent, fontSize: 13, cursor: "pointer", fontWeight: 600, marginBottom: 16 }}>← Retour</button>
      <div style={{ ...crd, padding: "24px 28px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><h3 style={{ fontSize: 20, fontWeight: 700, color: P.text, margin: 0, fontFamily: SERIF }}>{selF.nom}</h3><p style={{ fontSize: 13, color: P.textMuted, margin: "6px 0 0" }}>{selF.type} · {selF.id}</p></div>
          <Badge label={"Classe " + selF.classABC} color={selF.classABC === "A" ? P.green : selF.classABC === "B" ? P.orange : P.textMuted} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={{ ...crd, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: P.text, marginBottom: 14 }}>Informations</div>
          {[{ l: "SIRET", v: selF.siret }, { l: "Contact", v: selF.contact }, { l: "Email", v: selF.email }, { l: "Tél.", v: selF.tel }, { l: "Adresse", v: selF.adresse }].map(function (f, i) {
            return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? "1px solid " + P.borderLight : "none" }}>
              <span style={{ fontSize: 12, color: P.textMuted }}>{f.l}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: P.text, textAlign: "right", maxWidth: 200 }}>{f.v}</span>
            </div>;
          })}
        </div>
        <div style={{ ...crd, padding: "20px 24px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: P.text, marginBottom: 14 }}>Conditions commerciales</div>
          {[{ l: "Franco", v: selF.franco }, { l: "Délai livraison", v: selF.delai }, { l: "RFA", v: selF.rfa }, { l: "Fin de contrat", v: selF.contratFin }, { l: "Réfs actives", v: selF.nbRefs + "" }, { l: "CA mensuel", v: (selF.ca / 1000).toFixed(1) + "k€" }].map(function (f, i) {
            return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 5 ? "1px solid " + P.borderLight : "none" }}>
              <span style={{ fontSize: 12, color: P.textMuted }}>{f.l}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: P.text, fontFamily: MONO }}>{f.v}</span>
            </div>;
          })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[{ l: "CA mensuel", v: (selF.ca / 1000).toFixed(1) + "k€", c: P.accent }, { l: "Poids CA", v: selF.caPoids + "%", c: P.text }, { l: "Marge moy.", v: selF.margeM + "%", c: selF.margeM > 28 ? P.green : P.orange }, { l: "Ruptures", v: selF.ruptures, c: selF.ruptures > 5 ? P.red : selF.ruptures > 0 ? P.orange : P.green }].map(function (s, i) {
          return <div key={i} style={{ ...crd, padding: "16px 20px" }}><div style={{ fontSize: 11, color: P.textMuted, textTransform: "uppercase", marginBottom: 8 }}>{s.l}</div><span style={{ fontSize: 22, fontWeight: 700, color: s.c, fontFamily: MONO }}>{s.v}</span></div>;
        })}
      </div>
    </div>}

    {/* NÉGOCIATIONS */}
    {sub === "negos" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Suivi des négociations en cours et à venir.</div>
      {FOURNISSEURS.filter(function (f) { return f.negosEnCours.length > 0; }).map(function (f) {
        return f.negosEnCours.map(function (n, i) {
          var stC = n.statut === "en_cours" ? P.orange : n.statut === "finalisation" ? P.green : P.textMuted;
          var stL = n.statut === "en_cours" ? "En cours" : n.statut === "finalisation" ? "Finalisation" : n.statut;
          var joursRestants = Math.ceil((new Date(n.echeance) - new Date("2026-05-02")) / (1000 * 60 * 60 * 24));
          return <div key={f.id + "-" + i} style={{ ...crd, padding: "22px 26px", marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: P.text }}>{f.nom}</div><div style={{ fontSize: 12, color: P.textMuted, marginTop: 4 }}>{n.objet}</div></div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Badge label={stL} color={stC} />
                <Badge label={"J-" + joursRestants} color={joursRestants < 15 ? P.red : P.textMuted} />
              </div>
            </div>
            <div style={{ padding: "12px 16px", background: P.bg, borderRadius: 12, fontSize: 13, color: P.text }}>
              <strong>Objectif :</strong> {n.objectif}
            </div>
            <div style={{ fontSize: 12, color: P.textMuted, marginTop: 10 }}>Échéance : {n.echeance} · Contact : {f.contact} ({f.email})</div>
          </div>;
        });
      })}
      {negosCount === 0 && <div style={{ ...crd, padding: 40, textAlign: "center", color: P.textMuted }}>Aucune négociation en cours</div>}
    </div>}

    {/* CLASSIFICATION ABC */}
    {sub === "abc" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Classification ABC des fournisseurs par poids dans le CA total.</div>
      {["A", "B", "C"].map(function (cls) {
        var fList = FOURNISSEURS.filter(function (f) { return f.classABC === cls; });
        var clsC = cls === "A" ? P.green : cls === "B" ? P.orange : P.textMuted;
        var clsDesc = cls === "A" ? "Fournisseurs stratégiques — > 20% du CA" : cls === "B" ? "Fournisseurs importants — 5-20% du CA" : "Fournisseurs complémentaires — < 5% du CA";
        var totalClsCA = fList.reduce(function (a, f) { return a + f.ca; }, 0);
        return <div key={cls} style={{ ...crd, padding: 22, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div><div style={{ fontSize: 16, fontWeight: 700, color: clsC, fontFamily: SERIF }}>Classe {cls}</div><div style={{ fontSize: 12, color: P.textMuted }}>{clsDesc}</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 18, fontWeight: 700, color: P.text, fontFamily: MONO }}>{(totalClsCA / 1000).toFixed(0)}k€</div><div style={{ fontSize: 11, color: P.textMuted }}>{fList.length} fournisseurs</div></div>
          </div>
          {fList.sort(function (a, b) { return b.ca - a.ca; }).map(function (f, i) {
            return <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < fList.length - 1 ? "1px solid " + P.borderLight : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 28, height: 28, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", background: clsC + "14", color: clsC, fontWeight: 700, fontSize: 12 }}>{i + 1}</span>
                <div><div style={{ fontSize: 13, color: P.text, fontWeight: 600 }}>{f.nom}</div><div style={{ fontSize: 11, color: P.textMuted }}>{f.type} · {f.nbRefs} réf.</div></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <MiniBar value={f.caPoids} max={50} color={clsC} />
                <span style={{ fontFamily: MONO, fontWeight: 700, color: P.text, fontSize: 14 }}>{(f.ca / 1000).toFixed(1)}k€</span>
              </div>
            </div>;
          })}
        </div>;
      })}
    </div>}

    {/* SOURCING */}
    {sub === "sourcing" && <div>
      <div style={{ fontSize: 13, color: P.textMuted, marginBottom: 20 }}>Stratégie d'approvisionnement — répartition Système U / Metro / Direct.</div>
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        {SOURCING_SPLIT.map(function (s, i) {
          var c = i === 0 ? P.blue : i === 1 ? P.accent : P.sage;
          return <div key={i} style={{ ...crd, padding: "20px 24px", flex: 1 }}>
            <div style={{ fontSize: 11, color: P.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{s.source}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: c, fontFamily: MONO, marginBottom: 4 }}>{s.pct}%</div>
            <div style={{ fontSize: 12, color: P.textMuted, marginBottom: 12 }}>{s.nbRefs} réf.</div>
            <div style={{ fontSize: 12, color: P.green, marginBottom: 6 }}>✓ {s.avantages}</div>
            <div style={{ fontSize: 12, color: P.red }}>✕ {s.limites}</div>
          </div>;
        })}
      </div>
      <div style={{ ...crd, padding: "18px 22px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: P.text, marginBottom: 12 }}>Répartition sourcing</div>
        <div style={{ display: "flex", height: 28, borderRadius: 14, overflow: "hidden", background: P.bg }}>
          <div style={{ width: "62%", background: P.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700 }}>Système U 62%</div>
          <div style={{ width: "26%", background: P.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700 }}>Metro 26%</div>
          <div style={{ width: "12%", background: P.sage, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>Direct</div>
        </div>
      </div>
    </div>}
  </div>;
}

/* MAIN */
export default function App() {
  return <div style={{ fontFamily: SANS, background: P.bg, color: P.text, minHeight: "100vh", display: "flex" }}>
    <style>{"@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Source+Code+Pro:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-thumb{background:" + P.sand + ";border-radius:3px;}"}</style>
    <div style={{ width: 220, background: P.sidebar, padding: "28px 12px", display: "flex", flexDirection: "column", gap: 4, position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
      <div style={{ padding: "0 14px 22px", marginBottom: 14, borderBottom: "1px solid rgba(214,201,182,0.12)" }}>
        <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, color: "#F5EDE4" }}>La Belle Vie</div>
        <div style={{ fontSize: 11, color: P.sidebarMuted, marginTop: 4 }}>Cockpit Achats</div>
      </div>
      {[{ label: "Dashboard", icon: "🏠", dis: true }, { label: "Achats", icon: "📦", dis: false }, { label: "Offre", icon: "🏷️", dis: true }, { label: "Marketing", icon: "📣", dis: true }, { label: "Trade MK", icon: "📢", dis: true }, { label: "Categ Mgmt", icon: "📊", dis: true }].map(function (t) {
        var isA = !t.dis;
        return <button key={t.label} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 14px", borderRadius: 12, border: "none", cursor: t.dis ? "default" : "pointer", fontSize: 13, fontWeight: isA ? 600 : 400, fontFamily: SANS, background: isA ? P.sidebarActive : "transparent", color: isA ? "#F5EDE4" : P.sidebarMuted, opacity: t.dis && !isA ? 0.4 : 1, textAlign: "left", width: "100%" }}><span style={{ fontSize: 16 }}>{t.icon}</span>{t.label}</button>;
      })}
      <div style={{ marginTop: "auto", padding: 14, borderTop: "1px solid rgba(214,201,182,0.12)" }}><div style={{ fontSize: 10, color: P.sidebarMuted }}>v0.5 · Achats<br /><span style={{ color: P.accent }}>données fictives</span></div></div>
    </div>
    <div style={{ flex: 1, padding: "32px 36px", overflowY: "auto", minWidth: 0 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: P.text, fontFamily: SERIF }}>📦 Achats</h1>
        <p style={{ fontSize: 13, color: P.textMuted, margin: "8px 0 0" }}>Fournisseurs · Négociations · Classification ABC · Sourcing</p>
      </div>
      <AchatsTab />
    </div>
  </div>;
}
