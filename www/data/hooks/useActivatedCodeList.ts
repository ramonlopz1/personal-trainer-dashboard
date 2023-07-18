import { groupByProvider } from "@/logic/utils/array";
import raffledCodes from "@/pages/api/raffledCodes";
import { useEffect, useState } from "react";

export default function useActivatedCodeList(raffledCodes: []) {
  const codesGroupedByProvider = groupByProvider(raffledCodes ?? []);

  const [providersProfileData, setProvidersProfileData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // o raffledCode tem o id do provider
    // com esse id, é feita a consulta no endpoint users?id=... que retorna os dados do provider
    // cada consulta provider é adicionado a lista contendo as informações completas sobre o provider
    console.log(codesGroupedByProvider);
    codesGroupedByProvider.forEach((code: any) => {
      fetch(`/api/users?id=${code.providerId}`)
        .then((data) => data.json())
        .then((resProvider) => {
          const exists = providersProfileData.find(
            (provider: any) => provider.id === resProvider.id
          );

          if (!exists) {
            setProvidersProfileData([...providersProfileData, resProvider]);
          }
        });
    });
  }, []);

  const getProfileAvatar = (list: [], id: string) => {
    let providerAvatar = "/profileAvatar.jpg";
    if (list.length > 0) {
      list.forEach((item: any) => {
        if (item.id === id) {
          providerAvatar = item.image;
        }
      });
    }

    return providerAvatar;
  };

  return {
    getProfileAvatar,
    codesGroupedByProvider,
    providersProfileData,
  };
}
