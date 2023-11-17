import { useSession } from "next-auth/react";
import styles from "./UserCodesProviderView.module.css";
import ActivatedCodeList from "./organisms/profile/ActivatedCodeList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../templates/Loading";
import Link from "next/link";
import UserInfo from "./organisms/providerView/UserInfo";
import { Users } from "@prisma/client";

const backBtnStyle = {
  textDecoration: "none",
  textAlign: "center" as const,
  fontWeight: "bold",
  borderRadius: "4px",
  color: "white",
  backgroundColor: "var(--mainColor)",
  cursor: "pointer",
  width: "80px",
  display: "inline-block",
  padding: '5px',
  alignSelf: 'flex-end'
};

export default function UserCodesProviderView() {
  const [user, setUser] = useState<Users>();
  const [loading, setLoading] = useState<boolean>(true);

  
  const {
    query: { id, providerId },
  } = useRouter();

  useEffect(() => {
    fetch(`/api/users?id=${id}&providerId=${providerId}`)
      .then((data) => data.json())
      .then(setUser)
      .then(() => setLoading(false));
  }, [id]);

  
  return (
    <div className={styles.section}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.containers}>
            <Link
              style={{ ...backBtnStyle }}
              href={`/profile?id=${providerId}`}
            >
              Voltar
            </Link>
            <div className={styles.subContainer}>
              <UserInfo user={user} />
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
