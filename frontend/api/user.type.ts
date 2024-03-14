export enum UserTypes {
	Customer = "Customer",
	Vendor = "Vendor",
	Admin = "Admin",
}

export type UserAddress = {
	street_address: string;
	postal_code: string;
	city: string;
	province: string;
};
