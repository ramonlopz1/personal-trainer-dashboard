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
      image: "",
    };
  });

  array.forEach((item: any) => {
    transformToArray.forEach((provider: any) => {
      if (item.provider === provider.provider) {
        provider.ownerId = item.ownerId;
        provider.providerId = item.providerId;
        provider.image = item.image;
        provider.codes.push({
          code: item.raffleCode,
          createdAt: item.createdAt,
        });
      }
    });
  });

  return transformToArray;
}

export function activatedQttByDate(users: any[]) {
  const allCodes: any = [];
  users
    ?.map((user: any, i) => user.raffledCodes)
    .forEach((codes, i) =>
      codes.forEach((code: any) => {
        const formatDate = code.createdAt.split("T")[0];

        allCodes.push(formatDate);
      })
    );

  // {2023-07-05: 3, 2023-07-06: 2}

  const quantityByDate = countElements(allCodes);
  const formatted = Object.entries(quantityByDate).map(([name, value]) => {
    return {
      name,
      value,
    };
  });


  const compareDates = (date1: any, date2: any) => {
    return new Date(date1).valueOf() - new Date(date2).valueOf() ;
  };

 const sortted = formatted.sort((a, b) => compareDates(a.name, b.name));




  return sortted;
}

function countElements(array: any[]) {
  return array.reduce((countObj: any, value: any) => {
    if (!countObj[value]) {
      countObj[value] = 1;
    } else {
      countObj[value]++;
    }

    return countObj;
  }, {});
}

export function sortArrayByDayAndHour(arr: GeneratedCodes[]) {
  arr.sort((a: GeneratedCodes, b: GeneratedCodes) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return arr;
}
