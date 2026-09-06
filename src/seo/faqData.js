/**
 * FAQ content for the homepage and the services page.
 *
 * These feed both the visible FaqSection and the FAQPage structured data, so
 * every answer here is rendered on the page — schema never claims content a
 * visitor cannot see.
 *
 * Scope rule for this file, same as structuredData.js: answers describe either
 * (a) general geotechnical practice and the standards it is measured against,
 * which is verifiable engineering fact, or (b) services GarBia has stated it
 * offers. Nothing here invents company specifics — no prices, no turnaround
 * times, no crew or equipment counts, no client names. If a question needs one
 * of those to answer honestly, it points the reader at Contact instead.
 */

export const HOME_FAQ = [
  {
    question: "What geotechnical services does GarBia offer in the Philippines?",
    answer:
      "GarBia provides soil investigation, site investigation, laboratory testing, foundation engineering, deep foundations, micro-piling, and pile driving support for residential, commercial, and government projects across Luzon.",
  },
  {
    question: "Why is soil investigation important before construction?",
    answer:
      "The soil carries the building, not the other way round. A soil investigation establishes bearing capacity, groundwater level, and the depth and strength of each layer below the site, so the foundation can be designed for the ground that is actually there. Skipping it means designing on assumption — which shows up later as differential settlement, cracked slabs, or a foundation that has to be redesigned mid-project at far greater cost.",
  },
  {
    question: "What is a Standard Penetration Test (SPT)?",
    answer:
      "SPT is the most common in-situ test in soil investigation, carried out to ASTM D1586. A split-spoon sampler is driven into the bottom of a borehole by a 63.5 kg hammer falling 760 mm. The number of blows needed to drive each 150 mm increment is recorded, and the blows for the second and third increments give the N-value. That N-value correlates with the soil's density and strength, and it also recovers a disturbed sample for laboratory classification.",
  },
  {
    question: "How many boreholes does a project need?",
    answer:
      "It depends on the footprint, the structure type, the loads, and how variable the ground turns out to be — a small residential lot on uniform ground needs far less than a mid-rise on reclaimed or mixed fill. The number and depth are agreed after a site assessment rather than fixed in advance, because the point of the investigation is to cover the ground the structure will actually sit on. Describe your site and structure and we will advise on a scope.",
  },
  {
    question: "Does soil testing matter for earthquakes in the Philippines?",
    answer:
      "Very much so. The Philippines sits on the Pacific Ring of Fire, and seismic design depends on knowing the soil profile: site classification, and whether loose saturated sands below the water table could liquefy under cyclic loading. Liquefaction analysis is part of a geotechnical report for exactly this reason — it tells the structural designer whether the ground will keep its strength during shaking.",
  },
  {
    question: "Does GarBia serve projects outside Metro Manila?",
    answer:
      "Yes. GarBia Group serves clients throughout Luzon and the Philippines with field teams for site investigation and foundation works. Completed projects include work in Antipolo, Marikina, Pasig, and Taguig, and the office is in Cainta, Rizal.",
  },
];

export const SERVICES_FAQ = [
  {
    question: "What is included in GarBia site investigation services?",
    answer:
      "Sub-surface exploration, soil sampling, in-situ testing, laboratory analysis, and geotechnical reports to support structural and foundation design.",
  },
  {
    question: "What does a geotechnical report actually contain?",
    answer:
      "A geotechnical report turns raw field and laboratory data into something a structural engineer can design against. It typically sets out the borehole logs and soil profile, groundwater conditions, laboratory test results, the interpreted engineering properties of each layer, liquefaction assessment where relevant, and foundation design recommendations — the recommended foundation type, founding depth, and allowable bearing capacity or pile capacity.",
  },
  {
    question: "Which laboratory tests are run on soil samples?",
    answer:
      "Classification and index tests establish what the soil is: moisture content, specific gravity, Atterberg limits (liquid limit, plastic limit, and the resulting plasticity index, to ASTM D4318), and grain size distribution. Performance tests establish how it behaves under load: consolidation testing for settlement, unconfined compression for undrained shear strength, permeability for water flow, and field density and maximum dry density for compaction control. For pavements and roads, California Bearing Ratio (CBR) and Los Angeles abrasion testing are used.",
  },
  {
    question: "When do I need deep foundation or pile driving?",
    answer:
      "When shallow soils cannot support design loads—common on soft ground, slopes, or high-rise and infrastructure projects. In practice the investigation shows it: if competent bearing strata sit well below the practical depth of a footing or raft, the load has to be carried down to them by piles.",
  },
  {
    question: "What is micropiling, and when is it used instead of conventional piling?",
    answer:
      "Micropiles are small-diameter drilled and grouted piles, usually reinforced, that carry high loads relative to their size. They suit situations a large piling rig cannot serve: restricted-access or low-headroom sites, work alongside or beneath existing structures, underpinning, and sloping or difficult ground. Conventional bored piling is generally more economical where there is open access and space for a full-size rig.",
  },
  {
    question: "What is the difference between jet grouting and cement grouting?",
    answer:
      "Both improve ground in place rather than replacing it. Cement grouting injects grout into voids, fissures, or loose material to bind it and reduce permeability. Jet grouting uses a high-pressure jet to erode and mix the soil with grout, forming treated columns of soil-cement. Jet grouting creates a more positive, engineered geometry; permeation grouting is the lighter-touch option where the ground will accept grout by injection alone.",
  },
  {
    question: "Which standards is the testing carried out to?",
    answer:
      "Field and laboratory testing follow ASTM standards and the specifications applying to the project — for example ASTM D1586 for Standard Penetration Testing, ASTM D4318 for Atterberg limits, ASTM D2435 for one-dimensional consolidation, and ASTM D1883 for CBR. Philippine projects are also designed against the National Structural Code of the Philippines, and public works are subject to the relevant DPWH requirements.",
  },
  {
    question: "How long does a soil investigation take?",
    answer:
      "It varies with the number and depth of boreholes, site access, ground conditions, and the laboratory programme the samples require — a compact residential investigation is a very different job from a multi-borehole investigation for infrastructure. Programme is agreed with the scope rather than quoted generically. Send us the site details and intended structure and we will give you a realistic timeline.",
  },
  {
    question: "How do I request a geotechnical engineering quote?",
    answer:
      "Email inquiries@garbiagroup.com, call +63 (02) 8280-1763, or use any mobile number on our Contact page. Sending the location, the type and size of structure, and your programme lets us scope the investigation properly the first time. Visit the Location page for office directions and project consultations.",
  },
];
