// get a list of raffledCodes and group by provider

export function groupByProvider(array: any[]) {
  const removeDuplicated = new Set(array.map((provider) => provider.provider));
  const transformToArray = [...removeDuplicated].map((provider) => {
    return {
      ownerId: "",
      provider: provider,
      codes: [],
    };
  });

  array.forEach((item: any) => {
    transformToArray.forEach((provider: any) => {
      if (item.provider === provider.provider) {
        provider.ownerId = item.ownerId;
        provider.codes.push({
          code: item.raffleCode,
          createdAt: item.createdAt,
        });
      }
    });
  });

  return transformToArray;
}
