export enum Categories {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Kitchen = "Kitchen",
  LivingRoom = "Living Room",
}

export function getPageEnumVal(uri: string): Categories | undefined {
  const str = decodeURI(uri);
  return Object.values(Categories).find((item) => {
    if (item == str) {
      return item;
    }
  });
}
