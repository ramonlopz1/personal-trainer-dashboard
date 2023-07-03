import Loading from "@/components/templates/Loading";
import styles from "./CustomerList.module.css";
import { useEffect, useState } from "react";
import { IUser } from "@/logic/services/user/ServiceUsers";
import { useRouter } from "next/router";

export default function CustomerList() {
  const { query } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    fetch(`/api/users?providerId=${query.providerId}`)
      .then((data) => data.json())
      .then(setUsers)
      .then(() => setLoading(false));
  }, []);

  const calcGeneralInfos = () => {
    let totalActivatedCodes: number = 0;

    users?.forEach((user) => {
      totalActivatedCodes += user.raffledCodes?.length!;
    });

    const totalCustomers = users?.length;

    return {
      totalActivatedCodes,
      totalCustomers,
    };
  };

  const renderGeneralInfo = () => {
    const generalInfos = calcGeneralInfos();

    return (
      <div className={styles.generalInfo}>
        <div className={styles.generalInfoBox}>
          <span>Total de clientes:</span>
          <span>{generalInfos.totalCustomers}</span>
        </div>
        <div className={styles.generalInfoBox}>
          <span>Total de códigos ativados:</span>
          <span>{generalInfos.totalActivatedCodes}</span>
        </div>
      </div>
    );
  };

  const renderCustomerList = () => {
    return users?.map((user, i) => {
      return (
        <div className={styles.userContainer}>
          <div className={styles.picture}>
            <div className={styles.img}></div>
          </div>
          <div className={styles.userInfo}>
            <div>{user.name}</div>
            <div>qtd {user.raffledCodes?.length}</div>
            <div>{user.phone}</div>
            <div>{user.email}</div>
            <div>{user.birthDate}</div>
            {/* <div>{user.raffledCodes[0].createdAt}</div> */}
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
            <div className={styles.subContainer}>{renderGeneralInfo()}</div>
            <div className={styles.subContainer}>{renderCustomerList()}</div>
          </div>
        </>
      )}
    </div>
  );
}
