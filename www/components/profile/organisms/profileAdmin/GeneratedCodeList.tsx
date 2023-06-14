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
      return( <div className={styles.listItem}>
        <div>Criado em: {item.createdAt.toLocaleString()}</div>
        <div>código em: {item.code}</div>
        <div>Ativo?: {item.isActive ? "ativo" : "inativo"}</div>
      </div>)
    });
  };

  return (
    <div className={styles.generatedCodeList}>
      <h4>Últimos códigos gerados</h4>
      <div className={styles.list}>{renderList()}</div>
    </div>
  );
}
