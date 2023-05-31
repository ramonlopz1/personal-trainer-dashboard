const items = [
  {
    id: "647634ccfa4133748fe31cb5",
    raffleCode: "ED5AA2AD",
    ownerId: "647632f31e53ae54bfd54d79",
    createdBy: "Ramon Lopes",
    createdAt: "2023-05-30T17:39:24.045Z",
  },
  {
    id: "6476370ad3ec8673958bde7f",
    raffleCode: "E959A7F6",
    ownerId: "647632f31e53ae54bfd54d79",
    createdBy: "Ramon Lopes",
    createdAt: "2023-05-30T17:48:58.508Z",
  },
  {
    id: "647749a097cd5b9441d05d4f",
    raffleCode: "EB73F7FF",
    ownerId: "647632f31e53ae54bfd54d79",
    createdBy: "Ramonzin",
    createdAt: "2023-05-31T13:20:32.476Z",
  },
  {
    id: "647749a097cd5b9441d05d4f",
    raffleCode: "EB73F7FF",
    ownerId: "647632f31e53ae54bfd54d79",
    createdBy: "Ramonzin",
    createdAt: "2023-05-31T13:20:32.476Z",
  },
];

function getElementByName(array) {
  const providersName = array.map((provider) => provider.createdBy);
  const removeDuplicated = new Set(providersName);
  const transformToArray = [...removeDuplicated].map((v) => {
    return {
      ownerId: "",
      createdBy: v,
      codes: [],
    };
  });
  
  array.forEach((item) => {
    transformToArray.forEach((provider) => {
      if (item.createdBy === provider.createdBy) {
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

console.log(getElementByName(items));
