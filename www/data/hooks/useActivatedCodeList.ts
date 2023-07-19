import { groupByProvider } from "@/logic/utils/array";
import raffledCodes from "@/pages/api/raffledCodes";
import { useEffect, useState } from "react";

export default function useActivatedCodeList(raffledCodes: []) {
  const codesGroupedByProvider = groupByProvider(raffledCodes ?? []);

  const [providersProfileData, setProvidersProfileData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(codesGroupedByProvider);

    codesGroupedByProvider.forEach((code: any) => {
      fetch(`/api/users?id=${code.providerId}`)
        .then((data) => data.json())
        .then((resProvider) => {
          // update the state based on the arrow function return:
          // 1 - return [...prevProviders, resProvider]
          // 2 - return prevProviders
          // setProvidersProfileData([...prev providers, resProvider])
          // setProvidersProfileData(prevProviders)
          // the param received inside the arrow function thats passed to the setProvidersProfileData, contains the prevState

          setProvidersProfileData((prevProviders: any) => {
            // Check if the provider with the given ID already exists in the state
            const exists = prevProviders.some(
              (provider: any) => provider.id === resProvider.id
            );

            // If it doesn't exist, append the new provider to the state
            if (!exists) {
              return [...prevProviders, resProvider];
            }

            // If it already exists, just return the previous state
            return prevProviders;
          });
        });
    });
  }, [codesGroupedByProvider]);

  return {
    codesGroupedByProvider,
    providersProfileData,
  };
}
