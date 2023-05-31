import { useSession } from "next-auth/react";
import styles from "./Profile.module.css";
import { IUser } from "@/logic/services/user/ServiceUsers";
import { useEffect, useState } from "react";
import CodeActivation from "./organisms/CodeActivation";
import CodeList from "./organisms/CodeList";
import { useRouter } from "next/router";
import { constUser } from "@/data/constants/constants";

export default function Profile() {
  const [user, setUser] = useState<IUser>(constUser);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    fetch(`/api/users?id=${id}`)
      .then((data) => data.json())
      .then(setUser);
  }, [user]);

  return (
    <div className={styles.section}>
      <h3>Olá, {user?.name}</h3>
      <div className={styles.containers}>
        <div className={styles.subContainer}>
          <CodeActivation />
        </div>
        <div className={styles.subContainer}>
          <CodeList user={user} />
        </div>
      </div>
    </div>
  );
}
