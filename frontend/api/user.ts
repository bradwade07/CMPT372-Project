import { isAxiosError } from "axios";
import { axios } from "./axios";
import { UserAddress, UserTypes, getUserTypeFromString } from "./user.types";

export async function createNewUser(
  user_email: string,
  user_type: UserTypes,
): Promise<void> {
  try {
    await axios.post("/postUser", {
      user_email: user_email,
      user_type: user_type,
      street_name: "1234 Smith Street",
      city: "Burnaby",
      province: "BC",
      post_code: "1A2 B3C",
      country: "Canada",
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }
  }
}

export async function getUserType(
  user_email: string,
): Promise<UserTypes | null> {
  try {
    let response = await axios.get(`/getUserTypeByUserEmail/${user_email}`);

    const user_type = getUserTypeFromString(response.data.type);

    if (user_type) {
      return user_type;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }
    return null;
  }
}

export async function updateUserType(
  user_email: string,
  user_type: UserTypes,
): Promise<void> {
  // try {
  //   await axios.patch("/patchUserType", {
  //     user_email: user_email,
  //     user_type: user_type,
  //   });
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     console.error(error.response?.data || error.response || error);
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
  //     user_email: user_email,
  //     address: address,
  //   });
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     console.error(error.response?.data || error.response || error);
  //   }
  //   else {
  //     console.error(error)
  //   }
  // }
}
