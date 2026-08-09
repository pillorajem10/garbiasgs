/**
 * Site navigation targets. Shared so the desktop nav, mobile menu, and footer
 * cannot drift apart; each consumer still owns its own markup.
 */
export const PRIMARY_NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/mission-vision", label: "Mission And Vision" },
  { to: "/projects", label: "Projects" },
  { to: "/program", label: "Program" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
];

/** Footer intentionally shows a shorter set than the primary nav. */
export const FOOTER_NAV = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
];
