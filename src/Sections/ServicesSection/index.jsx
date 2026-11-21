import { memo } from "react";
import OptimizedImage from "@components/OptimizedImage";
import Reveal from "@components/Reveal";
import { cdnImage } from "@/utils/cdn";
import { imageDims } from "@/utils/imageDimensions";
import { SERVICE_GROUPS } from "./data";
import styles from "./index.module.css";

const ServiceItem = ({ item }) =>
  typeof item === "string" ? (
    <li className={styles.item}>{item}</li>
  ) : (
    <li className={styles.item}>
      {item.title}
      <ul className={styles.subList}>
        {item.subItems.map((subItem) => (
          <li key={subItem} className={styles.subItem}>
            {subItem}
          </li>
        ))}
      </ul>
    </li>
  );

const ServicesSection = () => (
  <section
    id="services-list"
    className={styles.section}
    aria-label="Garbia geotechnical services list"
  >
    <div className={styles.inner}>
      {SERVICE_GROUPS.map(({ title, imageFile, items }, index) => (
        <Reveal
          as="article"
          key={title}
          className={`${styles.group} ${index % 2 === 1 ? styles.reversed : ""}`}
        >
          <div className={styles.imageFrame}>
            <OptimizedImage
              sizes="(max-width: 900px) 100vw, 520px"
              src={cdnImage(imageFile)}
              {...imageDims(imageFile)}
              alt={`${title} — illustrative photo`}
              className={styles.image}
            />
          </div>

          <div className={styles.text}>
            <h2 className={styles.title}>{title}</h2>
            <ul className={styles.list}>
              {items.map((item) => (
                <ServiceItem key={typeof item === "string" ? item : item.title} item={item} />
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default memo(ServicesSection);
