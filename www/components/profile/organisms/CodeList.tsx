import { groupByProvider } from "@/logic/utils/array";
import styles from "./CodeList.module.css";
import CodeDeadLine from "./CodeDeadLine";

interface CodeListProps {
  user: any;
}

export default function CodeList(props: CodeListProps) {
  const { raffledCodes } = props.user;

  const renderCards = () => {
    const list = groupByProvider(raffledCodes);
    const formatDate = list[0].codes[0].createdAt.split("T")[0];

    return list.map((item: any, i: any) => {
      return (
        <div key={i} className={styles.provider}>
          <div className={styles.providerInfo}>
            <div className={styles.logo}></div>
            <span className={styles.name}>{item.provider}</span>
          </div>
          <div className={styles.codeList}>
            <CodeDeadLine startDate={formatDate} />
            <div className={styles.codes}>
              {item.codes.map((code: any, i: any) => {
                const localeDate = new Date(
                  code.createdAt
                ).toLocaleDateString();

                return (
                  <div className={styles.codeBox} key={i}>
                    <span className={styles.code}>{code.code}</span>
                    <span className={styles.createdAt}>{localeDate}</span>
                  </div>
                );
              })}
            </div>
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
