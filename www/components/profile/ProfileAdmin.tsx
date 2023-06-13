import { useSession } from "next-auth/react";
import styles from "./Profile.module.css";
import { IUser } from "@/logic/services/user/ServiceUsers";
import CodeList from "./organisms/ActivatedCodeList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CodeActivation from "./organisms/CodeActivation";
import Loading from "../templates/Loading";
import CodeGenerator from "./organisms/CodeGenerator";
import GeneratedCodeList from "./organisms/GeneratedCodeList";

export default function Profile() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    fetch(`/api/users?id=${id}`)
      .then((data) => data.json())
      .then(setUser)
      .then(() => setLoading(false));
  }, []);

  return (
    <div className={styles.section}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3>Olá, {user?.name}</h3>
          <div className={styles.containers}>
            <div className={styles.subContainer}>
              <CodeGenerator />
            </div>
            <div className={styles.subContainer}>
              <GeneratedCodeList />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
