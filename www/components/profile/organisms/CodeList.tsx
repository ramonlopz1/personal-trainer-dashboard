import { groupByProvider } from "@/logic/utils/array";
import styles from "./CodeList.module.css";
import { IRaffledCode } from "@/logic/services/raffledcodes/ServiceRaffledCodes";
import CodeDeadLine from "./CodeDeadLine";

interface CodeListProps {
  user: any;
}

export default function CodeList(props: CodeListProps) {
  const { raffledCodes } = props.user;

  const renderCards = () => {
    const list = groupByProvider(raffledCodes);
    console.log(list);

    return list.map((item: any, i: any) => {
      return (
        <div key={i} className={styles.provider}>
          <div className={styles.providerInfo}>
            <div className={styles.logo}></div>
            <span className={styles.name}>{item.provider}</span>
          </div>
          <div className={styles.codeList}>
            {item.codes.map((code: any, i: any) => {
              const formatDate = code.createdAt.split("T")[0];

              return (
                <div key={i}>
                  <span>{code.code}</span>
                  <CodeDeadLine startDate={formatDate} />
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h4>Códigos ativos</h4>
      <div className={styles.providerList}>{renderCards()}</div>
    </div>
  );
}
