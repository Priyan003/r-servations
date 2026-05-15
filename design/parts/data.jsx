// Room catalog and helpers

const ROOMS = [
  {
    id: "triomphe",
    name: "Chambre Triomphe",
    tag: "Classique",
    floor: "2e — 4e étage",
    sqm: 26,
    beds: "Lit Queen",
    view: "Cour intérieure pavée",
    price: 480,
    blurb:
      "Une chambre haussmannienne aux moulures conservées, ouvrant sur la cour fleurie. Parquet point de Hongrie, lin blanc, cheminée en marbre Carrare.",
    amenities: ["Lit king en option", "Marbre de Carrare", "Linge Yves Delorme", "Wi-Fi fibre", "Climatisation"],
    swatch: "#C9B89A",
  },
  {
    id: "faubourg",
    name: "Chambre Faubourg",
    tag: "Supérieure",
    floor: "3e — 5e étage",
    sqm: 32,
    beds: "Lit King",
    view: "Avenue des Champs-Élysées",
    price: 720,
    blurb:
      "Façade côté avenue, double exposition et balcon en fer forgé. Le théâtre de Paris en toile de fond, du matin au crépuscule.",
    amenities: ["Balcon Juliette", "Bain en îlot", "Mini-bar Maison", "Service couture", "Climatisation"],
    swatch: "#B89878",
  },
  {
    id: "elysee",
    name: "Suite Élysée",
    tag: "Suite signature",
    floor: "6e étage",
    sqm: 58,
    beds: "Lit King + salon",
    view: "Arc de Triomphe",
    price: 1340,
    blurb:
      "Notre suite signature, alignée sur la perspective Concorde — Arc. Salon en enfilade, secrétaire d'époque, baignoire face à la fenêtre.",
    amenities: ["Salon séparé", "Cheminée à éthanol", "Service majordome", "Champagne d'arrivée", "Petit-déjeuner"],
    swatch: "#9C7C5C",
  },
  {
    id: "concorde",
    name: "Pavillon Concorde",
    tag: "Appartement",
    floor: "Attique — 7e",
    sqm: 92,
    beds: "Deux chambres",
    view: "Terrasse panoramique",
    price: 2180,
    blurb:
      "L'appartement de l'attique. Deux chambres, salle à manger pour huit, et une terrasse de 40 m² qui regarde Paris s'allumer.",
    amenities: ["Terrasse 40 m²", "Cuisine privative", "Chef à domicile", "Conciergerie 24h", "Voiture & chauffeur"],
    swatch: "#7A5C3E",
  },
];

const AMENITIES_HOTEL = [
  ["Spa & hammam", "1 200 m² sous voûtes"],
  ["Restaurant étoilé", "Le Pavillon, 1*"],
  ["Bar à champagne", "78 cuvées de récolte"],
  ["Voiturier", "Service 24h / 24"],
  ["Conciergerie", "Membre Clefs d'Or"],
  ["Boutique fleuriste", "Au pied de l'hôtel"],
];

// Date helpers — purely client-side, no library
function fmtDate(d) {
  if (!d) return "";
  const months = ["janv", "févr", "mars", "avr", "mai", "juin", "juil", "août", "sept", "oct", "nov", "déc"];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}
function fmtDateLong(d) {
  if (!d) return "";
  const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}
function nightsBetween(a, b) {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((b - a) / 86400000));
}
function addDays(d, n) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}
function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Stylised placeholder "photograph" — striped tone with caption.
// Avoids any drawn imagery; reads as a photo slot.
function Photograph({ label, tone = "warm", ratio = "4 / 5", className = "", style = {}, badge }) {
  const tones = {
    warm:    ["#C9B89A", "#A98A66", "#6E5236"],
    cool:    ["#A9B0AE", "#7D8784", "#4E5856"],
    night:   ["#262320", "#3B3530", "#0E0E0C"],
    rose:    ["#D7BCB1", "#B58F84", "#6E4B43"],
    cream:   ["#EFE4D2", "#D6C5A8", "#9D8866"],
  };
  const [a, b, c] = tones[tone] || tones.warm;
  return (
    <div
      className={"photograph " + className}
      style={{
        position: "relative",
        aspectRatio: ratio,
        background: `linear-gradient(135deg, ${a} 0%, ${b} 55%, ${c} 100%)`,
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "repeating-linear-gradient(115deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 9px)," +
          "repeating-linear-gradient(25deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 14px)",
        mixBlendMode: "overlay",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.18), transparent 60%)",
      }} />
      <div style={{
        position: "absolute", left: 14, bottom: 12,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.78)",
        background: "rgba(0,0,0,0.22)", padding: "4px 8px", borderRadius: 2,
        backdropFilter: "blur(2px)",
      }}>
        photo · {label}
      </div>
      {badge && (
        <div style={{
          position: "absolute", right: 14, top: 14,
          fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.22em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(255,255,255,0.6)", padding: "6px 10px",
        }}>{badge}</div>
      )}
    </div>
  );
}

// Tiny inline icon set — strict geometric strokes only.
const Icon = {
  arrow: (p={}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  ),
  minus: (p={}) => (
    <svg width="10" height="10" viewBox="0 0 10 10" {...p}><path d="M2 5h6" stroke="currentColor" strokeWidth="1" /></svg>
  ),
  plus: (p={}) => (
    <svg width="10" height="10" viewBox="0 0 10 10" {...p}><path d="M5 2v6M2 5h6" stroke="currentColor" strokeWidth="1" /></svg>
  ),
  check: (p={}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M2 7.5l3 3L12 3" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  ),
  close: (p={}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}>
      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  cal: (p={}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="1.5" y="2.5" width="11" height="10" stroke="currentColor" strokeWidth="1" />
      <path d="M1.5 5.5h11M4 1v3M10 1v3" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  guest: (p={}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="7" cy="5" r="2.2" stroke="currentColor" strokeWidth="1" />
      <path d="M2 12c1.2-2.5 3-3.5 5-3.5s3.8 1 5 3.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
};

Object.assign(window, { ROOMS, AMENITIES_HOTEL, fmtDate, fmtDateLong, nightsBetween, addDays, sameDay, Photograph, Icon });
