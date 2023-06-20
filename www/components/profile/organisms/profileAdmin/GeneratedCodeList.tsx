import { useState } from "react";
import styles from "./GeneratedCodeList.module.css";
import { GeneratedCodes } from "@prisma/client";
import Link from "next/link";

interface GeneratedCodeListProps {
  generatedCodeList: GeneratedCodes[] | undefined;
}

export default function GeneratedCodeList(
  props: GeneratedCodeListProps
): JSX.Element {
  const { generatedCodeList: codeList } = props;

  const renderList = () => {
    if (!codeList?.length) return <div>Sem códigos</div>;

    return codeList?.map((item, i) => {
      const localeDate = new Date(item.createdAt).toLocaleDateString();
      return (
        <tr className={styles.listItem} key={i}>
          <td>{localeDate}</td>
          <td>{item.code}</td>
          <td
            style={{
              color: item.isActive ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {item.isActive ? "Ativo" : "Inativo"}
          </td>
          <td>
            {item.isActive ? (
              <Link href={`/userByProvider?id=${item.ownerId}&providerId=${item.providerId}`}>Ver cliente</Link>
            ) : (
              <button>-</button>
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.generatedCodeList}>
      <h4>Últimos códigos gerados</h4>
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
        <tbody className={styles.tbody}>{renderList()}</tbody>
      </table>
    </div>
  );
}
