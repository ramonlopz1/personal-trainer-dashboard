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

  const names = formatted.map(v => {
    const splitted = v.name.split("-")
    const removeYear = splitted[2] + "-" + splitted[1]
    return removeYear
  })
  const values = formatted.map(v => v.value)

  console.log(values)
  return {
    names, values
  };
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
