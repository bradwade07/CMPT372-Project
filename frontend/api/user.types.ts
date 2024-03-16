export enum UserTypes {
	Customer = "Customer",
	Vendor = "Vendor",
	Admin = "Admin",
}

export function isUserType(value: string): boolean {
	return Object.values(UserTypes).includes(value as UserTypes);
}

export type UserAddress = {
	street_address: string;
	postal_code: string;
	city: string;
	province: string;
};
