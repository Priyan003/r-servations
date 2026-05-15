// Main app — orchestrates pages and state
const { useState: useStateApp, useEffect: useEffectApp, useRef: useRefApp } = React;

function App() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS__);
  const [page, setPage] = useStateApp("home"); // home | detail | checkout | confirm
  const [search, setSearch] = useStateApp(() => {
    // Default: arrival = next Saturday, depart = next Tuesday
    const t = new Date(); t.setHours(0,0,0,0);
    const dow = (t.getDay() + 6) % 7; // 0 = Monday
    const daysToSat = (5 - dow + 7) % 7 || 7;
    const arr = addDays(t, daysToSat);
    return {
      arrival: arr,
      departure: addDays(arr, 3),
      adults: 2,
      children: 0,
    };
  });
  const [activeRoom, setActiveRoom] = useStateApp(null);
  const [booking, setBooking] = useStateApp(null);
  const [guest, setGuest] = useStateApp(null);

  useEffectApp(() => {
    function onHome() { setPage("home"); }
    window.addEventListener("nav:home", onHome);
    return () => window.removeEventListener("nav:home", onHome);
  }, []);

  useEffectApp(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  function goToReserve() {
    const el = document.getElementById("chambres");
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
  }

  function pickRoom(room) {
    setActiveRoom(room);
    setPage("detail");
  }

  function continueToCheckout(b) {
    setBooking(b);
    setPage("checkout");
  }

  function confirm(g) {
    setGuest(g);
    setPage("confirm");
  }

  function backHome() {
    setPage("home");
    setBooking(null);
    setGuest(null);
  }

  return (
    <>
      <Ribbon show={tweaks.showRibbon} />
      <Nav onReserve={goToReserve} page={page} />

      {page !== "home" && <Stepper step={page === "detail" ? 1 : page === "checkout" ? 2 : 3} />}

      {page === "home" && (
        <main>
          <Hero layout={tweaks.heroLayout} search={search} setSearch={setSearch} onSearch={() => {
            const el = document.getElementById("chambres");
            if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
          }} />
          <RoomsSection search={search} onPick={pickRoom} />
          <HouseSection />
          <AvenueStrip />
        </main>
      )}

      {page === "detail" && activeRoom && (
        <main>
          <RoomDetail room={activeRoom} search={search} setSearch={setSearch}
                      onBack={() => setPage("home")} onContinue={continueToCheckout} />
        </main>
      )}

      {page === "checkout" && booking && (
        <main>
          <Checkout booking={booking} search={search}
                    onBack={() => setPage("detail")} onConfirm={confirm} />
        </main>
      )}

      {page === "confirm" && booking && guest && (
        <main>
          <Confirmation booking={booking} search={search} guest={guest} onHome={backHome} />
        </main>
      )}

      <Footer />

      <AppTweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
