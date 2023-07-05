import Loading from "@/components/templates/Loading";
import styles from "./CustomerList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { formatBRDateTime } from "@/logic/utils/string";
import Link from "next/link";

export default function CustomerList() {
  const { query } = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>();

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
          <span className={styles.generalInfoBoxLabel}>Total de clientes</span>
          <span className={styles.generalInfoBoxValue}>{generalInfos.totalCustomers}</span>
        </div>
        <div className={styles.generalInfoBox}>
          <span className={styles.generalInfoBoxLabel}>Total de códigos ativados</span>
          <span className={styles.generalInfoBoxValue}>{generalInfos.totalActivatedCodes}</span>
        </div>
      </div>
    );
  };

  const renderCustomerList = () => {
    console.log(users)
    return users?.map((user, i) => {
      return (
        <div className={styles.userContainer} key={i}>
          <div className={styles.picture}>
            <div className={styles.img}>
              <Image alt="profilePic" src={user.image} height={55} width={55} />
            </div>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.box}>
              <span className={styles.boxLabel}>Nome</span>
              <span className={styles.boxValue}>
                {user.name.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
            <div className={styles.box}>
              <span className={styles.boxLabel}>Qtd</span>
              <span className={styles.boxValue}>
                {user.raffledCodes?.length}
              </span>
            </div>
            <div className={styles.box}>
              <span className={styles.boxLabel}>Fone</span>
              <span className={styles.boxValue}>{user.phone || "-"}</span>
            </div>
            <div className={styles.box}>
              <span className={styles.boxLabel}>E-mail</span>
              <span className={styles.boxValue}>{user.email}</span>
            </div>
            <div className={styles.box}>
              <span className={styles.boxLabel}>Dt Nascimento</span>
              <span className={styles.boxValue}>{user.birthDate || "-"}</span>
            </div>
            <div className={styles.box}>
              <span className={styles.boxLabel}>Última ativação</span>
              <span className={styles.boxValue}>
                {formatBRDateTime(user.raffledCodes.at(-1).createdAt)}
              </span>
            </div>
            <div className={styles.box}>
              <Link className={styles.btnProfile} href={`/userByProvider?id=${user.id}&providerId=${query.providerId}`}>Ver</Link>
            </div>
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
