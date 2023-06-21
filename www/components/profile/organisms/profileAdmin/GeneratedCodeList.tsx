import { Dispatch, useState } from "react";
import styles from "./GeneratedCodeList.module.css";
import { GeneratedCodes } from "@prisma/client";
import Link from "next/link";
import { BiRefresh } from "react-icons/bi";
import { sortArrayByDayAndHour } from "@/logic/utils/array";
import Loading from "@/components/templates/Loading";
import { formatBRDateTime } from "@/logic/utils/string";

interface GeneratedCodeListProps {
  generatedCodeList: GeneratedCodes[] | undefined;
  setRefresh: Dispatch<boolean>;
  refresh: boolean;
}

export default function GeneratedCodeList(
  props: GeneratedCodeListProps
): JSX.Element {
  const { generatedCodeList: codeList, setRefresh, refresh } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const renderList = () => {
    if (!codeList?.length) return <div>Não existem códigos</div>;

    const sortByHour = sortArrayByDayAndHour(codeList);

    return sortByHour?.map((item, i) => {
      const dateTime = formatBRDateTime(item.createdAt);

      return (
        <tr className={styles.listItem} key={i}>
          <td>{dateTime}</td>
          <td>{item.code}</td>
          <td
            style={{
              color: item.isActive ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {item.isActive ? "Ativo" : "Inativo"}
          </td>
          <td className={styles.tdCustomerProfile}>
            {item.isActive ? (
              <Link
                className={styles.customerBtn}
                href={`/userByProvider?id=${item.ownerId}&providerId=${item.providerId}`}
              >
                Ver cliente
              </Link>
            ) : (
              <span>Aguardando</span>
            )}
          </td>
        </tr>
      );
    });
  };

  const btnRefreshHandler = () => {
    setLoading(true);
    setRefresh(!refresh);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.generatedCodeList}>
      <div className={styles.topDiv}>
        <h4>Últimos códigos gerados</h4>
        <button className={styles.btnRefresh} onClick={btnRefreshHandler}>
          <BiRefresh />
        </button>
      </div>
      <table className={styles.list}>
        <thead className={styles.thead}>
          <tr style={{ width: "100%" }}>
            <th className={styles.listHeader}>
              <td>Data</td>
              <td>Código</td>
              <td>Status</td>
              <td>Cliente</td>
            </th>
          </tr>
        </thead>
        {loading ? (
          <Loading />
        ) : (
          <tbody className={styles.tbody}>{renderList()}</tbody>
        )}
      </table>
    </div>
  );
}
