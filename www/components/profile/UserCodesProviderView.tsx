import { useSession } from "next-auth/react";
import styles from "./UserCodesProviderView.module.css";
import { IUser } from "@/logic/services/user/ServiceUsers";
import ActivatedCodeList from "./organisms/profile/ActivatedCodeList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CodeActivation from "./organisms/profile/CodeActivation";
import Loading from "../templates/Loading";
import Link from "next/link";

export default function UserCodesProviderView() {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    query: { id, providerId },
  } = useRouter();

  useEffect(() => {
    fetch(`/api/users?id=${id}&providerId=${providerId}`)
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
          <div className={styles.containers}>
            <Link href={`/profile?id=${providerId}`}>Voltar</Link>
            <div className={styles.subContainer}>
              <div>data nasc {user?.birthDate}</div>
              <div>email {user?.email}</div>
              <div>nome {user?.name}</div>
              <div>fone {user?.phone}</div>
            </div>
            <div className={styles.subContainer}>
              <ActivatedCodeList user={user} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
