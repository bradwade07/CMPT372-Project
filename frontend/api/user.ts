import { axios } from "./axios";
import { UserAddress, UserTypes, isUserType } from "./user.types";

export async function createNewUser(user_email: string, user_type: UserTypes) {
  try {
    await axios.post("/???", {
      data: {
        user_email: user_email,
        user_type: user_type,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getUserType(
  user_email: string,
): Promise<UserTypes | undefined> {
  return UserTypes.Vendor;

  // backend call
  try {
    let response = await axios.get("/getUser", {
      data: {
        user_email: user_email,
      },
    });

    if (isUserType(response.data)) {
      return response.data;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserType(user_email: string, user_type: UserTypes) {
  try {
    await axios.patch("/???", {
      data: {
        user_email: user_email,
        user_type: user_type,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserAddress(
  user_email: string,
  address: UserAddress,
) {
  try {
    await axios.patch("/???", {
      data: {
        user_email: user_email,
        address: address,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
