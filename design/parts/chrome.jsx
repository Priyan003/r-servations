// Top navigation + footer
const { useState, useEffect } = React;

function Wordmark({ size = 22 }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("nav:home")); }}
       style={{ display: "inline-flex", alignItems: "baseline", gap: 8, color: "var(--ink)", textDecoration: "none" }}>
      <span style={{
        fontFamily: "var(--display)",
        fontSize: size, letterSpacing: "0.32em", textTransform: "uppercase",
      }}>Maison Élysées</span>
      <span style={{ width: 4, height: 4, background: "var(--gold-deep)", borderRadius: "50%", marginBottom: 4 }} />
    </a>
  );
}

function Ribbon({ show }) {
  if (!show) return null;
  return (
    <div style={{
      background: "var(--ink)", color: "var(--bg)",
      fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase",
      padding: "8px 0", textAlign: "center", overflow: "hidden", whiteSpace: "nowrap",
    }}>
      <span style={{ opacity: 0.6 }}>Paris</span>
      <span style={{ margin: "0 18px", opacity: 0.35 }}>·</span>
      <span>78 Avenue des Champs-Élysées</span>
      <span style={{ margin: "0 18px", opacity: 0.35 }}>·</span>
      <span style={{ opacity: 0.6 }}>Maison fondée en 1898</span>
      <span style={{ margin: "0 18px", opacity: 0.35 }}>·</span>
      <span style={{ color: "var(--gold)" }}>Palace · 5 étoiles</span>
    </div>
  );
}

function Nav({ onReserve, page }) {
  const items = [
    { id: "chambres", label: "Chambres & Suites" },
    { id: "restaurant", label: "Restaurant" },
    { id: "spa", label: "Spa" },
    { id: "evenements", label: "Événements" },
    { id: "histoire", label: "L'histoire" },
  ];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 30,
      background: "rgba(245,241,234,0.85)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--line-soft)",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto", padding: "18px 40px",
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 24,
      }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center", fontSize: 12, letterSpacing: "0.06em", color: "var(--ink-2)" }}>
          <button style={navLinkStyle}>FR <span style={{ opacity: 0.4 }}>/ EN</span></button>
          <button style={navLinkStyle}>+33 1 53 89 00 00</button>
        </div>
        <Wordmark />
        <nav style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 28 }}>
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} style={navLinkStyle}>{it.label}</a>
          ))}
          <button onClick={onReserve} style={{
            fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase",
            background: "var(--ink)", color: "var(--bg)", padding: "12px 22px",
            display: "inline-flex", alignItems: "center", gap: 10,
          }}>
            Réserver <Icon.arrow />
          </button>
        </nav>
      </div>
    </header>
  );
}
const navLinkStyle = {
  fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink-2)",
  textDecoration: "none", letterSpacing: "0.04em",
};

function Footer() {
  return (
    <footer style={{
      marginTop: 80,
      background: "var(--ink)", color: "var(--bg)",
      padding: "72px 40px 28px",
    }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 60,
          paddingBottom: 56, borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}>
          <div>
            <div style={{ fontFamily: "var(--display)", fontSize: 18, letterSpacing: "0.32em", textTransform: "uppercase" }}>
              Maison Élysées
            </div>
            <p style={{ fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.5, marginTop: 22, color: "rgba(255,255,255,0.7)", maxWidth: 360 }}>
              Une adresse parisienne, depuis 1898. Quatre-vingt-deux chambres entre l'Arc de Triomphe et la place de la Concorde.
            </p>
          </div>
          <FooterCol title="L'hôtel" items={["Les chambres", "Le restaurant", "Le spa", "Privatiser"]} />
          <FooterCol title="Visiter" items={["Champs-Élysées", "Galeries Lafayette", "Musée Jacquemart", "Plan & accès"]} />
          <FooterCol title="Contact" items={["+33 1 53 89 00 00", "contact@maison-elysees.fr", "78 avenue des Champs-Élysées", "75008 Paris"]} />
        </div>
        <div style={{
          paddingTop: 24, display: "flex", justifyContent: "space-between",
          fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
        }}>
          <span>© MMXXVI Maison Élysées</span>
          <span>Mentions légales · CGV · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold)" }}>
        {title}
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it) => (
          <li key={it} style={{ fontFamily: "var(--serif)", fontSize: 17, color: "rgba(255,255,255,0.85)" }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

// Page-level stepper shown on booking sub-pages
function Stepper({ step }) {
  const steps = ["Chambres", "Détail", "Vos informations", "Confirmation"];
  return (
    <div style={{
      maxWidth: 1440, margin: "0 auto", padding: "28px 40px 0",
      display: "flex", gap: 28, alignItems: "center",
      fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
    }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <span style={{
            color: i === step ? "var(--ink)" : "var(--muted)",
            display: "inline-flex", gap: 10, alignItems: "center",
          }}>
            <span style={{
              display: "inline-flex", justifyContent: "center", alignItems: "center",
              width: 22, height: 22, borderRadius: "50%",
              border: "1px solid " + (i <= step ? "var(--ink)" : "var(--line-soft)"),
              background: i < step ? "var(--ink)" : "transparent",
              color: i < step ? "var(--bg)" : "inherit",
              fontSize: 9,
            }}>{i < step ? "✓" : (i + 1).toString().padStart(2, "0")}</span>
            {s}
          </span>
          {i < steps.length - 1 && <span style={{ flex: 1, height: 1, background: "var(--line-soft)" }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

Object.assign(window, { Nav, Ribbon, Footer, Wordmark, Stepper });
