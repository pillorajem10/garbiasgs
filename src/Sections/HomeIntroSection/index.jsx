import { Link } from "react-router-dom";
import Card from "@components/Card";
import Reveal from "@components/Reveal";
import SectionHeader from "@components/SectionHeader";
import { BUSINESS } from "@/seo/constants";
import styles from "./index.module.css";

const INTRO_CARDS = [
  {
    title: "What we do",
    to: "/services",
    linkLabel: "See all geotechnical services",
    body: "Site assessment, sub-surface soil exploration by SPT, coring and test pits, soil laboratory testing, detailed geotechnical reports with foundation design recommendations, and micropiling, bored piling, and grouting works.",
  },
  {
    title: "Where we work",
    to: "/projects",
    linkLabel: "View completed projects",
    body: "Field teams operate throughout Metro Manila, Rizal, and the wider Luzon area. Recent investigations include projects in Antipolo, Marikina, Pasig, and Taguig.",
  },
  {
    title: "Why clients choose us",
    to: "/about",
    linkLabel: "About GarBia Group",
    body: "ISO 9001:2015 certified, DPWH-BRS accredited, PCAB Category “A” licensed, PhilGEPS Platinum member, and an ASTM organisational member — our laboratory equipment and test methods follow ASTM standards.",
  },
];

const HomeIntroSection = () => (
  <section className={styles.section} aria-labelledby="home-intro-heading">
    <div className={styles.inner}>
      <SectionHeader
        eyebrow="About GarBia Group"
        title="Who we are"
        titleId="home-intro-heading"
        intro={
          <>
            <strong>GarBia Group</strong> — registered as{" "}
            <strong>{BUSINESS.legalName}</strong>, formerly GarBia Structural and
            Geotechnical Solutions (GSGS) — is a geotechnical engineering and
            construction services company based in {BUSINESS.addressLocality},{" "}
            {BUSINESS.addressRegion}. Since {BUSINESS.foundingYear} we have carried
            out soil investigation, geotechnical testing, and foundation works for
            residential, institutional, and government projects across Luzon.
          </>
        }
      />

      <ul className={styles.cardGrid}>
        {INTRO_CARDS.map(({ title, to, linkLabel, body }, index) => (
          <Reveal as="li" key={title} delay={index * 100}>
            <Card to={to} title={title} linkLabel={linkLabel}>
              <p>{body}</p>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal as="p" className={styles.callToAction}>
        Planning a build and need soil data before design?{" "}
        <Link to="/contact" className={styles.inlineLink}>
          Request a site investigation quote
        </Link>{" "}
        or call{" "}
        <a href={`tel:${BUSINESS.telephone}`} className={styles.inlineLink}>
          {BUSINESS.telephoneDisplay}
        </a>
        .
      </Reveal>
    </div>
  </section>
);

export default HomeIntroSection;
