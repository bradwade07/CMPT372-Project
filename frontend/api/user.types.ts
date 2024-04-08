export enum UserTypes {
  Customer = "Customer",
  Vendor = "Vendor",
  Admin = "Admin",
}

// Given a string, returns the Enum value from the UserTypes Enum if it exists, is case insensitive
export function getUserEnumVal(typeString: string): UserTypes | undefined {
  const typeKeys = Object.keys(UserTypes) as (keyof typeof UserTypes)[];

  for (const key of typeKeys) {
    if (UserTypes[key].toLowerCase() === typeString.toLowerCase()) {
      return UserTypes[key];
    }
  }

  return undefined;
}

export type UserAddress = {
  street_name: string;
  post_code: string;
  city: string;
  province: string;
  country: string;
};

export type BecomeVendorRequest = {
  user_email: string;
};
