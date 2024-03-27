export enum UserTypes {
  Customer = "Customer",
  Vendor = "Vendor",
  Admin = "Admin",
}

export function getUserTypeFromString(
  typeString: string,
): UserTypes | undefined {
  const typeKeys = Object.keys(UserTypes) as (keyof typeof UserTypes)[];

  for (const key of typeKeys) {
    if (UserTypes[key].toLowerCase() === typeString.toLowerCase()) {
      return UserTypes[key];
    }
  }

  return undefined;
}

export type UserAddress = {
  street_address: string;
  post_code: string;
  city: string;
  province: string;
  country: string;
};
