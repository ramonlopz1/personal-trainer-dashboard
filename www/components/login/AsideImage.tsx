import Image from "next/image";
import styles from "./AsideImage.module.css";

export default function AsideImage() {
  return (
    <div className={styles.container}>
      <Image src="/logo.png" height={120} width={360} alt="logo" />
    </div>
  );
}
