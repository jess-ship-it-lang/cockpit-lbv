import { useState, useMemo } from "react";

const V={bg:"#FAF8F5",surface:"#FFFFFF",ink:"#15140F",ink2:"#43413A",muted:"#8A877E",line:"#E8E4DC",line2:"#F0ECE4",accent:"#B8553D",accentSoft:"#F5E7E2",pos:"#4F7A3F",posSoft:"#E8EFE2",warn:"#B07B23",warnSoft:"#F5ECD8",neg:"#A03826",negSoft:"#F5DDD7",blue:"#2A3D5C",blueSoft:"#DEE6F0"};
const MONO="'JetBrains Mono',ui-monospace,monospace";
const BODY="'Inter',system-ui,sans-serif";
const DISP="'Inter Tight','Inter',system-ui,sans-serif";
const crd={background:V.surface,border:"1px solid "+V.line,borderRadius:8};

const PROMOS=[{"i":0,"m":"Janvier","t":"SUPERDIET : OP SELL IN du 01 au 11 janvier \ncheck fait sur la facture à la date de l'OP = OK","d":"2025-01-01","f":"2025-01-11","cat":"Beauté","cmd":true,"act":false,"caA":1234.7,"caO":2607.04,"ev":"111,15%","roi":"4","fb":"regarder dès que possible les resultats post OP pour confirmer si la mise en avant a bien fonctionné en terme de durabil","cm":"très bonne OP, objectif de mise en avant reussi ( a confirmer avec resultat post op) ","activ":""},{"i":1,"m":"Janvier","t":"BBC Spirit/Lyre's Bannière -> cat cave 1 au 11 janvier - 1500€ + Classico en promo -20% et le reste ","d":"2025-01-01","f":"2025-01-11","cat":"Cave Sans Alcool","cmd":true,"act":true,"caA":207.2,"caO":853.41,"ev":"311,88%","roi":"5.03","fb":"pe a reconduire car bonne élasticité (bon Delta volume)  ","cm":"la réponse client est forte + de bons sku moteurs sur certaines ref (la classico et l'italian spritz par ex) ","activ":"Bannière cat Cave lien vers https://www.labellevie.com/categ"},{"i":2,"m":"Janvier","t":"MODÉRATO : Fêtes de fins d'années et Dry January - Gamme \"révolutionnaire\"","d":"2025-12-19","f":"2026-01-04","cat":"Cave Sans Alcool","cmd":true,"act":true,"caA":31.8,"caO":1560.4,"ev":"48,07 %","roi":"4","fb":"regarder les resultats post OP ","cm":"","activ":""},{"i":3,"m":"Janvier","t":"MATECITO: - 20 % avec bannière Frontpage du 9 au 18 - 1500€","d":"2025-01-09","f":"2025-01-18","cat":"Cave Sans Alcool","cmd":false,"act":true,"caA":5.3,"caO":284.08,"ev":"52.6","roi":"4","fb":"","cm":"objectif de mise en avant reussie, + de ventes qu'avant op ","activ":"Bannière Front"},{"i":4,"m":"Janvier","t":"GOXOA : 2M50%  sur 10j du 10 au 18/01  debut décallé de 7j ","d":"2026-01-16","f":"2026-01-26","cat":"Cave Sans Alcool","cmd":true,"act":true,"caA":134.4,"caO":672.0,"ev":"4","roi":"2.379603399","fb":"pe a reconduire car bonne élasticité (bon Delta volume)  + bonne réponse de la part des clients.\n p-e proposer a Eloïse ","cm":"Objectif de mise en avant clairement reussie. Interet croissant des clients post op (comparé a av op)\n Catégorisation su","activ":""},{"i":5,"m":"Janvier","t":"Alain Milliat : OP DRY JANUARY - Collection \"No low\" pnd 10j du 16 au 26 janvier\n (cf. Genipha - déb","d":"2026-01-23","f":"2026-02-02","cat":"Cave Sans Alcool","cmd":true,"act":true,"caA":NaN,"caO":946.45,"ev":"","roi":"4","fb":"\n","cm":"Semble plutot reussi mais pas de données precises pour le confirmer + retard dans a la mise en place qui n'a pas joué en","activ":""},{"i":6,"m":"Janvier","t":"CED : OP IROHA : - 34% sur les masques pendant 10j / du 16 au 25 janvier (sugg. mention KBeauty)\nfin","d":"2026-01-16","f":"2026-01-25","cat":"Beauté","cmd":true,"act":true,"caA":304.5,"caO":2588.18,"ev":"7.499781281","roi":"1.94","fb":"a reconduire = très bons resultats sur la periode de l'OP malgré le contexte complexe, donc surement de meilleurs result","cm":"réussi malgré des soucis de mise en place + logistique. ","activ":""},{"i":7,"m":"Janvier","t":"LAO CARE : - 20% sur toute la gamme pnd 10j à partir du 23 janvier ","d":"2026-01-23","f":"2026-02-02","cat":"Beauté","cmd":true,"act":true,"caA":185.2,"caO":1292.8,"ev":"5.980561555","roi":"4","fb":"p-e revérifier les categs car plusieurs refs : 0 ventes depuis la fin de la promo . \n+/- compréhensible vu le type de pr","cm":"opé rentable sur le moment T  mais perte d'interet nettement visible depuis la fin de l'OP\n","activ":""},{"i":8,"m":"Fevrier","t":"JHO : OP Hygiène périodique - 20% \n+ cmd de réassort prévu pour le vendredi 13 (ruptures) ","d":"2025-02-07","f":"2025-02-16","cat":"Hygiène/Soin","cmd":true,"act":true,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":9,"m":"Mars","t":"Popote : OP Légumes (- 15 %) + Laits (- 20%) RI uniquement  pour 10 J\ndu 6 au 16 inclus - ss contrat","d":"2026-03-06","f":"2026-03-16","cat":"Bébé","cmd":true,"act":true,"caA":639.94,"caO":3001.03,"ev":"3,914","roi":"5,05x","fb":"le ratio cout/vol pour les gourdes à - 15% c'est optimal le cout en remise est minime mais génère le gros de la promo. P","cm":"Gain incrémental net de + 2504,88 €,les gourdes assurent le volume (bien que + cmdés suite a plusieurs commandes envoyée","activ":""},{"i":10,"m":"Mars","t":"TERROIR DU LIBAN : OP avec la marque JANA MEZZE de 14 j du lu 23 mars au lu 6 avril \nmécanique : - 2","d":"2026-03-23","f":"2026-04-06","cat":"Épicerie salée","cmd":true,"act":true,"caA":NaN,"caO":784.46,"ev":"","roi":"4","fb":"","cm":"gain correcte pour une gamme presque niche, a voir si les clients reviendrons sur la marque au retour des pvc normaux","activ":""},{"i":11,"m":"Mars","t":"SUPER NATURE: RI -15% sur les Granolas et Mueslis du 2 au 12 avril inclus","d":"2026-04-02","f":"2026-04-12","cat":"BIO - Épicerie sucrée","cmd":true,"act":true,"caA":631.13,"caO":null,"ev":"","roi":"3,8x","fb":"sécuriser appro à l'avenir.\nOk pour reconduite au vu du potentiel ","cm":"très bon gain net, aurait pu être encore meilleur si il n'y avait pas eu de rupture d'appro (arret du granola fruits rou","activ":""},{"i":12,"m":"Avril","t":"CELNAT : Les graines à - 20% du 10 au 19 avril ","d":"2026-04-10","f":"2026-04-19","cat":"Épicerie salée","cmd":false,"act":true,"caA":335.65,"caO":1003.4,"ev":" + 198,9","roi":"4","fb":"première opé avec un libellé interressant avec le \" craquez pour les graines..\" un impact marketing qui a su aussi faire","cm":"par rapport au cout de promo, le gain net est excellent + 800€ \nl'opé a joué en boostant les bestsellers et en rayonneme","activ":""},{"i":13,"m":"Avril","t":"KOOK'S : 20 % sur les formats LOT DE 2x75G et 10 % sur les formats 75G individuels","d":"2026-04-13","f":"2026-04-26","cat":"Frais","cmd":true,"act":true,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":14,"m":"Avril","t":"EAST GOURMET : -20% sur la gamme","d":"2026-04-16","f":"2026-04-30","cat":"Frais","cmd":true,"act":true,"caA":554.65,"caO":1805.18,"ev":"225,46 %","roi":"","fb":"","cm":"","activ":""},{"i":15,"m":"Avril","t":"ELO IN HAIRE CARE 20 26 AVRIL","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":16,"m":"Avril","t":"MYMOSA TBC ELO + ","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":17,"m":"Mai","t":"OCEAN KISS : Saumons végétaux à -20%","d":"2026-05-05","f":"2026-05-19","cat":"Frais","cmd":true,"act":true,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":18,"m":"Mai","t":"Hédène: OP miels 10 jours avec RI / Offre à l'achat, pas besoin de refacturer","d":"2026-05-04","f":"2026-05-14","cat":"Épicerie sucrée","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":19,"m":"Mai","t":"HAPPYVORE : Nouveautés à -30%","d":"2026-05-11","f":"2026-05-17","cat":"Frais","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":20,"m":"Mai","t":"BAOUW -20% sur toute la gamme pendant 15 jours ","d":"2026-05-11","f":"2026-05-25","cat":"Nutrition sportive","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":21,"m":"Mai","t":"JHO : OP Maternité - 20% ","d":"2025-05-23","f":"2025-06-01","cat":"Hygiène/Soin","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":22,"m":"Mai","t":"PANIER DES SENS : - 20 % du 22 au 31 mai (assortiment tbc) ","d":"2026-05-22","f":"2026-05-31","cat":"Hygiène/Soin","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":23,"m":"Mai","t":"CELNAT : LES MUESLIS (dont innovations)\nMécanique :  - 20 % du 29 mai au 7 juin ","d":"2026-05-29","f":"2026-06-07","cat":"Épicerie sucrée","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":24,"m":"Juin","t":"Epycure : OP Nouveautés electrolytes, gamme solaire et + a confirmer\nMécanique : - 20% \ncréneau : du","d":"2026-06-05","f":"2026-06-14","cat":"Beauté","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":25,"m":"Juin","t":"GOXOA : mécanique B1G2nd- 50 % sur toute la gamme \n(3 refs comme opé de janvier) ","d":"2026-06-05","f":"2026-06-14","cat":"Cave sans alcool","cmd":true,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":26,"m":"Juin","t":"VITAGERMINE : OP food babybio / Laits / cool fruits \nMécanique - 20 % pdt 10 j \ndu v. 12 Juin au 22 ","d":"2026-06-12","f":"2026-06-22","cat":"Bébé","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":27,"m":"Juin","t":"SUPERNATURE : OP barres de céréales \nmécanique : -15%\ndu v. 12 juin au dimanche 21 juin inclus.","d":"2026-06-12","f":"2026-06-21","cat":"BIO - Épicerie sucrée","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":28,"m":"Juin","t":"MAZETE THEME APERO DATE TBC ","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":29,"m":"Juin","t":"POPOTE: OP fruits + petits plats -> Mécanique à 15% de RI (p-e a revoir) \npossibilité de ne pas opér","d":"2026-07-02","f":"2026-07-12","cat":"Bébé","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":30,"m":"Aout","t":"POPOTE : OP Rentrée toute le catalogue pour - 15 % RI sur la gamme AI + 20 % sur la gamme lait\ndu v.","d":"2026-09-04","f":"2026-09-14","cat":"Bébé","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":31,"m":"Septembre","t":"VITAGERMINE : OP food babybio / Laits / cool fruits avec mécanique - 25 % pdt 10 j \ndu v.18 au 28 se","d":"2026-09-18","f":"2026-09-28","cat":"Bébé","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":32,"m":"Octobre","t":"EPYCURE : OP avec gamme a confirmer \nMécanique : - 20 % ","d":"2026-10-09","f":"2026-10-18","cat":"Beauté","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":33,"m":"Novembre","t":"POPOTE : RI sur Brassés + lait -> 15% alimentation / 20% lait pour 10 j \ndu v. 13 au lundi 23 ","d":"2026-11-13","f":"2026-11-23","cat":"Bébé","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":34,"m":"Décembre","t":"ERIC BUR","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":35,"m":"Décembre","t":"1 OP avec un taux promotionnel de 15 % sur une sélection de produits du monde lors de la Coupe de Mo","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":36,"m":"Décembre","t":"1 OP avec un taux promotionnel de 15 % sur une sélection des produits de la gamme Eric BUR lors des ","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":37,"m":"Décembre","t":"FUNKI VEGGIE EN SEPTEMBRE granola porridge etc","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":38,"m":"Décembre","t":"TERROIR DU LIBAN","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""},{"i":39,"m":"Décembre","t":"KORRES","d":"","f":"","cat":"","cmd":false,"act":false,"caA":NaN,"caO":NaN,"ev":"","roi":"","fb":"","cm":"","activ":""}];

const MOIS_ORDER=["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];

const CALENDAR=[
  {mois:"Janvier",tf:"Galette des Rois, Détox, Dry January",act:"haute"},
  {mois:"Fevrier",tf:"Chandeleur, St-Valentin",act:"moyenne"},
  {mois:"Mars",tf:"Printemps, Pâques (prep)",act:"haute"},
  {mois:"Avril",tf:"Pâques, Ménage printemps",act:"haute"},
  {mois:"Mai",tf:"Fête des mères, BBQ",act:"haute"},
  {mois:"Juin",tf:"Fête des pères, Été",act:"haute"},
  {mois:"Juillet",tf:"Pause estivale",act:"basse"},
  {mois:"Aout",tf:"Reprise dernier WK",act:"basse"},
  {mois:"Septembre",tf:"Rentrée, Reprise forte",act:"tres_haute"},
  {mois:"Octobre",tf:"Halloween, Automne",act:"haute"},
  {mois:"Novembre",tf:"Black Friday, Beaujolais",act:"haute"},
  {mois:"Décembre",tf:"Noël, Réveillon",act:"tres_haute"},
];

const SUGGESTIONS=[
  {categ:"Boissons sans alcool",raison:"Pic saisonnier juin — segment en croissance +12% vs N-1",meca:"Lot de 2 -20%",marques:"Oasis, Ice Tea, Tropicana",prio:"haute",periode:"Juin"},
  {categ:"Glaces",raison:"Lancement saison été — 0 opé planifiée vs 3 chez Monoprix",meca:"2ème à -50%",marques:"Häagen-Dazs, Magnum, Ben & Jerry's",prio:"haute",periode:"Juin"},
  {categ:"Biscuits apéritifs",raison:"BBQ / apéro saison — forte demande",meca:"Lot 3 pour 2",marques:"Lay's, Pringles, Belin",prio:"haute",periode:"Mai-Juin"},
  {categ:"Petit-déjeuner",raison:"Rentrée scolaire — historiquement meilleur ROI",meca:"-20% RI",marques:"Kellogg's, Nestlé, Lu",prio:"haute",periode:"Septembre"},
  {categ:"Entretien maison",raison:"Ménage de printemps — sous-promu",meca:"2ème à -60%",marques:"Ariel, Skip, Mr Propre",prio:"moyenne",periode:"Mars-Avril"},
];

const LEGAL=[
  {titre:"Seuil de Revente à Perte (SRP)",ref:"Art. L.442-2 Code de commerce",detail:"Interdit de revendre sous le prix d'achat effectif. SRP+10% (EGAlim 2) pour denrées alimentaires."},
  {titre:"Encadrement promotions",ref:"Loi EGAlim 2 — Art. L.441-4",detail:"Avantages promo ne peuvent excéder 34% de la valeur. Promos en valeur plafonnées à 25% du CA prévisionnel."},
  {titre:"NIP",ref:"Accord interprofessionnel",detail:"Bons de réduction et ODR non soumis au plafond 34% mais doivent respecter le SRP."},
  {titre:"Mentions obligatoires",ref:"Art. L.112-1 Code conso",detail:"Prix barré = prix le + bas des 30 derniers jours, durée de l'offre, conditions."},
  {titre:"Vente par lot",ref:"Art. L.121-11 Code conso",detail:"Chaque produit doit être vendu séparément. Prix du lot < somme des prix unitaires."},
  {titre:"Délais paiement",ref:"Art. L.441-10 Code commerce",detail:"60j date facture ou 45j fin de mois. Alimentaire périssable: 30j max."},
];

function Badge({label,color,bg}){return <span style={{fontSize:11.5,padding:"2px 8px",borderRadius:999,fontWeight:500,background:bg||(color+"18"),color}}>{label}</span>;}
function KPI({label,value,sub,subColor}){return<div style={{...crd,padding:"16px 20px",flex:"1 1 140px",minWidth:130}}><div style={{fontSize:12,color:V.muted,fontWeight:500,marginBottom:8}}>{label}</div><div style={{fontFamily:DISP,fontWeight:600,fontSize:26,letterSpacing:"-.03em",color:V.ink,lineHeight:1.1}}>{value}</div>{sub&&<div style={{fontSize:12,color:subColor||V.muted,fontWeight:500,marginTop:6}}>{sub}</div>}</div>;}
function Pill({children,active,onClick,badge}){return<button onClick={onClick} style={{padding:"8px 14px",borderRadius:999,border:active?0:"1px solid "+V.line,cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:BODY,background:active?V.ink:V.surface,color:active?V.bg:V.ink2,display:"flex",alignItems:"center",gap:6}}>{children}{badge&&<span style={{fontSize:10.5,background:active?"rgba(255,255,255,.2)":V.negSoft,color:active?"#fff":V.neg,padding:"1px 6px",borderRadius:999,fontWeight:600}}>{badge}</span>}</button>;}

function LegalPanel({show,onClose}){
  if(!show)return null;
  return <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(20,18,12,.18)",backdropFilter:"blur(2px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}} onClick={onClose}>
    <div onClick={function(e){e.stopPropagation();}} style={{...crd,width:600,maxHeight:"85vh",overflowY:"auto",padding:28,boxShadow:"0 4px 24px rgba(20,18,12,.12)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:24}}><h2 style={{fontFamily:DISP,fontWeight:600,fontSize:18,margin:0}}>Références Légales Commerce</h2><button onClick={onClose} style={{background:"none",border:"none",fontSize:20,color:V.muted,cursor:"pointer"}}>✕</button></div>
      {LEGAL.map(function(l,i){return <div key={i} style={{padding:"16px 0",borderBottom:i<LEGAL.length-1?"1px solid "+V.line:"none"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}><div style={{fontSize:14,fontWeight:600,color:V.ink}}>{l.titre}</div><Badge label={l.ref} color={V.blue}/></div>
        <div style={{fontSize:13,color:V.muted,lineHeight:1.6}}>{l.detail}</div>
      </div>;})}
    </div>
  </div>;
}

function TradeTab(){
  var [sub,setSub]=useState("dashboard");
  var [promos,setPromos]=useState(PROMOS);
  var [selOp,setSelOp]=useState(null);
  var [showForm,setShowForm]=useState(false);
  var [showLegal,setShowLegal]=useState(false);
  var [newOp,setNewOp]=useState({m:"",t:"",d:"",f:"",cat:"",cmd:false,act:false,caA:"",caO:"",ev:"",roi:"",fb:"",cm:""});

  var actives=promos.filter(function(p){return p.act;});
  var withCA=promos.filter(function(p){return p.caO;});
  var cats=[...new Set(promos.map(function(p){return p.cat;}).filter(Boolean))];

  function addOp(){
    var op={...newOp,i:promos.length,caA:newOp.caA?parseFloat(newOp.caA):null,caO:newOp.caO?parseFloat(newOp.caO):null};
    setPromos([...promos,op]);
    setShowForm(false);
    setNewOp({m:"",t:"",d:"",f:"",cat:"",cmd:false,act:false,caA:"",caO:"",ev:"",roi:"",fb:"",cm:""});
  }

  var tabs=[{k:"dashboard",l:"Dashboard"},{k:"planning",l:"Planning"},{k:"performance",l:"Performance"},{k:"suggestions",l:"Suggestions d'opés"},{k:"mails",l:"Veille Mails"},{k:"facturation",l:"Facturation"}];

  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
      <div style={{display:"flex",gap:4,background:V.surface,borderRadius:999,padding:4,border:"1px solid "+V.line,flexWrap:"wrap"}}>
        {tabs.map(function(t){return <Pill key={t.k} active={sub===t.k} onClick={function(){setSub(t.k);setSelOp(null);}}>{t.l}</Pill>;})}
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={function(){setShowLegal(true);}} style={{height:34,padding:"0 14px",borderRadius:8,border:"1px solid "+V.blue,background:V.blueSoft,color:V.blue,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:BODY}}>Réf. légales</button>
        <button onClick={function(){setShowForm(true);}} style={{height:34,padding:"0 16px",borderRadius:8,border:0,background:V.accent,color:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:BODY}}>+ Nouvelle opé</button>
      </div>
    </div>

    {/* DASHBOARD */}
    {sub==="dashboard"&&<div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
        <KPI label="Opés actives" value={actives.length}/>
        <KPI label="Total 2026" value={promos.length}/>
        <KPI label="Avec résultats" value={withCA.length}/>
        <KPI label="Catégories" value={cats.length}/>
      </div>
      <div style={{...crd,padding:20,marginBottom:20}}>
        <div style={{fontFamily:DISP,fontWeight:600,fontSize:14,marginBottom:16}}>Dernières opérations</div>
        {promos.slice(0,8).map(function(op,j){
          var roiC=!op.roi?"":parseFloat(op.roi)>=3?V.pos:parseFloat(op.roi)>=1.5?V.warn:V.neg;
          return <div key={j} onClick={function(){setSub("planning");setSelOp(op);}} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:6,marginBottom:4,cursor:"pointer",border:"1px solid transparent"}}
            onMouseEnter={function(e){e.currentTarget.style.background="rgba(0,0,0,.02)";e.currentTarget.style.borderColor=V.line;}}
            onMouseLeave={function(e){e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:op.act?V.pos:op.d?V.muted:V.warn,flexShrink:0}}/>
            <span style={{flex:1,fontSize:13,color:V.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{op.t.slice(0,65)}</span>
            {op.cat&&<Badge label={op.cat} color={V.blue}/>}
            {op.roi&&<span style={{fontFamily:MONO,fontSize:11,color:roiC,fontWeight:600}}>{op.roi}x</span>}
          </div>;
        })}
      </div>
    </div>}

    {/* PLANNING */}
    {sub==="planning"&&!selOp&&<div>
      {MOIS_ORDER.map(function(mois){
        var ops=promos.filter(function(p){return p.m===mois;});
        if(!ops.length)return null;
        return <div key={mois} style={{marginBottom:28}}>
          <div style={{fontFamily:DISP,fontWeight:600,fontSize:16,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>{mois}<Badge label={ops.length+" opé"+(ops.length>1?"s":"")} color={V.muted}/></div>
          {ops.map(function(op,j){
            var hasData=op.caO!==null;
            var roiC=!op.roi?"":parseFloat(op.roi)>=3?V.pos:parseFloat(op.roi)>=1.5?V.warn:V.neg;
            return <div key={j} onClick={function(){setSelOp(op);}} style={{...crd,padding:"16px 20px",marginBottom:8,borderLeft:op.act?"3px solid "+V.pos:op.d?"3px solid "+V.warn:"3px solid "+V.line,cursor:"pointer"}}
              onMouseEnter={function(e){e.currentTarget.style.background="rgba(0,0,0,.01)";}}
              onMouseLeave={function(e){e.currentTarget.style.background=V.surface;}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13.5,fontWeight:600,color:V.ink,lineHeight:1.4}}>{op.t.split('\n')[0]}</div>
                  <div style={{display:"flex",gap:8,marginTop:6,flexWrap:"wrap"}}>
                    {op.cat&&<Badge label={op.cat} color={V.blue}/>}
                    {op.d&&<span style={{fontSize:11.5,color:V.muted}}>{op.d} → {op.f}</span>}
                    {op.cmd&&<Badge label="Cmd OK" color={V.pos} bg={V.posSoft}/>}
                    {op.act&&<Badge label="Active" color={V.pos} bg={V.posSoft}/>}
                    {!op.act&&op.d&&<Badge label="Terminée" color={V.muted}/>}
                    {!op.act&&!op.d&&<Badge label="À planifier" color={V.warn} bg={V.warnSoft}/>}
                  </div>
                </div>
                {hasData&&<div style={{display:"flex",gap:16,flexShrink:0}}>
                  {op.ev&&<div style={{textAlign:"center"}}><div style={{fontSize:10,color:V.muted}}>Évol.</div><div style={{fontFamily:MONO,fontSize:13,fontWeight:600,color:V.pos}}>{op.ev}</div></div>}
                  {op.roi&&<div style={{textAlign:"center"}}><div style={{fontSize:10,color:V.muted}}>ROI</div><div style={{fontFamily:MONO,fontSize:13,fontWeight:600,color:roiC}}>{op.roi}x</div></div>}
                </div>}
              </div>
              {hasData&&<div style={{display:"flex",gap:20,fontSize:12,color:V.ink2,marginTop:6}}>
                <span>CA avant: <strong style={{fontFamily:MONO}}>{op.caA?op.caA.toFixed(0)+"€":"—"}</strong></span>
                <span>CA opé: <strong style={{fontFamily:MONO,color:V.pos}}>{op.caO.toFixed(0)}€</strong></span>
              </div>}
              {op.fb&&<div style={{fontSize:12,color:V.muted,marginTop:6,fontStyle:"italic"}}>💬 {op.fb.split('\n')[0].slice(0,100)}</div>}
            </div>;
          })}
        </div>;
      })}
    </div>}

    {/* DETAIL OPÉ */}
    {sub==="planning"&&selOp&&<div>
      <button onClick={function(){setSelOp(null);}} style={{background:"none",border:"none",color:V.accent,fontSize:13,cursor:"pointer",fontWeight:600,marginBottom:16,fontFamily:BODY}}>← Retour au planning</button>
      <div style={{...crd,padding:"24px 28px",marginBottom:20}}>
        <h3 style={{fontFamily:DISP,fontWeight:600,fontSize:18,margin:0,letterSpacing:"-.02em"}}>{selOp.t.split('\n')[0]}</h3>
        <p style={{fontSize:13,color:V.muted,margin:"8px 0 0"}}>{selOp.cat} · {selOp.d||"Dates à définir"} {selOp.f?"→ "+selOp.f:""}</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <div style={{...crd,padding:"20px 24px"}}>
          <div style={{fontFamily:DISP,fontWeight:600,fontSize:14,marginBottom:14}}>Résultats</div>
          {[{l:"CA avant promo",v:selOp.caA?selOp.caA.toFixed(2)+"€":"—"},{l:"CA pendant opé",v:selOp.caO?selOp.caO.toFixed(2)+"€":"—",c:V.pos},{l:"Évolution CA",v:selOp.ev||"—",c:V.pos},{l:"ROI",v:selOp.roi?selOp.roi+"x":"—",c:parseFloat(selOp.roi)>=3?V.pos:parseFloat(selOp.roi)>=1.5?V.warn:V.neg}].map(function(f,i){
            return <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?"1px solid "+V.line:"none"}}>
              <span style={{fontSize:13,color:V.muted}}>{f.l}</span>
              <span style={{fontSize:14,fontWeight:600,color:f.c||V.ink,fontFamily:MONO}}>{f.v}</span>
            </div>;
          })}
        </div>
        <div style={{...crd,padding:"20px 24px"}}>
          <div style={{fontFamily:DISP,fontWeight:600,fontSize:14,marginBottom:14}}>Statut</div>
          {[{l:"Commande envoyée",ok:selOp.cmd},{l:"Promo active",ok:selOp.act},{l:"Catégorie",v:selOp.cat||"—"},{l:"Mois",v:selOp.m}].map(function(f,i){
            return <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<3?"1px solid "+V.line:"none"}}>
              <span style={{fontSize:13,color:V.muted}}>{f.l}</span>
              {f.ok!==undefined?<span style={{color:f.ok?V.pos:V.neg,fontWeight:600}}>{f.ok?"✓ Oui":"✕ Non"}</span>:<span style={{fontSize:13,color:V.ink}}>{f.v}</span>}
            </div>;
          })}
        </div>
      </div>
      {selOp.fb&&<div style={{...crd,padding:"20px 24px",marginBottom:16}}>
        <div style={{fontFamily:DISP,fontWeight:600,fontSize:14,marginBottom:10}}>Feedback</div>
        <div style={{fontSize:13,color:V.ink,lineHeight:1.6}}>{selOp.fb}</div>
      </div>}
      {selOp.cm&&<div style={{...crd,padding:"20px 24px"}}>
        <div style={{fontFamily:DISP,fontWeight:600,fontSize:14,marginBottom:10}}>Commentaires</div>
        <div style={{fontSize:13,color:V.ink,lineHeight:1.6}}>{selOp.cm}</div>
      </div>}
    </div>}

    {/* PERFORMANCE */}
    {sub==="performance"&&<div>
      <div style={{...crd,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
          <thead><tr style={{borderBottom:"1px solid "+V.line}}>
            {["Opération","Catégorie","CA avant","CA opé","Évol.","ROI","Statut"].map(function(h){
              return <th key={h} style={{padding:"10px 10px",textAlign:"left",color:V.muted,fontSize:11,fontWeight:500,textTransform:"uppercase",background:V.bg,position:"sticky",top:0}}>{h}</th>;})}
          </tr></thead>
          <tbody>{promos.filter(function(p){return p.caO;}).sort(function(a,b){return(b.caO||0)-(a.caO||0);}).map(function(op,i){
            var roiV=parseFloat(op.roi)||0;var roiC=roiV>=3?V.pos:roiV>=1.5?V.warn:V.neg;
            return <tr key={i} style={{borderBottom:"1px solid "+V.line2,cursor:"pointer"}}
              onClick={function(){setSub("planning");setSelOp(op);}}
              onMouseEnter={function(e){e.currentTarget.style.background="rgba(0,0,0,.015)";}}
              onMouseLeave={function(e){e.currentTarget.style.background="transparent";}}>
              <td style={{padding:"10px",color:V.ink,fontWeight:500,maxWidth:280,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{op.t.split('\n')[0].slice(0,60)}</td>
              <td style={{padding:"10px"}}>{op.cat&&<Badge label={op.cat} color={V.blue}/>}</td>
              <td style={{padding:"10px",fontFamily:MONO}}>{op.caA?op.caA.toFixed(0)+"€":"—"}</td>
              <td style={{padding:"10px",fontFamily:MONO,fontWeight:600,color:V.pos}}>{op.caO.toFixed(0)}€</td>
              <td style={{padding:"10px",fontFamily:MONO,color:V.pos}}>{op.ev||"—"}</td>
              <td style={{padding:"10px"}}>{op.roi?<Badge label={op.roi+"x"} color={roiC}/>:"—"}</td>
              <td style={{padding:"10px"}}>{op.act?<Badge label="Active" color={V.pos} bg={V.posSoft}/>:<Badge label="Terminée" color={V.muted}/>}</td>
            </tr>;})}
          </tbody>
        </table>
      </div>
    </div>}

    {/* SUGGESTIONS */}
    {sub==="suggestions"&&<div>
      <div style={{fontSize:13,color:V.muted,marginBottom:20}}>Propositions basées sur la saisonnalité et les tendances marché.</div>
      {SUGGESTIONS.map(function(s,i){
        var prioC=s.prio==="haute"?V.neg:V.warn;
        return <div key={i} style={{...crd,padding:"20px 24px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
            <div><div style={{fontSize:15,fontWeight:600,color:V.ink}}>{s.categ}</div><div style={{fontSize:12,color:V.muted,marginTop:4}}>Période: {s.periode} · {s.marques}</div></div>
            <Badge label={"Priorité "+s.prio} color={prioC}/>
          </div>
          <div style={{fontSize:13,color:V.ink,lineHeight:1.5,marginBottom:10}}>{s.raison}</div>
          <Badge label={s.meca} color={V.accent}/>
        </div>;
      })}
    </div>}

    {/* VEILLE MAILS */}
    {sub==="mails"&&<div>
      <div style={{...crd,padding:"14px 20px",marginBottom:20}}>
        <div style={{fontSize:13,fontWeight:600,color:V.ink}}>Scan automatique du lundi</div>
        <div style={{fontSize:12,color:V.muted,marginTop:4}}>Détection : "promo", "opé", "promotion", "offre commerciale"</div>
      </div>
      <div style={{...crd,padding:20,textAlign:"center",color:V.muted}}>
        <span style={{fontSize:32}}>📬</span>
        <p style={{fontSize:14,marginTop:12}}>Connecte Gmail pour scanner tes mails automatiquement</p>
        <p style={{fontSize:12}}>Va dans les paramètres Claude → Connexions → Gmail</p>
      </div>
    </div>}

    {/* FACTURATION */}
    {sub==="facturation"&&<div>
      <div style={{fontSize:13,color:V.muted,marginBottom:20}}>Récap des opérations pour demande de facture à la compta.</div>
      {promos.filter(function(p){return p.caO&&!p.act;}).slice(0,10).map(function(op,i){
        return <div key={i} style={{...crd,padding:"20px 24px",marginBottom:14}}>
          <div style={{fontFamily:DISP,fontWeight:600,fontSize:14,marginBottom:12}}>{op.t.split('\n')[0].slice(0,60)}</div>
          <div style={{background:V.bg,borderRadius:6,padding:"16px 20px"}}>
            {[{l:"Catégorie",v:op.cat||"—"},{l:"Période",v:op.d&&op.f?"Du "+op.d+" au "+op.f:"—"},{l:"CA opération",v:op.caO?op.caO.toFixed(2)+" €":"—"},{l:"ROI",v:op.roi?op.roi+"x":"—"}].map(function(r,j){
              return <div key={j} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:j<3?"1px solid "+V.line:"none"}}>
                <span style={{fontSize:13,color:V.muted}}>{r.l}</span>
                <span style={{fontSize:13,fontWeight:600,color:V.ink,fontFamily:MONO}}>{r.v}</span>
              </div>;
            })}
          </div>
        </div>;
      })}
    </div>}

    {/* CALENDRIER inline in planning via calendar sub-tab would be too much, let's add it to dashboard */}

    {/* FORM */}
    {showForm&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(20,18,12,.18)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}} onClick={function(){setShowForm(false);}}>
      <div onClick={function(e){e.stopPropagation();}} style={{...crd,width:540,maxHeight:"85vh",overflowY:"auto",padding:28,boxShadow:"0 4px 24px rgba(20,18,12,.12)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}><h3 style={{fontFamily:DISP,fontWeight:600,fontSize:18,margin:0}}>Nouvelle opération</h3><button onClick={function(){setShowForm(false);}} style={{background:"none",border:"none",fontSize:20,color:V.muted,cursor:"pointer"}}>✕</button></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          {[{l:"Mois",k:"m",ph:"Mai"},{l:"Description",k:"t",ph:"DANONE -20% ultra-frais"},{l:"Date début",k:"d",ph:"2026-06-01"},{l:"Date fin",k:"f",ph:"2026-06-15"},{l:"Catégorie",k:"cat",ph:"Frais"},{l:"CA avant promo",k:"caA",ph:"1234.50"},{l:"CA opé",k:"caO",ph:"2500.00"},{l:"ROI",k:"roi",ph:"3.5"}].map(function(field){
            return <div key={field.k}><label style={{fontSize:12,color:V.muted,display:"block",marginBottom:4}}>{field.l}</label>
              <input value={newOp[field.k]||""} onChange={function(e){var u={...newOp};u[field.k]=e.target.value;setNewOp(u);}} placeholder={field.ph}
                style={{width:"100%",height:34,padding:"0 10px",borderRadius:6,border:"1px solid "+V.line,background:V.bg,fontSize:13,fontFamily:BODY,color:V.ink,outline:"none",boxSizing:"border-box"}}/></div>;})}
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:12,color:V.muted,display:"block",marginBottom:4}}>Feedback / commentaires</label>
          <textarea value={newOp.fb||""} onChange={function(e){setNewOp({...newOp,fb:e.target.value});}} rows={3} placeholder="Résultats, remarques..."
            style={{width:"100%",padding:"8px 10px",borderRadius:6,border:"1px solid "+V.line,background:V.bg,fontSize:13,fontFamily:BODY,color:V.ink,outline:"none",boxSizing:"border-box",resize:"vertical"}}/>
        </div>
        <div style={{display:"flex",gap:12,marginBottom:16}}>
          <label style={{fontSize:13,color:V.ink2,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}><input type="checkbox" checked={newOp.cmd} onChange={function(e){setNewOp({...newOp,cmd:e.target.checked});}}/>Commande OK</label>
          <label style={{fontSize:13,color:V.ink2,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}><input type="checkbox" checked={newOp.act} onChange={function(e){setNewOp({...newOp,act:e.target.checked});}}/>Active</label>
        </div>
        <button onClick={addOp} style={{width:"100%",height:38,borderRadius:8,border:0,background:V.accent,color:"#fff",fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:BODY}}>Ajouter l'opération</button>
      </div>
    </div>}

    <LegalPanel show={showLegal} onClose={function(){setShowLegal(false);}}/>
  </div>;
}

export default function App(){
  return <div style={{fontFamily:BODY,background:V.bg,color:V.ink,minHeight:"100vh",display:"grid",gridTemplateColumns:"220px 1fr",fontSize:14,lineHeight:1.45}}>
    <style>{"@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Inter:wght@400;450;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:10px;}::-webkit-scrollbar-thumb{background:"+V.line+";border-radius:10px;border:3px solid "+V.bg+";}"}</style>
    <aside style={{background:V.bg,borderRight:"1px solid "+V.line,display:"flex",flexDirection:"column",padding:"22px 14px 18px",gap:4}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"4px 8px 20px"}}>
        <div style={{width:28,height:28,borderRadius:7,background:V.ink,color:V.bg,display:"grid",placeItems:"center",fontFamily:DISP,fontWeight:600,fontSize:13}}>Lv</div>
        <div style={{fontFamily:DISP,fontWeight:600,fontSize:15}}>La belle <em style={{fontStyle:"italic",fontWeight:400,color:V.muted}}>vie</em></div>
      </div>
      {["Tableau de bord","Achats","Offre","Marketing","Trade MK","Categ Mgmt"].map(function(l,i){var isA=l==="Trade MK";
        return <button key={l} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",borderRadius:6,border:0,cursor:isA?"pointer":"default",textAlign:"left",width:"100%",background:isA?V.surface:"transparent",color:isA?V.ink:V.ink2,fontWeight:isA?500:450,fontSize:13.5,fontFamily:BODY,boxShadow:isA?"inset 0 0 0 1px "+V.line:"none",opacity:isA?1:0.4}}>{l}</button>;})}
      <div style={{flex:1}}/>
      <div style={{paddingTop:12,borderTop:"1px solid "+V.line,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:28,height:28,borderRadius:"50%",background:V.accentSoft,color:V.accent,display:"grid",placeItems:"center",fontWeight:600,fontSize:11}}>JM</div>
        <div><b style={{fontSize:12.5,fontWeight:500,display:"block"}}>Jess</b><span style={{fontSize:11,color:V.muted}}>Achats / Offre</span></div>
      </div>
    </aside>
    <main style={{display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <header style={{padding:"16px 28px",borderBottom:"1px solid "+V.line}}>
        <h1 style={{fontFamily:DISP,fontWeight:600,fontSize:22,letterSpacing:"-.025em",margin:0}}>Trade Marketing</h1>
        <p style={{fontSize:13,color:V.muted,margin:"6px 0 0"}}>Planification · Performance · Suggestions · Veille · Facturation</p>
      </header>
      <div style={{overflow:"auto",flex:1}}><div style={{padding:"28px 28px 64px",maxWidth:1400}}><TradeTab/></div></div>
    </main>
  </div>;
}
