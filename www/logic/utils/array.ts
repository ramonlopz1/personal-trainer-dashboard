export function groupByProvider(array: any[]) {
  const providersName = array.map((provider) => provider.provider);
  const removeDuplicated = new Set(providersName);
  const transformToArray = [...removeDuplicated].map((v) => {
    return {
      ownerId: "",
      provider: v,
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
