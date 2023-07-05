// get a list of raffledCodes and group by provider

import { GeneratedCodes } from "@prisma/client";

export function groupByProvider(array: any[]) {
  const removeDuplicated = new Set(array.map((provider) => provider.provider));
  const transformToArray = [...removeDuplicated].map((provider) => {
    return {
      ownerId: "",
      provider: provider,
      providerId: "",
      codes: [],
      image: ""
    };
  });

  array.forEach((item: any) => {
    transformToArray.forEach((provider: any) => {
      if (item.provider === provider.provider) {
        provider.ownerId = item.ownerId;
        provider.providerId = item.providerId
        provider.codes.push({
          code: item.raffleCode,
          createdAt: item.createdAt,
          image: item.image
        });
      }
    });
  });

  return transformToArray;
}

export function sortArrayByDayAndHour(arr: GeneratedCodes[]) {
  arr.sort((a: GeneratedCodes, b: GeneratedCodes) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return arr;
}
