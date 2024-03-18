import { axios } from "./axios";
import { UserAddress, UserTypes, isUserType } from "./user.types";

// TODO: integrate when backend is working

export async function createNewUser(
  user_email: string,
  user_type: UserTypes,
): Promise<void> {
  // try {
  //   await axios.post("/postUser", {
  //     data: {
  //       user_email: user_email,
  //       user_type: user_type,
  //     },
  //   });
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     console.error(error.response?.data);
  //   }
  //   else {
  //     console.error(error)
  //   }
  // }
}

export async function getUserType(
  user_email: string,
): Promise<UserTypes | undefined> {
  return UserTypes.Customer;

  // try {
  //   let response = await axios.get(`/getUserTypeByUserEmail/${user_email}`);

  //   if (isUserType(response.data)) {
  //     return response.data;
  //   } else {
  //     return undefined;
  //   }
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     console.error(error.response?.data);
  //   }
  //   else {
  //     console.error(error)
  //   }
  // }
}

export async function updateUserType(
  user_email: string,
  user_type: UserTypes,
): Promise<void> {
  // try {
  //   await axios.patch("/patchUserType", {
  //     data: {
  //       user_email: user_email,
  //       user_type: user_type,
  //     },
  //   });
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     console.error(error.response?.data);
  //   }
  //   else {
  //     console.error(error)
  //   }
  // }
}

export async function updateUserAddress(
  user_email: string,
  address: UserAddress,
): Promise<void> {
  // try {
  //   await axios.patch("/patchUserAddress", {
  //     data: {
  //       user_email: user_email,
  //       address: address,
  //     },
  //   });
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     console.error(error.response?.data);
  //   }
  //   else {
  //     console.error(error)
  //   }
  // }
}
