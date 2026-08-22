import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import BurgerMenu from "@components/BurgerMenu";
import ScrollToTop from "@components/ScrollToTop";
import OfflineScreen from "@components/OfflineScreen";
import BrandedPageLoader from "@components/BrandedPageLoader";
import RouteSEO from "@components/SEO/RouteSEO";
import { seoPath } from "@/seo/pageMeta";

const Home = lazy(() => import("@pages/Home"));
const About = lazy(() => import("@pages/About"));
const Services = lazy(() => import("@pages/Services"));
const Contact = lazy(() => import("@pages/Contact"));
const MissionVision = lazy(() => import("@pages/MissionVision"));
const Location = lazy(() => import("@pages/Location"));
const Projects = lazy(() => import("@pages/Projects"));
const Program = lazy(() => import("@pages/Program"));
const DefaultPage = lazy(() => import("@pages/DefaultPage"));

function useNetworkGate() {
  // Default to "ok" when there is no navigator (build-time prerender): the
  // static HTML must contain the real page, never the offline screen.
  const [netMode, setNetMode] = useState(() =>
    typeof navigator === "undefined" || navigator.onLine ? "ok" : "offline"
  );

  const pingServer = useCallback(async () => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setNetMode("offline");
      return;
    }
    const url = new URL(import.meta.env.BASE_URL || "/", window.location.origin);
    url.searchParams.set("_alive", String(Date.now()));
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      if (res.ok) setNetMode("ok");
      else setNetMode("unreachable");
    } catch {
      window.clearTimeout(timeout);
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setNetMode("offline");
      } else {
        setNetMode("unreachable");
      }
    }
  }, []);

  useEffect(() => {
    const onOnline = () => {
      setNetMode("ok");
      void pingServer();
    };
    const onOffline = () => setNetMode("offline");
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    let delayedPing;
    if (typeof navigator !== "undefined" && navigator.onLine) {
      delayedPing = window.setTimeout(() => void pingServer(), 4000);
    }
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      if (delayedPing) window.clearTimeout(delayedPing);
    };
  }, [pingServer]);

  const retry = useCallback(() => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      window.location.reload();
      return;
    }
    void pingServer();
  }, [pingServer]);

  return { netMode, retry };
}

function RoutedMain() {
  const location = useLocation();

  // Remounting on route change replays the content-in animation. Keyed on the
  // route's identity rather than the raw pathname so that the not-found view,
  // which every unmatched URL renders, is treated as one page — moving between
  // two dead URLs should not replay the animation on identical content.
  const routeKey = seoPath(location.pathname);

  return (
    <Suspense fallback={<BrandedPageLoader />}>
      <main
        key={routeKey}
        id="main-content"
        className="main-content main-content-route"
        tabIndex={-1}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mission-vision" element={<MissionVision />} />
          <Route path="/location" element={<Location />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/program" element={<Program />} />
          <Route path="*" element={<DefaultPage />} />
        </Routes>
      </main>
    </Suspense>
  );
}

function AppShell({ menuOpen, onOpenMenu, onCloseMenu }) {
  return (
    <>
      <RouteSEO />
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar menuOpen={menuOpen} onToggleMenu={onOpenMenu} />

      <AnimatePresence>
        {menuOpen && <BurgerMenu id="site-mobile-menu" onClose={onCloseMenu} />}
      </AnimatePresence>

      <RoutedMain />

      <Footer />
    </>
  );
}

/**
 * Everything below the router. Kept separate from `App` so the build-time
 * prerender can mount the same tree under a StaticRouter — one component tree,
 * no second copy of the shell to drift out of sync.
 */
export function AppRoot() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { netMode, retry } = useNetworkGate();

  // Stable identities so BurgerMenu's memo() is not defeated on every render.
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  if (netMode === "offline" || netMode === "unreachable") {
    return (
      <OfflineScreen
        variant={netMode === "offline" ? "offline" : "unreachable"}
        onRetry={retry}
      />
    );
  }

  return (
    <AppShell
      menuOpen={menuOpen}
      onOpenMenu={openMenu}
      onCloseMenu={closeMenu}
    />
  );
}

function App() {
  return (
    <Router>
      <AppRoot />
    </Router>
  );
}

export default App;
