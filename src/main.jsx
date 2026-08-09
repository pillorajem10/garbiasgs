import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import "./styles/sections.css";
import App from "./App.jsx";
import AppErrorBoundary from "@components/AppErrorBoundary";

const container = document.getElementById("root");

const tree = (
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
);

/**
 * Production HTML is prerendered (scripts/prerender.mjs), so #root already
 * holds the rendered page. Adopt that markup instead of replacing it:
 * createRoot would delete every existing child and re-insert an identical
 * tree, and the page collapsing to nothing for a frame moves everything below
 * it — a layout shift the visitor sees and Core Web Vitals counts.
 *
 * `vite dev` serves the un-prerendered template, where #root is empty and
 * there is nothing to hydrate.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
