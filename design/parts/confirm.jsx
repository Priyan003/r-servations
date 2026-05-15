// Confirmation screen — elegant printable summary

function Confirmation({ booking, search, guest, onHome }) {
  const ref = React.useMemo(() => "ELY-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.floor(1000 + Math.random() * 8999), []);
  const nights = nightsBetween(search.arrival, search.departure);
  const { room, rate, extras, grand } = booking;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px 100px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
          Réservation confirmée
        </div>
        <h1 style={{
          fontFamily: "var(--serif)", fontWeight: 300, fontSize: 96, lineHeight: 1.02, letterSpacing: "-0.01em",
          margin: "20px 0 0",
        }}>
          Bienvenue, <em style={{ fontStyle: "italic", color: "var(--gold-deep)" }}>{guest.firstName || "voyageur"}</em>.
        </h1>
        <p style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.5, color: "var(--ink-2)", marginTop: 22, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          Nous avons réservé la <strong style={{ fontWeight: 500 }}>{room.name.toLowerCase()}</strong> à votre attention. Un message
          de notre conciergerie vous attend à l'adresse <span style={{ color: "var(--ink)" }}>{guest.email}</span>.
        </p>
      </div>

      <div style={{
        marginTop: 56,
        background: "var(--paper)", border: "1px solid var(--line-soft)",
        padding: "44px 48px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 18, paddingBottom: 24, borderBottom: "1px solid var(--ink)" }}>
          <div>
            <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--muted)" }}>
              Numéro de dossier
            </div>
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 26, marginTop: 6, letterSpacing: "0.04em" }}>{ref}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Wordmark size={16} />
            <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>
              Paris · 78 av. des Champs-Élysées
            </div>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 36, marginTop: 36,
        }}>
          <DetailCol title="Arrivée">
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, lineHeight: 1 }}>{search.arrival?.getDate()}</div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 6 }}>{fmtDateLong(search.arrival)}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>Check-in dès 15h · {guest.arrivalTime}</div>
          </DetailCol>
          <DetailCol title="Départ">
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, lineHeight: 1 }}>{search.departure?.getDate()}</div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 6 }}>{fmtDateLong(search.departure)}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>Check-out jusqu'à 12h</div>
          </DetailCol>
          <DetailCol title="Séjour">
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, lineHeight: 1 }}>{nights}</div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 6 }}>nuit{nights > 1 ? "s" : ""}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
              {search.adults} adulte{search.adults > 1 ? "s" : ""}{search.children > 0 ? ` · ${search.children} enfants` : ""}
            </div>
          </DetailCol>
        </div>

        <div style={{
          marginTop: 44, paddingTop: 28, borderTop: "1px solid var(--line-soft)",
          display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 56,
        }}>
          <div>
            <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--muted)" }}>
              Votre chambre
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 40, margin: "10px 0 0", lineHeight: 1.05 }}>{room.name}</h3>
            <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginTop: 8 }}>
              {room.tag} · {room.sqm} m² · {room.beds} · Vue {room.view}
            </div>
            <p style={{ fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.55, marginTop: 14, color: "var(--ink-2)", maxWidth: 540 }}>
              {room.blurb}
            </p>
            <div style={{ marginTop: 22, fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)" }}>
              Tarif {rate === "flex" ? "flexible · annulation jusqu'au " + fmtDateLong(addDays(search.arrival, -2)) : rate === "prepaid" ? "non remboursable" : "signature"}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--muted)" }}>
              Total TTC
            </div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 80, lineHeight: 1, marginTop: 8, letterSpacing: "-0.01em" }}>
              {Math.round(grand).toLocaleString("fr-FR")} <span style={{ fontSize: 32, color: "var(--muted)" }}>€</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--muted)" }}>
              Empreinte de garantie. Aucun débit avant l'arrivée.
            </div>
            <div style={{ marginTop: 18, display: "grid", gap: 8 }}>
              {extras.breakfast && <Pill>Petit-déjeuner</Pill>}
              {extras.transfer && <Pill>Transfert CDG</Pill>}
              {extras.champagne && <Pill>Champagne d'accueil</Pill>}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14,
      }}>
        <ActionTile k="01" title="Préparer votre arrivée" desc="Indiquez vos préférences d'oreillers, type de petit-déjeuner et fleurs en chambre." />
        <ActionTile k="02" title="Réserver une table" desc="Le Pavillon · 1 étoile au guide. Réservez dès maintenant pour le soir de votre arrivée." />
        <ActionTile k="03" title="Demander la berline" desc="Notre conciergerie organise votre arrivée à l'aéroport ou en gare. Réponse en 2 h." />
      </div>

      <div style={{ marginTop: 56, textAlign: "center" }}>
        <button onClick={onHome} style={{
          fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 8,
          display: "inline-flex", alignItems: "center", gap: 12,
        }}>
          Retour à l'accueil <Icon.arrow />
        </button>
      </div>
    </div>
  );
}

function DetailCol({ title, children }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
        {title}
      </div>
      <div style={{ marginTop: 14 }}>{children}</div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: "8px 12px", background: "var(--bg-2)",
      fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
      color: "var(--ink-2)", alignSelf: "start",
    }}>
      <Icon.check /> {children}
    </div>
  );
}

function ActionTile({ k, title, desc }) {
  return (
    <button style={{
      textAlign: "left", padding: 28,
      background: "var(--paper)", border: "1px solid var(--line-soft)",
      display: "grid", gap: 14,
    }}>
      <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, color: "var(--gold-deep)", letterSpacing: "0.1em" }}>
        {k}
      </div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{desc}</div>
      <div style={{ marginTop: 6, fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 10 }}>
        Faire la demande <Icon.arrow />
      </div>
    </button>
  );
}

Object.assign(window, { Confirmation });
