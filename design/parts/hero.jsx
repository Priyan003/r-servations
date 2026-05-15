// Hero + search dock — entrypoint to booking
const { useState: useStateHero, useRef: useRefHero, useEffect: useEffectHero } = React;

function Hero({ layout, search, setSearch, onSearch }) {
  return (
    <section style={{ position: "relative" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "56px 40px 24px" }}>
        {layout === "fullbleed" ? <HeroFullBleed /> : layout === "stacked" ? <HeroStacked /> : <HeroEditorial />}
      </div>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
        <SearchDock search={search} setSearch={setSearch} onSearch={onSearch} />
      </div>
    </section>
  );
}

function MetaLine() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase",
      color: "var(--muted)",
    }}>
      <span style={{ width: 28, height: 1, background: "var(--gold-deep)" }} />
      <span>Hôtel particulier · 82 chambres</span>
      <span style={{ opacity: 0.3 }}>·</span>
      <span>5 étoiles</span>
    </div>
  );
}

function HeadingMain({ size = 132 }) {
  return (
    <h1 style={{
      fontFamily: "var(--serif)", fontWeight: 300,
      fontSize: size, lineHeight: 0.96, letterSpacing: "-0.02em",
      margin: "20px 0 0", color: "var(--ink)",
    }}>
      L'avenue,<br />
      <em style={{ fontStyle: "italic", color: "var(--gold-deep)" }}>vue depuis</em><br />
      vos fenêtres.
    </h1>
  );
}

function HeroEditorial() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "end",
      paddingBottom: 24,
    }}>
      <div style={{ paddingBottom: 28 }}>
        <MetaLine />
        <HeadingMain />
        <p style={{
          fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1.5,
          color: "var(--ink-2)", marginTop: 32, maxWidth: 480,
        }}>
          Quatre-vingt-deux chambres et suites entre la Concorde et l'Étoile.
          Une maison qui se vit comme un appartement parisien — avec la discrétion
          d'un grand hôtel.
        </p>
        <div style={{ display: "flex", gap: 28, marginTop: 36 }}>
          <Stat n="1898" l="Année de fondation" />
          <Stat n="01" l="Étoile au guide" />
          <Stat n="78" l="Avenue des Champs" />
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <Photograph label="façade — heure bleue" tone="warm" ratio="4 / 5" badge="Façade" />
        <div style={{ position: "absolute", left: -28, bottom: 28, width: 180 }}>
          <Photograph label="bar à champagne" tone="night" ratio="4 / 5" />
        </div>
      </div>
    </div>
  );
}

function HeroFullBleed() {
  return (
    <div style={{ position: "relative", height: 640 }}>
      <Photograph label="vue depuis la suite Élysée" tone="night" ratio="auto" style={{ position: "absolute", inset: 0, aspectRatio: "auto" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.55) 100%)" }} />
      <div style={{ position: "absolute", left: 56, top: 56, color: "#F5F1EA" }}>
        <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", opacity: 0.8 }}>
          Paris · 8e arrondissement
        </div>
      </div>
      <div style={{ position: "absolute", left: 56, bottom: 56, color: "#F5F1EA", maxWidth: 720 }}>
        <h1 style={{
          fontFamily: "var(--serif)", fontWeight: 300,
          fontSize: 120, lineHeight: 0.96, letterSpacing: "-0.02em", margin: 0,
        }}>
          L'avenue, <em style={{ fontStyle: "italic", color: "oklch(0.82 0.10 75)" }}>vue depuis</em> vos fenêtres.
        </h1>
      </div>
    </div>
  );
}

function HeroStacked() {
  return (
    <div>
      <MetaLine />
      <HeadingMain size={156} />
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
        <Photograph label="façade haussmannienne" tone="warm" ratio="16 / 9" />
        <Photograph label="suite — détail" tone="rose" ratio="16 / 9" />
        <Photograph label="le pavillon" tone="night" ratio="16 / 9" />
      </div>
    </div>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 300, lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>{l}</div>
    </div>
  );
}

// ---------- Search dock ----------

