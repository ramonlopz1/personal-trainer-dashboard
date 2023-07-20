import { useState, useEffect, Dispatch, SetStateAction } from "react";
import OneTimeInput from "./OneTimeInput";
import styles from "./CodeActivation.module.css";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

interface CodeActivationProps {
  setActivationStatus: Dispatch<SetStateAction<string>>;
  activationStatus: string;
}

export default function CodeActivation({
  activationStatus,
  setActivationStatus,
}: CodeActivationProps) {
  const [code, setCode] = useState<string>("");

  const router = useRouter();

  // session was implemented in this way to remove an typescript error when using useSession hook
  const [session, setSession] = useState<any>();
  useEffect(() => {
    getSession().then(setSession);
  }, []);

  const onSubmitHandler = (code: string) => {
    if(code.length <= 0) return 

    setActivationStatus("Verificando código...");
    fetch("/api/raffledCodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        raffleCode: code,
        ownerId: router.query.id,
      }),
    })
      .then((res) => res.text())
      .then(setActivationStatus);
  };

  return (
    <div className={styles.codeActivation}>
      <span>Ativar código:</span>
      <OneTimeInput setCode={setCode} code={code} />
      <span
        style={{
          height: "10px",
          margin: "5px 0px"
        }}
      >
        {activationStatus}
      </span>
      <input
        onClick={() => onSubmitHandler(code)}
        type="submit"
        value="Ativar"
      />
    </div>
  );
}
