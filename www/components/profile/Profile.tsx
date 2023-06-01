import { useSession } from "next-auth/react";
import styles from "./Profile.module.css";
import { IUser } from "@/logic/services/user/ServiceUsers";
import CodeList from "./organisms/CodeList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CodeActivation from "./organisms/CodeActivation";
import Loading from "../templates/Loading";

export default function Profile() {
  const [user, setUser] = useState<IUser>();
  const [activationStatus, setActivationStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    fetch(`/api/users?id=${id}`)
      .then((data) => data.json())
      .then(setUser)
      .then(() => setLoading(false));
  }, [activationStatus]);

  return (
    <div className={styles.section}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3>Olá, {user?.name}</h3>
          <div className={styles.containers}>
            <div className={styles.subContainer}>
              <CodeActivation setActivationStatus={setActivationStatus} activationStatus={activationStatus}/>
            </div>
            <div className={styles.subContainer}>
              <CodeList user={user} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
