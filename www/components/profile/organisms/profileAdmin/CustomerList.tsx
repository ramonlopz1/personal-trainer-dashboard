import Loading from "@/components/templates/Loading";
import styles from "./CustomerList.module.css";
import { useEffect, useState } from "react";
import { IUser } from "@/logic/services/user/ServiceUsers";
import { useRouter } from "next/router";

export default function CustomerList() {
  const { query } = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    fetch(`/api/users?providerId=${query.providerId}`)
      .then((data) => data.json())
      .then(setUsers)
      .then(() => setLoading(false));
  }, []);

  console.log(users);

  const renderCustomer = () => {
    return users?.map((user, i) => {
      return (
        <div className={styles.userContainer}>
          <div className={styles.picture}>
                <div className={styles.img}>

                </div>
          </div>
          <div className={styles.userInfo}>
                <div>{user.id}</div>
                <div>{user.name}</div>
                <div>{user.phone}</div>
                <div>{user.email}</div>
                <div>{user.birthDate}</div>
                {/* <div>{user.raffledCodes[0].createdAt}</div> */}
                <div>qtd {user.raffledCodes?.length}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.section}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.containers}>
            <div className={styles.subContainer}>{renderCustomer()}</div>
          </div>
        </>
      )}
    </div>
  );
}
