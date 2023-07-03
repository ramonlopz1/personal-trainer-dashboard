import Image from "next/image";
import styles from "./Loading.module.css";

export default function Loading() {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: '500px'
  };

  return (
    <div style={{ ...style }}>
      <div className={styles.customLoader}></div>
    </div>
  );
}
