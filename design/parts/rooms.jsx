// Rooms catalog grid + small surrounding sections
function RoomsSection({ search, onPick }) {
  const nights = nightsBetween(search.arrival, search.departure) || 2;
  return (
    <section id="chambres" style={{ maxWidth: 1440, margin: "0 auto", padding: "120px 40px 0" }}>
      <SectionHead
        eyebrow="Les chambres"
        title={<>Quatre-vingt-deux pièces, <em style={{ fontStyle: "italic", color: "var(--gold-deep)" }}>quatre catégories</em>.</>}
        body="De la chambre haussmannienne au pavillon d'attique. Toutes pensées par l'agence Sandra Benhamou, livrées en 2024."
      />
      <div style={{
        marginTop: 64,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 56,
      }}>
        {ROOMS.map((r, i) => (
          <RoomCard key={r.id} room={r} nights={nights} onPick={onPick} flip={i % 2 === 1} index={i} />
        ))}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, body }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "end" }}>
      <div>
        <div style={{
          fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase",
          color: "var(--gold-deep)", display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ width: 28, height: 1, background: "var(--gold-deep)" }} />
          {eyebrow}
        </div>
        <h2 style={{
          fontFamily: "var(--serif)", fontWeight: 300, fontSize: 72, lineHeight: 1.02,
          letterSpacing: "-0.01em", margin: "20px 0 0",
        }}>{title}</h2>
      </div>
      {body && (
        <p style={{
          fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)",
          maxWidth: 520, marginBottom: 8,
        }}>{body}</p>
      )}
    </div>
  );
}

const TONES = ["warm", "rose", "cream", "night"];

function RoomCard({ room, nights, onPick, flip, index }) {
  const tone = TONES[index % TONES.length];
  return (
    <article style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 0,
      background: "var(--paper)",
      border: "1px solid var(--line-soft)",
      position: "relative",
    }}>
      <Photograph label={room.name.toLowerCase()} tone={tone} ratio="16 / 11" badge={room.tag} />
      <div style={{ padding: "28px 28px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h3 style={{
            fontFamily: "var(--serif)", fontWeight: 400, fontSize: 38, margin: 0, lineHeight: 1.05,
          }}>{room.name}</h3>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 28, lineHeight: 1 }}>
              {room.price}<span style={{ fontSize: 16, color: "var(--muted)" }}> €</span>
            </div>
            <div style={{ fontFamily: "var(--display)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--muted)", marginTop: 4 }}>
              par nuit · TTC
            </div>
          </div>
        </div>
        <div style={{
          marginTop: 16,
          display: "flex", flexWrap: "wrap", gap: "0 24px",
          fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--muted)",
        }}>
          <span>{room.sqm} m²</span>
          <span>·</span>
          <span>{room.beds}</span>
          <span>·</span>
          <span>{room.view}</span>
        </div>
        <p style={{
          fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.55,
          color: "var(--ink-2)", marginTop: 18,
        }}>{room.blurb}</p>
        <div style={{
          marginTop: 22, paddingTop: 22, borderTop: "1px solid var(--line-soft)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            Total pour {nights} nuit{nights > 1 ? "s" : ""} · <span style={{ color: "var(--ink)", fontFamily: "var(--serif)", fontSize: 18 }}>{(room.price * nights).toLocaleString("fr-FR")} €</span>
          </div>
          <button onClick={() => onPick(room)} style={{
            fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", gap: 10, color: "var(--ink)",
            borderBottom: "1px solid var(--ink)", paddingBottom: 6,
          }}>
            Voir la chambre <Icon.arrow />
          </button>
        </div>
      </div>
    </article>
  );
}

function HouseSection() {
  return (
    <section id="histoire" style={{ maxWidth: 1440, margin: "0 auto", padding: "140px 40px 0" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 56, alignItems: "start",
      }}>
        <div>
          <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
            La maison
          </div>
          <h2 style={{
            fontFamily: "var(--serif)", fontWeight: 300, fontSize: 64, lineHeight: 1.02,
            margin: "20px 0 0", letterSpacing: "-0.01em",
          }}>
            Un hôtel particulier <em style={{ fontStyle: "italic", color: "var(--gold-deep)" }}>de 1898</em>.
          </h2>
          <p style={{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.55, marginTop: 28, color: "var(--ink-2)" }}>
            Construit pour l'Exposition Universelle, rénové en 2024 par l'agence
            Sandra Benhamou. Quatre-vingt-deux chambres, un restaurant étoilé,
            un spa sous voûtes, une terrasse qui regarde l'Arc.
          </p>
        </div>
        <div>
          <Photograph label="le pavillon — salle à manger" tone="rose" ratio="3 / 4" />
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {AMENITIES_HOTEL.map(([k, v], i) => (
              <div key={k} style={{
                display: "grid", gridTemplateColumns: "1fr auto", alignItems: "baseline",
                padding: "18px 0",
                borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--line-soft)",
                borderBottom: i === AMENITIES_HOTEL.length - 1 ? "1px solid var(--ink)" : "none",
              }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{k}</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--muted)" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AvenueStrip() {
  // A wide horizontal "perspective" strip that nods to the Champs-Élysées
  return (
    <section style={{ marginTop: 140 }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 8,
        }}>
          <Photograph label="arc de triomphe" tone="warm" ratio="3 / 4" />
          <Photograph label="grand palais" tone="cream" ratio="3 / 4" />
          <Photograph label="rue washington" tone="rose" ratio="3 / 4" />
          <Photograph label="parc monceau" tone="cool" ratio="3 / 4" />
          <Photograph label="opéra garnier" tone="night" ratio="3 / 4" />
        </div>
        <div style={{
          marginTop: 18, display: "flex", justifyContent: "space-between",
          fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--muted)",
        }}>
          <span>L'Étoile · 280 m</span>
          <span>Grand Palais · 600 m</span>
          <span>Rue de Washington · 80 m</span>
          <span>Parc Monceau · 12 min</span>
          <span>Opéra · 20 min</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { RoomsSection, HouseSection, AvenueStrip });
