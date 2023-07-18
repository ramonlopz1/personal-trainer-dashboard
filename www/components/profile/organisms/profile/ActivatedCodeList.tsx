import { groupByProvider } from "@/logic/utils/array";
import styles from "./ActivatedCodeList.module.css";
import {
  IoTimerOutline,
  IoLogoInstagram,
  IoLogoWhatsapp,
} from "react-icons/io5";
import CodeDeadLine from "./CodeDeadLine";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useActivatedCodeList from "@/data/hooks/useActivatedCodeList";

interface ActivatedCodeListProps {
  user: any;
}

export default function CodeList(props: ActivatedCodeListProps) {
  const { raffledCodes } = props.user;

  const { codesGroupedByProvider, providersProfileData } =
    useActivatedCodeList(raffledCodes);

  const renderProfileInfo = (providerId: string) => {
    
    const providerInfo = providersProfileData.find((prov: any) => {
      return prov.id === providerId;
    });

    if (providerInfo?.id) {
      return (
        <>
          <div className={styles.logo}>
            <Image
              src={providerInfo?.image || ""}
              alt="profileAvatar"
              height={65}
              width={65}
            />
          </div>
          <span className={styles.name}>{providerInfo.name || "-"}</span>
          <span className={styles.socialMedial}>
            <Link href={``}>
              <IoLogoInstagram color="#C13584" />
            </Link>
            <Link href={``}>
              <IoLogoWhatsapp color="#25D366" />
            </Link>
          </span>
        </>
      );
    } else {
      return <div>Carregando...</div>;
    }
  };

  const renderTicketInfo = () => {
    return codesGroupedByProvider.map((code: any, i: any) => {
      const expireDate = code.codes.reverse()[0];
      const activatedQuantity = code.codes.length;
      const ticketCardList = code.codes.map((code: any, i: any) => {
        const localeDate = new Date(code.createdAt).toLocaleDateString();

        return (
          <div className={styles.codeBox} key={i}>
            <span className={styles.code}>{code.code}</span>
            <hr style={{ width: "60%", margin: "3px" }} />
            <span className={styles.createdAt}>{localeDate}</span>
          </div>
        );
      });

      return (
        <div key={i} className={styles.provider}>
          <div className={styles.providerInfo}>
            {renderProfileInfo(code.providerId)}
          </div>
          <div className={styles.codeList}>
            <div className={styles.deadLine} style={{}}>
              <IoTimerOutline />
              <CodeDeadLine startDate={expireDate.createdAt} />
              <span
                className={styles.activatedQuantity}
                style={{
                  backgroundColor:
                    activatedQuantity > 10
                      ? "var(--greenColor)"
                      : "var(--redColor)",
                }}
              >
                {activatedQuantity} / 10 códigos ativos
              </span>
            </div>
            <div className={styles.codes}>
              <AliceCarousel
                mouseTracking
                disableButtonsControls
                items={ticketCardList}
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
      <div className={styles.providerList}>{renderTicketInfo()}</div>
    </div>
  );
}
