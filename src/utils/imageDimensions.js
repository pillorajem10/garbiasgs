/**
 * Intrinsic pixel size of the CDN images used in fluid-width slots.
 *
 * These let the browser reserve the right box before the file arrives. Without
 * them the surrounding text reflows when each photo decodes, which is a
 * Cumulative Layout Shift hit on every section that renders a photo at
 * `width: 100%` with no fixed height.
 *
 * Only images whose containers do *not* already pin a height need an entry —
 * where the CSS sets e.g. `height: 28rem`, the box is reserved already.
 *
 * Measured from the files on the CDN (DigitalOcean Spaces). If an image is
 * replaced with a different crop, update its numbers here in the same change.
 */
const DIMENSIONS = {
  "DJI_0226.jpg": { width: 4000, height: 2250 },
  "DJI_0059.jpg": { width: 4000, height: 2250 },
  "DJI_0180.JPG": { width: 4000, height: 2250 },
  "home1.jpg": { width: 918, height: 1632 },
  "service1.jpg": { width: 1024, height: 1366 },
  "66bc725f-c176-4ea9-8816-eb138ef6824e.jpg": { width: 3024, height: 4032 },
};

/** `{ width, height }` for a CDN image filename, or `{}` if it is not listed. */
export function imageDims(file) {
  return DIMENSIONS[file] ?? {};
}

export default imageDims;
