import styles from "./GeneratedCodeList.module.css";
import { GeneratedCodes } from "@prisma/client";

interface GeneratedCodeListProps {
  generatedCodeList: GeneratedCodes[] | undefined;
}

export default function GeneratedCodeList(
  props: GeneratedCodeListProps
): JSX.Element {
  const { generatedCodeList: codeList } = props;

  const renderList = () => {
    return codeList?.map((item, i) => {
      const localeDate = new Date(item.createdAt).toLocaleDateString();
      return (
        <div className={styles.listItem}>
          <div>{localeDate}</div>
          <div>{item.code}</div>
          <div
            style={{
              color: item.isActive ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {item.isActive ? "Ativo" : "Inativo"}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.generatedCodeList}>
      <h4>Últimos códigos gerados</h4>
      <div className={styles.list}>{renderList()}</div>
    </div>
  );
}
