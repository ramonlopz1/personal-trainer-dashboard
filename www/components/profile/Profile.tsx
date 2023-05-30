import { useSession } from "next-auth/react";
import styles from "./Profile.module.css";
import { IUser } from "@/logic/services/user/ServiceUsers";
import { useEffect, useState } from "react";
import CodeActivation from "./organisms/CodeActivation";

export default function Profile() {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user);

  const id = user?.id;
  useEffect(() => {}, []);

  return (
    <div className={styles.section}>
      <h3>Olá, {user?.name}</h3>
      <div className={styles.containers}>
        <div className={styles.subContainer}>
          <CodeActivation />
        </div>
        <div className={styles.subContainer}>Lista de códigos</div>
      </div>
    </div>
  );
}
