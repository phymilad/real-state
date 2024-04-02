"use client";

import { useEffect, useState } from "react";
import styles from "@/molecules/share-button/shareButton.module.css";

function ShareButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div className={styles.container}>
      <button>اشتراک گذاری</button>
    </div>
  );
}

export default ShareButton;
