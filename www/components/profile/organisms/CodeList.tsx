import { groupByProvider } from "@/logic/utils/array";
import styles from "./CodeList.module.css";
import CodeDeadLine from "./CodeDeadLine";
import AliceCarousel from "react-alice-carousel";

interface CodeListProps {
  user: any;
}

export default function CodeList(props: CodeListProps) {
  const { raffledCodes } = props.user;

  const renderCards = () => {
    const list = groupByProvider(raffledCodes);

    return list.map((item: any, i: any) => {
      const expireDate = item.codes.reverse()[0];
      const activatedQuantity = item.codes.length;
      const items = item.codes.map((code: any, i: any) => {
        const localeDate = new Date(code.createdAt).toLocaleDateString();

        return (
          <div className={styles.codeBox} key={i}>
            <span className={styles.code}>{code.code}</span>
            <span className={styles.createdAt}>{localeDate}</span>
          </div>
        );
      });

      return (
        <div key={i} className={styles.provider}>
          <div className={styles.providerInfo}>
            <div className={styles.logo}></div>
            <span className={styles.name}>{item.provider}</span>
            <span
              className={styles.activatedQuantity}
              style={{ backgroundColor: activatedQuantity > 10 ? "green" : "red" }}
            >
              {activatedQuantity} / 10
            </span>
          </div>
          <div className={styles.codeList}>
            <CodeDeadLine startDate={expireDate.createdAt} />
            <div className={styles.codes}>
              <AliceCarousel
                mouseTracking
                disableButtonsControls
                items={items}
                responsive={{
                  1024: {
                    items: 5,
                  },
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h4 className={styles.title}>Códigos ativos</h4>
      <div className={styles.providerList}>{renderCards()}</div>
    </div>
  );
}
