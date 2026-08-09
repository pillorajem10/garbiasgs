/**
 * Renders the page's schema.org graph as a single JSON-LD script.
 *
 * One script per page, not one per schema type: the nodes reference each other
 * by `@id`, and keeping them in a single `@graph` is what lets a parser resolve
 * those references instead of guessing that three separate documents describe
 * the same company. See src/seo/structuredData.js for the nodes themselves.
 */
import { buildGraph } from "@/seo/structuredData";

/**
 * `<` is escaped so a string inside the data can never close the script tag
 * early. JSON-LD parsers unescape <, so the meaning is unchanged.
 */
function serialize(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function JsonLdGraph({ nodes }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(buildGraph(nodes)) }}
    />
  );
}
