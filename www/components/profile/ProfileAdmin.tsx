import styles from "./ProfileAdmin.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../templates/Loading";
import ClientsOverview from "./organisms/profileAdmin/ClientsOverview";
import ClientsList from "./organisms/profileAdmin/ClientsList";
import { Users } from "@prisma/client";
import Image from "next/image";
import { Chart } from "../templates/Chart";

export default function ProfileAdmin() {
  const [user, setUser] = useState<any>();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    fetch(`/api/users?id=${id}`)
      .then((data) => data.json())
      .then(setUser)
      .then(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`/api/users`)
      .then((data) => data.json())
      .then(setUsers)
      .then(() => setLoading(false));
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
          <div className={styles.containers}>
            <div className={styles.subContainer}>
              <ClientsOverview clientsList={users || []} />
            </div>
            <div className={styles.subContainer}>
              <h4>Crescimento mensal</h4>
              <div>
                <Chart type="bar" chartData={[123, 321, 555, 322]} />
              </div>
            </div>
            <div className={styles.subContainer}>
              <ClientsList
                refresh={refresh}
                setRefresh={setRefresh}
                clientsList={users || []}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
