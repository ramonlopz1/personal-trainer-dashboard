import styles from "./ProfileAdmin.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../templates/Loading";
import CodeGenerator from "./organisms/profileAdmin/CodeGenerator";
import GeneratedCodeList from "./organisms/profileAdmin/GeneratedCodeList";
import { GeneratedCodes, Users } from "@prisma/client";
import Image from "next/image";

export default function ProfileAdmin() {
  const [user, setUser] = useState<Users>();
  const [loading, setLoading] = useState<boolean>(true);
  const [generatedCode, setGeneratedCode] = useState<any>();
  const [generatedCodeList, setGeneratedCodeList] =
    useState<GeneratedCodes[]>();

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
    fetch(`/api/raffledCodes?id=${id}`)
      .then((data) => data.json())
      .then(setGeneratedCodeList);
  }, [generatedCode, refresh]);

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
              <CodeGenerator
                generatedCode={generatedCode}
                setGeneratedCode={setGeneratedCode}
              />
            </div>
            <div className={styles.subContainer}>
              <GeneratedCodeList
                generatedCodeList={generatedCodeList}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
