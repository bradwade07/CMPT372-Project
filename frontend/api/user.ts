import { axios } from "./axios";
import { UserTypes } from "./user.type";

export async function getUserType(googleJWT: string): Promise<UserTypes> {
	return UserTypes.Vendor;
}
