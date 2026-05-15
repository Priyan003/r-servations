// Room detail page

function RoomDetail({ room, search, setSearch, onBack, onContinue }) {
  const [rate, setRate] = React.useState("flex");
  const [extras, setExtras] = React.useState({ breakfast: true, transfer: false, champagne: false });
  const nights = nightsBetween(search.arrival, search.departure) || 2;

  const rateMultiplier = rate === "flex" ? 1 : rate === "prepaid" ? 0.88 : 1.06;
  const baseTotal = room.price * nights * rateMultiplier;
  const extrasTotal =
    (extras.breakfast ? 38 * search.adults * nights : 0) +
    (extras.transfer ? 220 : 0) +
    (extras.champagne ? 180 : 0);
  const grand = baseTotal + extrasTotal;

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 40px 80px" }}>
      <button onClick={onBack} style={{
        fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
        color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}><Icon.arrow /></span>
        Retour aux chambres
      </button>

      <div style={{
        marginTop: 28,
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20,
      }}>
        <Photograph label={room.name.toLowerCase()} tone="warm" ratio="16 / 11" badge={room.tag} />
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 20 }}>
          <Photograph label="détail — bureau" tone="rose" ratio="auto" style={{ aspectRatio: "auto", height: "100%" }} />
          <Photograph label="salle de bain — marbre" tone="cream" ratio="auto" style={{ aspectRatio: "auto", height: "100%" }} />
        </div>
      </div>

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 80, alignItems: "start" }}>
        <div>
          <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
            {room.tag}
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: 88, lineHeight: 1, margin: "16px 0 0", letterSpacing: "-0.01em" }}>
            {room.name}
          </h1>
          <div style={{ marginTop: 16, display: "flex", gap: 32, flexWrap: "wrap", fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)" }}>
            <span>{room.sqm} m²</span>
            <span>{room.floor}</span>
            <span>{room.beds}</span>
            <span>Vue · {room.view}</span>
          </div>
          <p style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.55, marginTop: 28, color: "var(--ink-2)", maxWidth: 640 }}>
            {room.blurb}
          </p>

          <h3 style={{ fontFamily: "var(--display)", fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", marginTop: 48, marginBottom: 18 }}>
            Dans la chambre
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 32px" }}>
            {room.amenities.map((a) => (
              <li key={a} style={{ fontFamily: "var(--serif)", fontSize: 18, padding: "10px 0", borderBottom: "1px solid var(--line-soft)", display: "flex", alignItems: "center", gap: 12 }}>
                <Icon.check /> {a}
              </li>
            ))}
          </ul>

          <h3 style={{ fontFamily: "var(--display)", fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", marginTop: 56, marginBottom: 18 }}>
            Choisir un tarif
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            <RateRow
              id="prepaid"
              selected={rate === "prepaid"}
              onSelect={() => setRate("prepaid")}
              title="Tarif Non remboursable"
              desc="Paiement immédiat. Économisez 12 %. Aucune modification."
              price={Math.round(room.price * 0.88)}
            />
            <RateRow
              id="flex"
              selected={rate === "flex"}
              onSelect={() => setRate("flex")}
              title="Tarif Maison — Flexible"
              desc="Annulation gratuite jusqu'à 48 h avant l'arrivée. Paiement à l'hôtel."
              price={room.price}
              recommended
            />
            <RateRow
              id="signature"
              selected={rate === "signature"}
              onSelect={() => setRate("signature")}
              title="Tarif Signature — Petit-déjeuner inclus"
              desc="Petit-déjeuner servi en chambre. Surclassement selon disponibilité."
              price={Math.round(room.price * 1.06)}
            />
          </div>

          <h3 style={{ fontFamily: "var(--display)", fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", marginTop: 56, marginBottom: 18 }}>
            Composer votre séjour
          </h3>
          <div style={{ display: "grid", gap: 0 }}>
            <ExtraRow
              checked={extras.breakfast}
              onChange={(v) => setExtras({ ...extras, breakfast: v })}
              title="Petit-déjeuner — Le Pavillon"
              desc="Continental complet, viennoiseries Cyril Lignac. Servi de 7 h à 11 h."
              price={`38 € · par personne, par nuit`}
            />
            <ExtraRow
              checked={extras.transfer}
              onChange={(v) => setExtras({ ...extras, transfer: v })}
              title="Transfert aller-retour CDG"
              desc="Berline Maison Élysées, chauffeur en habit."
              price="220 € · forfait"
            />
            <ExtraRow
              checked={extras.champagne}
              onChange={(v) => setExtras({ ...extras, champagne: v })}
              title="Champagne d'accueil"
              desc="Une cuvée de récolte sélectionnée par le chef sommelier."
              price="180 € · bouteille"
            />
          </div>
        </div>

        <aside style={{
          position: "sticky", top: 100,
          background: "var(--paper)", border: "1px solid var(--line-soft)",
          padding: "32px 28px",
        }}>
          <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
            Votre séjour
          </div>
          <div style={{ marginTop: 16, fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.35 }}>
            <div>Arrivée · <span style={{ color: "var(--muted)" }}>{fmtDateLong(search.arrival)}</span></div>
            <div style={{ marginTop: 6 }}>Départ · <span style={{ color: "var(--muted)" }}>{fmtDateLong(search.departure)}</span></div>
          </div>
          <div style={{ marginTop: 6, fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)" }}>
            {nights} nuit{nights > 1 ? "s" : ""} · {search.adults} adulte{search.adults > 1 ? "s" : ""}{search.children > 0 ? ` · ${search.children} enfants` : ""}
          </div>

          <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--line-soft)", display: "grid", gap: 10 }}>
            <Line label={`${room.name} · ${nights} nuit${nights > 1 ? "s" : ""}`} value={`${baseTotal.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`} />
            {extras.breakfast && <Line label={`Petit-déjeuner · ${search.adults}p × ${nights}n`} value={`${(38 * search.adults * nights).toLocaleString("fr-FR")} €`} sub />}
            {extras.transfer && <Line label="Transfert CDG" value="220 €" sub />}
            {extras.champagne && <Line label="Champagne d'accueil" value="180 €" sub />}
            <Line label="Taxe de séjour" value="incluse" sub />
          </div>

          <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>Total</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 40, lineHeight: 1 }}>
              {grand.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} <span style={{ fontSize: 20, color: "var(--muted)" }}>€</span>
            </div>
          </div>

          <button onClick={() => onContinue({ room, rate, extras, baseTotal, extrasTotal, grand })} style={{
            marginTop: 24, width: "100%",
            background: "var(--ink)", color: "var(--bg)",
            fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
            padding: "18px 20px", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 12,
          }}>
            Continuer la réservation <Icon.arrow />
          </button>

          <div style={{ marginTop: 16, fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
            Annulation gratuite jusqu'au {fmtDateLong(addDays(search.arrival, -2))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function RateRow({ selected, onSelect, title, desc, price, recommended }) {
  return (
    <button onClick={onSelect} style={{
      textAlign: "left",
      display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 18,
      padding: "20px 22px",
      background: selected ? "var(--ink)" : "var(--paper)",
      color: selected ? "var(--bg)" : "var(--ink)",
      border: "1px solid " + (selected ? "var(--ink)" : "var(--line-soft)"),
      transition: "background 140ms ease, color 140ms ease",
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: "50%",
        border: "1px solid " + (selected ? "var(--bg)" : "var(--ink)"),
        background: selected ? "var(--bg)" : "transparent",
      }} />
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22, display: "flex", alignItems: "baseline", gap: 12 }}>
          {title}
          {recommended && (
            <span style={{
              fontFamily: "var(--display)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
              border: "1px solid " + (selected ? "var(--bg)" : "var(--gold-deep)"),
              color: selected ? "var(--bg)" : "var(--gold-deep)",
              padding: "3px 8px",
            }}>recommandé</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: selected ? "rgba(245,241,234,0.7)" : "var(--muted)", marginTop: 6 }}>{desc}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 24 }}>{price} €</div>
        <div style={{ fontFamily: "var(--display)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: selected ? "rgba(245,241,234,0.6)" : "var(--muted)", marginTop: 4 }}>
          par nuit
        </div>
      </div>
    </button>
  );
}

function ExtraRow({ checked, onChange, title, desc, price }) {
  return (
    <label style={{
      display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 18,
      padding: "20px 0", borderBottom: "1px solid var(--line-soft)", cursor: "pointer",
    }}>
      <span
        onClick={(e) => { e.preventDefault(); onChange(!checked); }}
        style={{
          width: 18, height: 18,
          border: "1px solid var(--ink)",
          background: checked ? "var(--ink)" : "transparent",
          color: "var(--bg)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
        {checked && <Icon.check />}
      </span>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{desc}</div>
      </div>
      <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)" }}>
        {price}
      </div>
    </label>
  );
}

function Line({ label, value, sub }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12,
      fontFamily: sub ? "var(--sans)" : "var(--serif)",
      fontSize: sub ? 13 : 17, color: sub ? "var(--muted)" : "var(--ink)",
    }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

Object.assign(window, { RoomDetail });
