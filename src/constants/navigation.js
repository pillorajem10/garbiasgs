import { findServiceBySlug, serviceSlugFromPath } from "./services";

/**
 * Site navigation targets. Shared so the desktop nav, mobile menu, and footer
 * cannot drift apart; each consumer still owns its own markup.
 */
export const PRIMARY_NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/history", label: "History" },
  { to: "/mission-vision", label: "Mission And Vision" },
  { to: "/projects", label: "Projects" },
  { to: "/program", label: "Program" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
];

const HOME_CRUMB = { to: "/", label: "Home" };
const SERVICES_CRUMB = PRIMARY_NAV.find(({ to }) => to === "/services");

export function getBreadcrumbTrail(pathname) {
  const serviceSlug = serviceSlugFromPath(pathname);
  if (serviceSlug) {
    const { name } = findServiceBySlug(serviceSlug);
    return [HOME_CRUMB, SERVICES_CRUMB, { to: pathname, label: name }];
  }

  const currentPage = PRIMARY_NAV.find(({ to }) => to === pathname);
  if (!currentPage || currentPage.to === HOME_CRUMB.to) return [];
  return [HOME_CRUMB, currentPage];
}

/** Footer intentionally shows a shorter set than the primary nav. */
export const FOOTER_NAV = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
];