function SearchDock({ search, setSearch, onSearch }) {
  const [openField, setOpenField] = useStateHero(null);
  const nights = nightsBetween(search.arrival, search.departure);

  return (
    <div style={{ position: "relative", marginTop: 24, zIndex: 5 }}>
      <div style={{
        background: "var(--paper)", border: "1px solid var(--line-soft)",
        boxShadow: "var(--shadow)",
        display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1fr 1fr",
        alignItems: "stretch",
      }}>
        <Field label="Réserver une chambre" sublabel="Maison Élysées — Paris 8e" lead>
          <div style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--ink)" }}>
            Du séjour court à la résidence
          </div>
        </Field>

        <Field label="Arrivée" icon={<Icon.cal />} onClick={() => setOpenField(openField === "arrival" ? null : "arrival")} active={openField === "arrival"}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1 }}>
            {search.arrival ? search.arrival.getDate() : "—"}{" "}
            <span style={{ fontSize: 14, color: "var(--muted)" }}>
              {search.arrival ? fmtDate(search.arrival).split(" ")[1] : ""}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
            {search.arrival ? new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(search.arrival) : "Choisir une date"}
          </div>
        </Field>

        <Field label={nights ? `${nights} nuit${nights > 1 ? "s" : ""}` : "Départ"} icon={<Icon.cal />} onClick={() => setOpenField(openField === "departure" ? null : "departure")} active={openField === "departure"}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1 }}>
            {search.departure ? search.departure.getDate() : "—"}{" "}
            <span style={{ fontSize: 14, color: "var(--muted)" }}>
              {search.departure ? fmtDate(search.departure).split(" ")[1] : ""}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
            {search.departure ? new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(search.departure) : "Choisir une date"}
          </div>
        </Field>

        <Field label="Voyageurs" icon={<Icon.guest />} onClick={() => setOpenField(openField === "guests" ? null : "guests")} active={openField === "guests"}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1 }}>
            {search.adults}<span style={{ fontSize: 14, color: "var(--muted)" }}> adultes</span>
            {search.children > 0 && <>{" · "}{search.children}<span style={{ fontSize: 14, color: "var(--muted)" }}> enfants</span></>}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
            1 chambre · {search.adults + search.children} personnes
          </div>
        </Field>

        <button onClick={() => onSearch()} style={{
          background: "var(--ink)", color: "var(--bg)",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8,
          padding: "28px 24px",
        }}>
          <div style={{
            fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase",
          }}>Vérifier la disponibilité</div>
          <Icon.arrow />
        </button>
      </div>

      {openField === "arrival" && (
        <DatePopover anchor="arrival" search={search} setSearch={setSearch} onClose={() => setOpenField("departure")} />
      )}
      {openField === "departure" && (
        <DatePopover anchor="departure" search={search} setSearch={setSearch} onClose={() => setOpenField(null)} />
      )}
      {openField === "guests" && (
        <GuestsPopover search={search} setSearch={setSearch} onClose={() => setOpenField(null)} />
      )}
    </div>
  );
}

function Field({ label, sublabel, icon, children, onClick, active, lead }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "22px 22px",
        borderRight: lead ? "1px solid var(--line-soft)" : "1px solid var(--line-soft)",
        cursor: onClick ? "pointer" : "default",
        background: active ? "var(--bg-2)" : "transparent",
        transition: "background 120ms ease",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
        color: lead ? "var(--gold-deep)" : "var(--muted)",
      }}>
        {icon}{label}
      </div>
      <div style={{ marginTop: 10 }}>{children}</div>
      {sublabel && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
}

