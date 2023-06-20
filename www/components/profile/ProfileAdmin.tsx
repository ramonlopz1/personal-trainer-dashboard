import styles from "./ProfileAdmin.module.css";
import { IUser } from "@/logic/services/user/ServiceUsers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../templates/Loading";
import CodeGenerator from "./organisms/profileAdmin/CodeGenerator";
import GeneratedCodeList from "./organisms/profileAdmin/GeneratedCodeList";
import { GeneratedCodes } from "@prisma/client";

export default function Profile() {
  const [user, setUser] = useState<IUser>();
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
  }, []);

  useEffect(() => {
    fetch(`/api/raffledCodes?id=${id}`)
      .then((data) => data.json())
      .then(setGeneratedCodeList);
  }, [generatedCode]);

  return (
    <div className={styles.section}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3>Olá, {user?.name}</h3>
          <div className={styles.containers}>
            <div className={styles.subContainer}>
              <CodeGenerator
                generatedCode={generatedCode}
                setGeneratedCode={setGeneratedCode}
              />
            </div>
            <div className={styles.subContainer}>
              <GeneratedCodeList generatedCodeList={generatedCodeList} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
