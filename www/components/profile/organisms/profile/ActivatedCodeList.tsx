import { groupByProvider } from "@/logic/utils/array";
import styles from "./ActivatedCodeList.module.css";
import {
  IoTimerOutline,
  IoLogoInstagram,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import CodeDeadLine from "./CodeDeadLine";
import AliceCarousel from "react-alice-carousel";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useActivatedCodeList from "@/data/hooks/useActivatedCodeList";
import Confetti from "react-confetti";

interface ActivatedCodeListProps {
  user: any;
}

export default function CodeList(props: ActivatedCodeListProps) {
  const { raffledCodes } = props.user;

  const { codesGroupedByProvider, providersProfileData, hiddenConfetti } =
    useActivatedCodeList(raffledCodes);

  const renderProfileInfo = (providerId: string) => {
    const providerInfo = providersProfileData.find((prov: any) => {
      return prov.id === providerId;
    });

    const whatsappPhone = "55"
      .concat(providerInfo?.phone)
      .split(" ")
      .join("")
      .replace("(", "")
      .replace(")", "")
      .replace("-", "");

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
            <Link href={`https://wa.me/${whatsappPhone}`} target="_blank">
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
              <CodeDeadLine startDate={expireDate.createdAt} code={code} />
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
              {activatedQuantity >= 10 ? (
                <Confetti
                  width={window.innerWidth - 70 ?? 5}
                  className={`${!hiddenConfetti ? styles.confetti : ""}`}
                />
              ) : (
                false
              )}
            </div>
            {activatedQuantity >= 10 ? (
              <button className={styles.rewardBtn}>
                <AiFillStar />
                <span>Resgatar</span>
              </button>
            ) : (
              false
            )}
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
