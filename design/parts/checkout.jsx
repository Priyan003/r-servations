// Checkout / guest info / payment

function Checkout({ booking, search, onBack, onConfirm }) {
  const [form, setForm] = React.useState({
    title: "M.",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    arrivalTime: "16h00",
    request: "",
    card: "",
    cardName: "",
    expiry: "",
    cvc: "",
    save: true,
  });
  const [errors, setErrors] = React.useState({});

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function submit() {
    const e = {};
    if (!form.firstName) e.firstName = true;
    if (!form.lastName) e.lastName = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (form.phone.replace(/\D/g, "").length < 8) e.phone = true;
    if (form.card.replace(/\s/g, "").length < 12) e.card = true;
    if (!/^\d{2}\s?\/\s?\d{2}$/.test(form.expiry)) e.expiry = true;
    if (form.cvc.length < 3) e.cvc = true;
    setErrors(e);
    if (Object.keys(e).length === 0) onConfirm(form);
  }

  const { room, rate, extras, baseTotal, extrasTotal, grand } = booking;
  const nights = nightsBetween(search.arrival, search.departure);

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 40px 80px" }}>
      <button onClick={onBack} style={{
        fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
        color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}><Icon.arrow /></span>
        Retour à la chambre
      </button>

      <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 80 }}>
        <div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: 72, lineHeight: 1.02, letterSpacing: "-0.01em", margin: 0 }}>
            Vos <em style={{ fontStyle: "italic", color: "var(--gold-deep)" }}>informations</em>.
          </h1>
          <p style={{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.55, marginTop: 18, maxWidth: 580, color: "var(--ink-2)" }}>
            La carte sert d'empreinte de garantie. Le débit n'aura lieu qu'à votre arrivée.
          </p>

          <Section title="Identité">
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 16 }}>
              <Select label="Civilité" value={form.title} onChange={(v) => set("title", v)} options={["M.", "Mme", "Mx"]} />
              <Input label="Prénom" value={form.firstName} onChange={(v) => set("firstName", v)} error={errors.firstName} />
              <Input label="Nom" value={form.lastName} onChange={(v) => set("lastName", v)} error={errors.lastName} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <Input label="Adresse e-mail" value={form.email} onChange={(v) => set("email", v)} placeholder="vous@maison.fr" error={errors.email} />
              <Input label="Téléphone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+33 6 ..." error={errors.phone} />
            </div>
          </Section>

          <Section title="Préférences">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Select label="Heure d'arrivée estimée" value={form.arrivalTime} onChange={(v) => set("arrivalTime", v)} options={["14h00", "15h00", "16h00", "17h00", "18h00", "19h00", "20h00", "Après 20h00"]} />
              <Select label="Étage souhaité" value="indifférent" onChange={() => {}} options={["indifférent", "étage bas", "étage haut", "attique"]} />
            </div>
            <Textarea label="Une demande particulière ?" value={form.request} onChange={(v) => set("request", v)} placeholder="Anniversaire, anniversaire de mariage, allergies, fleurs en chambre…" />
          </Section>

          <Section title="Paiement">
            <div style={{ display: "flex", gap: 14, marginBottom: 18, fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)" }}>
              <span>Visa</span>
              <span>·</span>
              <span>Mastercard</span>
              <span>·</span>
              <span>Amex</span>
              <span>·</span>
              <span>Apple Pay</span>
            </div>
            <Input label="Titulaire de la carte" value={form.cardName} onChange={(v) => set("cardName", v)} placeholder="Comme inscrit sur la carte" />
            <div style={{ marginTop: 16 }}>
              <Input label="Numéro de carte" value={form.card} onChange={(v) => set("card", formatCard(v))} placeholder="•••• •••• •••• ••••" error={errors.card} mono />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <Input label="Expiration" value={form.expiry} onChange={(v) => set("expiry", formatExpiry(v))} placeholder="MM / AA" error={errors.expiry} mono />
              <Input label="Cryptogramme" value={form.cvc} onChange={(v) => set("cvc", v.replace(/\D/g, "").slice(0, 4))} placeholder="•••" error={errors.cvc} mono />
            </div>
            <label style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--muted)", cursor: "pointer" }}>
              <span onClick={() => set("save", !form.save)} style={{
                width: 16, height: 16, border: "1px solid var(--ink)",
                background: form.save ? "var(--ink)" : "transparent",
                color: "var(--bg)", display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>{form.save && <Icon.check />}</span>
              Mémoriser cette carte pour mes prochains séjours
            </label>
          </Section>

          <div style={{ marginTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <p style={{ fontSize: 12, color: "var(--muted)", maxWidth: 440, lineHeight: 1.6 }}>
              En confirmant, vous acceptez les conditions générales de la Maison Élysées
              et la politique de confidentialité. Aucun débit immédiat.
            </p>
            <button onClick={submit} style={{
              background: "var(--ink)", color: "var(--bg)",
              fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
              padding: "20px 32px", display: "inline-flex", alignItems: "center", gap: 14,
            }}>
              Confirmer la réservation <Icon.arrow />
            </button>
          </div>
        </div>

        <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
          <Photograph label={room.name.toLowerCase()} tone="warm" ratio="5 / 4" badge={room.tag} />
          <div style={{ background: "var(--paper)", border: "1px solid var(--line-soft)", borderTop: 0, padding: "26px 24px" }}>
            <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
              Récapitulatif
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 32, margin: "10px 0 0", lineHeight: 1.05 }}>
              {room.name}
            </h3>
            <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>
              {rate === "flex" ? "Tarif flexible" : rate === "prepaid" ? "Tarif non remboursable" : "Tarif signature"}
            </div>
            <div style={{
              marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--line-soft)",
              fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.5,
            }}>
              <div>Arrivée · <span style={{ color: "var(--muted)" }}>{fmtDateLong(search.arrival)}</span></div>
              <div style={{ marginTop: 4 }}>Départ · <span style={{ color: "var(--muted)" }}>{fmtDateLong(search.departure)}</span></div>
              <div style={{ marginTop: 4, fontSize: 14, color: "var(--muted)" }}>
                {nights} nuit{nights > 1 ? "s" : ""} · {search.adults} adulte{search.adults > 1 ? "s" : ""}{search.children > 0 ? ` · ${search.children} enfants` : ""}
              </div>
            </div>
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line-soft)", display: "grid", gap: 8 }}>
              <Line label={`Chambre × ${nights}`} value={`${Math.round(baseTotal).toLocaleString("fr-FR")} €`} />
              {extras.breakfast && <Line label="Petit-déjeuner" value={`${(38 * search.adults * nights).toLocaleString("fr-FR")} €`} sub />}
              {extras.transfer && <Line label="Transfert CDG" value="220 €" sub />}
              {extras.champagne && <Line label="Champagne d'accueil" value="180 €" sub />}
              <Line label="Taxe de séjour" value="incluse" sub />
            </div>
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase" }}>Total TTC</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 36, lineHeight: 1 }}>
                {Math.round(grand).toLocaleString("fr-FR")} <span style={{ fontSize: 18, color: "var(--muted)" }}>€</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid var(--line-soft)" }}>
      <div style={{ fontFamily: "var(--display)", fontSize: 12, letterSpacing: "0.32em", textTransform: "uppercase", marginBottom: 22 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, error, mono }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontFamily: "var(--display)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: error ? "var(--gold-deep)" : "var(--muted)", marginBottom: 8 }}>
        {label}{error && " · obligatoire"}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", border: "none", outline: "none",
          borderBottom: "1px solid " + (error ? "var(--gold-deep)" : "var(--ink)"),
          background: "transparent", padding: "10px 0",
          fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "var(--serif)",
          fontSize: mono ? 18 : 22, color: "var(--ink)",
        }}
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontFamily: "var(--display)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", border: "none", outline: "none",
          borderBottom: "1px solid var(--ink)", background: "transparent", padding: "10px 0",
          fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)",
          appearance: "none",
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Textarea({ label, value, onChange, placeholder }) {
  return (
    <label style={{ display: "block", marginTop: 16 }}>
      <div style={{ fontFamily: "var(--display)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }}>
        {label}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{
          width: "100%", border: "1px solid var(--line-soft)", outline: "none",
          background: "var(--paper)", padding: "14px 16px",
          fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)", resize: "vertical",
        }}
      />
    </label>
  );
}

function formatCard(v) {
  const digits = v.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length < 3) return d;
  return d.slice(0, 2) + " / " + d.slice(2);
}

Object.assign(window, { Checkout });
