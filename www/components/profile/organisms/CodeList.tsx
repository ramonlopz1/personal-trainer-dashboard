import { IUser } from "@/logic/services/user/ServiceUsers";
import styles from "./CodeList.module.css";
import { IRaffledCode } from "@/logic/services/raffledcodes/ServiceRaffledCodes";

interface CodeListProps {
  user: IUser;
}

export default function CodeList(props: CodeListProps) {
  const { raffledCodes } = props.user;

  const renderCards = () => {
    return raffledCodes.map((elem: IRaffledCode, i: any) => {
      return (
      <div key={i} className={styles.provider}>
        <div className={styles.providerInfo}>
            <div className={styles.logo}></div>
            <span className={styles.name}>{elem.createdBy}</span>
        </div>
        <div className={styles.codeList}>

        </div>
      </div>
      )
    });
  };

  return (
    <div>
      <h4>Códigos ativos</h4>
      <div className={styles.providerList}>
            {renderCards()}
      </div>
    </div>
  );
}
