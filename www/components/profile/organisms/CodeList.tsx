import styles from "./CodeList.module.css";
import { IRaffledCode } from "@/logic/services/raffledcodes/ServiceRaffledCodes";

interface CodeListProps {
  user: any;
}

export default function CodeList(props: CodeListProps) {
  const { raffledCodes } = props.user;

  const renderCards = () => {
    return raffledCodes.map((item: IRaffledCode, i: any) => {
      return (
      <div key={i} className={styles.provider}>
        <div className={styles.providerInfo}>
            <div className={styles.logo}></div>
            <span className={styles.name}>{item.createdBy}</span>
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
