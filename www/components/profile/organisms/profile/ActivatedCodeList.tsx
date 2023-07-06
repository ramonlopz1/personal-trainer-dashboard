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

interface ActivatedCodeListProps {
  user: any;
}

export default function CodeList(props: ActivatedCodeListProps) {
  const [providerInfo, setProviderInfo] = useState<any>([]);

  const { raffledCodes } = props.user;

  useEffect(() => {
    // busca os dados de cada fornecedor na api e agrupa em um array - refatorar -

    raffledCodes.forEach((elem: any) => {
      fetch(`/api/users?id=${elem.providerId}`)
        .then((data) => data.json())
        .then((apiProv) => {
          const exists = providerInfo.find(
            (provider: any) => provider.id === apiProv.id
          );

          if (!exists) {
            setProviderInfo([...providerInfo, apiProv]);
          }
        });
    });
  }, []);

  const renderCards = () => {
    const list = groupByProvider(raffledCodes);
    return list.map((item: any, i: any) => {

      // busca informações individuais do fornecedor - refatorar -
      let providerAvatar = "";
     
      if (providerInfo) {
        providerInfo.forEach((prov: any) => {
          if (prov.id === item.providerId) {
            providerAvatar = prov.image;
          }
        });
      }

      const expireDate = item.codes.reverse()[0];
      const activatedQuantity = item.codes.length;
      const items = item.codes.map((code: any, i: any) => {
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
            <div className={styles.logo}>
              <Image
                src={providerAvatar}
                alt="profileAvatar"
                height={65}
                width={65}
              />
            </div>
            <span className={styles.name}>{item.provider}</span>
            <span className={styles.socialMedial}>
              <Link href={``}>
                <IoLogoInstagram color="#C13584" />
              </Link>
              <Link href={``}>
                <IoLogoWhatsapp color="#25D366" />
              </Link>
            </span>
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
