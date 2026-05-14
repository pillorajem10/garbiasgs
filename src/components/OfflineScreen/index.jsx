import styles from "./index.module.css";

const copy = {
  offline: {
    title: "You appear to be offline",
    body: "Check your Wi‑Fi or mobile data, then try again. GarBia will load as soon as you are back on the network.",
  },
  unreachable: {
    title: "We can’t reach the site right now",
    body: "Your device seems online, but the server did not respond. This is usually temporary — try again in a moment.",
  },
  error: {
    title: "Something went wrong",
    body: "The page hit an unexpected error. Reloading usually fixes this.",
  },
};

function IconOffline() {
  return (
    <svg className={styles.svgIcon} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.49L18.18 6.8 23.64 7zm-16.85-.66-2.09-2.09L.43 8.71l1.41 1.41 2.59-2.59c.63.36 1.23.78 1.8 1.24L7.1 5.69zm2.71 2.71L5.43 3.94 4 5.35l2.2 2.2c-.53.35-1.03.75-1.49 1.19L.09 12.23C1.44 10.58 3.87 9.5 6.5 9.5c.17 0 .34 0 .51.02l2.49-2.49zm3.53 3.53L8.24 7.59c.43-.09.88-.14 1.35-.14 2.55 0 4.75 1.53 5.71 3.72l-1.43 1.43zm7.89 7.89-14-14-1.41 1.41 3.09 3.09C4.93 12.5 2.5 14.93 2.5 18c0 2.21 1.79 4 4 4h11c.45 0 .85-.09 1.24-.26l2.26 2.26 1.41-1.41zM7.5 18c0-1.38 1.12-2.5 2.5-2.5.17 0 .34.02.5.05l3.15 3.15H7.5V18zm9.5 0c0 .94-.19 1.84-.52 2.67L11.71 15.9c.18-.03.36-.05.54-.05 1.38 0 2.5 1.12 2.5 2.5V18z"
      />
    </svg>
  );
}

function IconServer() {
  return (
    <svg className={styles.svgIcon} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4h4zm-1 9h2v2h-2v-2zm1.55-11.93l-1.39 1.39A5.002 5.002 0 0012 6c-.55 0-1.08.09-1.58.26L9.03 4.87C9.93 4.32 10.93 4 12 4c2.21 0 4.09 1.43 4.55 3.07z"
      />
    </svg>
  );
}

function IconError() {
  return (
    <svg className={`${styles.svgIcon} ${styles.svgIconError}`} viewBox="0 0 24 24" aria-hidden focusable="false">
      <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  );
}

const OfflineScreen = ({ variant = "offline", onRetry, detail }) => {
  const text = copy[variant] ?? copy.offline;

  return (
    <div className={styles.screen}>
      <div className={styles.card} role="alert">
        <div className={styles.iconWrap} aria-hidden>
          {variant === "offline" && <IconOffline />}
          {variant === "unreachable" && <IconServer />}
          {variant === "error" && <IconError />}
        </div>
        <h1 className={styles.title}>{text.title}</h1>
        <p className={styles.body}>{text.body}</p>
        {detail && variant === "error" ? (
          <p className={styles.detail} title={detail}>
            {detail}
          </p>
        ) : null}
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={onRetry}>
            Try again
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
        <p className={styles.hint}>GarBia Structural &amp; Geotechnical Solutions</p>
      </div>
    </div>
  );
};

export default OfflineScreen;
