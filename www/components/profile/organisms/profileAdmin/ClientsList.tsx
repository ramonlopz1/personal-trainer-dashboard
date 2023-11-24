import { Dispatch, useState } from "react";
import styles from "./ClientsList.module.css";
import Link from "next/link";
import { BiRefresh } from "react-icons/bi";
import { sortArrayByDayAndHour } from "@/logic/utils/array";
import Loading from "@/components/templates/Loading";
import { formatBRDateTime } from "@/logic/utils/string";

interface ClientsListProps {
  setRefresh: Dispatch<boolean>;
  refresh: boolean;
  clientsList: any[]
}

export default function ClientsList(props: ClientsListProps): JSX.Element {
  const { setRefresh, refresh, clientsList } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const renderList = () => {
    // if (!codeList?.length) return <div>Não existem códigos</div>;

    const sortByHour = sortArrayByDayAndHour(clientsList);

    return sortByHour?.map((user: any, i: any) => {
      const dateTime = formatBRDateTime(user.createdAt);
      const activationTime = user.activationDate
        ? formatBRDateTime(user.activationDate)
        : "";

      return (
        <tr className={styles.listItem} key={i}>
          <td>{dateTime}</td>
          <td>{user.name}</td>
          <td
            style={{
              color: user.isActive ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {user.isActive ? "Ativo" : "Inativo"}
          </td>
          <td>{activationTime || "-"}</td>
          <td className={styles.tdCustomerProfile}>
              <Link
                className={styles.customerBtn}
                href={`/profile_overview?id=${user.id}`}
              >
                Ver aluno
              </Link>
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
        <h4>Últimos alunos cadastrados</h4>
        <button className={styles.btnRefresh} onClick={btnRefreshHandler}>
          <BiRefresh />
        </button>
      </div>
      <table className={styles.list}>
        <thead className={styles.thead}>
          <tr style={{ width: "100%" }}>
            <th className={styles.listHeader}>
              <td>Data Criação</td>
              <td>Nome</td>
              <td>Peso</td>
              <td>Altura</td>
              <td>Perfil</td>
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
