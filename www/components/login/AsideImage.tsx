import Image from "next/image";
import styles from "./AsideImage.module.css";

export default function AsideImage() {
  return (
    <div className={styles.container}>
      <div
        style={{
          backgroundColor: "var(--redColor)",
          borderRadius: "8px",
          transform: "translateY(410px)",
          width: "100%",
        }}
      >
        <Image src="/logo.png" height={70} width={160} alt="logo" />
      </div>
      <Image src="/loginPageImg.png" alt="vector" width={350} height={300} />
    </div>
  );
}
