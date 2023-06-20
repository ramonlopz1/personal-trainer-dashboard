import { useState, useEffect, Dispatch, SetStateAction } from "react";
import OneTimeInput from "./OneTimeInput";
import styles from "./CodeActivation.module.css";
import { useSession, getSession } from "next-auth/react";

interface CodeActivationProps {
  setActivationStatus: Dispatch<SetStateAction<string>>;
  activationStatus: string;
}

export default function CodeActivation({
  activationStatus,
  setActivationStatus,
}: CodeActivationProps) {
  const [code, setCode] = useState<string>("");

  // session was implemented in this way to remove an typescript error when using useSession hook
  const [session, setSession] = useState<any>();
  useEffect(() => {
    getSession().then(setSession);
  }, []);

  const onSubmitHandler = (code: string) => {
    setActivationStatus("Verificando código...");
    fetch("/api/raffledCodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        raffleCode: code,
        ownerId: session?.user?.id,
        
      }),
    })
      .then((res) => res.text())
      .then(setActivationStatus);
  };

  return (
    <div className={styles.codeActivation}>
      <span>Ativar código:</span>
      <OneTimeInput setCode={setCode} code={code} />
      <span style={{
        height: '10px'
      }}>{activationStatus}</span>
      <input
        onClick={() => onSubmitHandler(code)}
        type="submit"
        value="Ativar"
      />
    </div>
  );
}
