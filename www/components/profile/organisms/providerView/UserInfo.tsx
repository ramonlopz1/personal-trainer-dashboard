import styles from "./UserInfo.module.css";

interface UserInfoProps {
  user: any;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <div className={styles.userInfo}>
      <div className={styles.boxInfo}>
        <span className={styles.label}>Nome</span><span className={styles.value}>{user?.name}</span>
      </div>
      <div className={styles.boxInfo}>
        <span className={styles.label}>Data Nascimento</span>
        <span className={styles.value}>{user?.birthDate}</span>
      </div>
      <div className={styles.boxInfo}>
        <span className={styles.label}>E-mail</span><span className={styles.value}>{user?.email}</span>
      </div>
      <div className={styles.boxInfo}>
        <span className={styles.label}>Telefone</span>
        <span className={styles.value}>{user?.phone}</span>
      </div>
    </div>
  );
}
