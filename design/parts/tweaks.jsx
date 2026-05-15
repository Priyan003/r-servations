// Tweaks panel — palette, layout, ribbon, numerals

function AppTweaks({ tweaks, setTweak }) {
  // Apply palette as CSS vars
  React.useEffect(() => {
    const root = document.documentElement;
    const palettes = {
      ivory: { bg: "#F5F1EA", bg2: "#EBE5DA", ink: "#0E0E0C", ink2: "#2A2823", paper: "#FBF8F2", gold: "oklch(0.72 0.09 75)", goldDeep: "oklch(0.55 0.10 70)" },
      noir:  { bg: "#13110E", bg2: "#1F1C18", ink: "#F2EBDE", ink2: "#D4C9B2", paper: "#1B1814", gold: "oklch(0.78 0.11 80)", goldDeep: "oklch(0.78 0.11 80)" },
      bois:  { bg: "#E5D8C3", bg2: "#D4C4AC", ink: "#1B1108", ink2: "#3A2A1A", paper: "#EFE5D2", gold: "oklch(0.55 0.13 50)", goldDeep: "oklch(0.42 0.12 45)" },
      glace: { bg: "#EEF0F1", bg2: "#E0E4E6", ink: "#0E1314", ink2: "#2B3438", paper: "#F4F6F7", gold: "oklch(0.62 0.10 220)", goldDeep: "oklch(0.45 0.10 220)" },
    };
    const p = palettes[tweaks.palette] || palettes.ivory;
    root.style.setProperty("--bg", p.bg);
    root.style.setProperty("--bg-2", p.bg2);
    root.style.setProperty("--ink", p.ink);
    root.style.setProperty("--ink-2", p.ink2);
    root.style.setProperty("--paper", p.paper);
    root.style.setProperty("--gold", p.gold);
    root.style.setProperty("--gold-deep", p.goldDeep);
    root.style.setProperty("--line-soft", tweaks.palette === "noir" ? "rgba(242,235,222,0.18)" : "rgba(14,14,12,0.18)");
  }, [tweaks.palette]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette">
        <PaletteSwatches
          label="Ambiance"
          value={tweaks.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
            { value: "ivory", swatches: ["#F5F1EA", "#EBE5DA", "#0E0E0C"], label: "Ivoire" },
            { value: "noir",  swatches: ["#13110E", "#1F1C18", "#C9A86A"], label: "Noir" },
            { value: "bois",  swatches: ["#E5D8C3", "#D4C4AC", "#1B1108"], label: "Bois" },
            { value: "glace", swatches: ["#EEF0F1", "#E0E4E6", "#0E1314"], label: "Glace" },
          ]}
        />
      </TweakSection>

      <TweakSection label="Mise en page">
        <TweakRadio
          label="Hero"
          value={tweaks.heroLayout}
          onChange={(v) => setTweak("heroLayout", v)}
          options={[
            { value: "editorial", label: "Édito" },
            { value: "fullbleed", label: "Plein" },
            { value: "stacked",   label: "Empilé" },
          ]}
        />
        <TweakToggle label="Bandeau supérieur" value={tweaks.showRibbon} onChange={(v) => setTweak("showRibbon", v)} />
        <TweakToggle label="Chiffres en serif" value={tweaks.useSerifNumerals} onChange={(v) => setTweak("useSerifNumerals", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// Custom palette swatch picker — maps symbolic values to color triplets
function PaletteSwatches({ label, value, onChange, options }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em" }}>{label}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <button key={opt.value} onClick={() => onChange(opt.value)} style={{
              padding: 4, border: "1px solid " + (selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)"),
              background: "transparent", cursor: "pointer",
              display: "flex", gap: 2, alignItems: "stretch",
            }} title={opt.label}>
              <span style={{ width: 28, height: 28, background: opt.swatches[0], display: "inline-block" }} />
              <span style={{ width: 12, height: 28, background: opt.swatches[1], display: "inline-block" }} />
              <span style={{ width: 12, height: 28, background: opt.swatches[2], display: "inline-block" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { AppTweaks });
