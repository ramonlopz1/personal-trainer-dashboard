import { useSession } from "next-auth/react";
import styles from "./Profile.module.css";
import { Users } from "@prisma/client";
import ActivatedCodeList from "./organisms/profile/ActivatedCodeList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CodeActivation from "./organisms/profile/CodeActivation";
import Loading from "../templates/Loading";
import Image from "next/image";

export default function Profile() {
  const [user, setUser] = useState<Users>();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    fetch(`/api/users?id=${id}`)
      .then((data) => data.json())
      .then(setUser)
      .then(() => setLoading(false))
  }, [id]);

  return (
    <div className={styles.section}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.hello}>
            <Image
              alt="profilePic"
              src={user?.image || ""}
              height={30}
              width={30}
            />
            <h3 className={styles.title}>Olá, {user?.name}</h3>
          </div>
          {/* <div className={styles.containers}>
            <div className={styles.subContainer}>
              <CodeActivation
                setActivationStatus={setActivationStatus}
                activationStatus={activationStatus}
              />
            </div>
            <div className={styles.subContainer}>
              <ActivatedCodeList user={user} />
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}