// ---------- Date picker ----------
function DatePopover({ anchor, search, setSearch, onClose }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [month, setMonth] = useStateHero(() => {
    const d = anchor === "arrival" ? (search.arrival || today) : (search.departure || search.arrival || today);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  function pick(d) {
    if (anchor === "arrival") {
      let dep = search.departure;
      if (!dep || dep <= d) dep = addDays(d, 2);
      setSearch({ ...search, arrival: d, departure: dep });
      onClose && onClose();
    } else {
      if (!search.arrival || d <= search.arrival) {
        setSearch({ ...search, arrival: addDays(d, -2), departure: d });
      } else {
        setSearch({ ...search, departure: d });
      }
      onClose && onClose();
    }
  }

  return (
    <Popover>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
        <Calendar
          month={month} pick={pick}
          arrival={search.arrival} departure={search.departure}
          today={today}
          onPrev={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          onNext={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
        />
        <Calendar
          month={new Date(month.getFullYear(), month.getMonth() + 1, 1)} pick={pick}
          arrival={search.arrival} departure={search.departure}
          today={today}
        />
      </div>
    </Popover>
  );
}

function Calendar({ month, pick, arrival, departure, today, onPrev, onNext }) {
  const monthName = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(month);
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDow = (first.getDay() + 6) % 7; // Monday first
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(month.getFullYear(), month.getMonth(), d));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        {onPrev ? <button onClick={onPrev} style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)" }}>← Précédent</button> : <span />}
        <div style={{ fontFamily: "var(--serif)", fontSize: 22, textTransform: "capitalize" }}>{monthName}</div>
        {onNext ? <button onClick={onNext} style={{ fontFamily: "var(--display)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--muted)" }}>Suivant →</button> : <span />}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, fontFamily: "var(--display)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>
        {["lun","mar","mer","jeu","ven","sam","dim"].map((d) => (
          <div key={d} style={{ textAlign: "center" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
        {cells.map((c, i) => {
          if (!c) return <div key={i} />;
          const isPast = c < today;
          const isArr = sameDay(c, arrival);
          const isDep = sameDay(c, departure);
          const inRange = arrival && departure && c > arrival && c < departure;
          return (
            <button key={i} disabled={isPast} onClick={() => pick(c)} style={{
              aspectRatio: "1 / 1", border: "none",
              background: isArr || isDep ? "var(--ink)" : inRange ? "var(--bg-2)" : "transparent",
              color: isArr || isDep ? "var(--bg)" : isPast ? "var(--muted)" : "var(--ink)",
              opacity: isPast ? 0.3 : 1,
              cursor: isPast ? "not-allowed" : "pointer",
              fontFamily: "var(--serif)", fontSize: 16,
              transition: "background 120ms ease",
            }}>{c.getDate()}</button>
          );
        })}
      </div>
    </div>
  );
}

function GuestsPopover({ search, setSearch, onClose }) {
  return (
    <Popover>
      <div style={{ display: "grid", gap: 20, minWidth: 340 }}>
        <GuestRow label="Adultes" sub="13 ans et plus" value={search.adults} set={(v) => setSearch({ ...search, adults: Math.max(1, v) })} />
        <GuestRow label="Enfants" sub="2 — 12 ans" value={search.children} set={(v) => setSearch({ ...search, children: Math.max(0, v) })} />
        <GuestRow label="Chambres" sub="Une seule disponible à ces dates" value={1} set={() => {}} disabled />
        <button onClick={onClose} style={{
          background: "var(--ink)", color: "var(--bg)",
          fontFamily: "var(--display)", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
          padding: "14px 18px", marginTop: 6, alignSelf: "stretch",
        }}>Valider</button>
      </div>
    </Popover>
  );
}
function GuestRow({ label, sub, value, set, disabled }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => !disabled && set(value - 1)} style={btn(disabled)}><Icon.minus /></button>
        <div style={{ width: 24, textAlign: "center", fontFamily: "var(--serif)", fontSize: 20 }}>{value}</div>
        <button onClick={() => !disabled && set(value + 1)} style={btn(disabled)}><Icon.plus /></button>
      </div>
    </div>
  );
}
const btn = (disabled) => ({
  width: 32, height: 32, border: "1px solid var(--line-soft)",
  background: "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center",
  opacity: disabled ? 0.3 : 1, cursor: disabled ? "not-allowed" : "pointer",
});

function Popover({ children }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
      background: "var(--paper)", border: "1px solid var(--line-soft)",
      boxShadow: "var(--shadow)",
      padding: 28, zIndex: 20,
    }}>{children}</div>
  );
}

Object.assign(window, { Hero });
