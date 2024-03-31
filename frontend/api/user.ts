import { isAxiosError } from "axios";
import { axios } from "./axios";
import {
  UserAddress,
  UserTypes,
  BecomeVendorRequest,
  getUserTypeFromString,
} from "./user.types";

// creates a new user with the user_email as the type user_type
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

// returns the type of user for the user_email
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

// changes the user type for the user_email to the type user_type
export async function updateUserType(
  user_email: string,
  user_type: UserTypes,
): Promise<void> {
  try {
    await axios.patch("/patchUserType", {
      user_email: user_email,
      user_type: user_type,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }
  }
}

// changes the address for the user_email to the new address
export async function updateUserAddress(
  user_email: string,
  address: UserAddress,
): Promise<void> {
  try {
    await axios.patch("/patchUserAddress", {
      user_email: user_email,
      ...address,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }
  }
}

// user with user_email applies to become a vendor account, application stored in database and will be approved/denied by an admin
export async function applyToBecomeVendor(user_email: string): Promise<void> {
  try {
    await axios.post("/???", {
      //FIXME: backend url
      user_email: user_email,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }
  }
}

// returns the list of all applications for users to become a vendor
export async function getBecomeVendorRequests(): Promise<
  BecomeVendorRequest[]
> {
  try {
    const thing: BecomeVendorRequest[] = [];
    for (let i = 0; i < 30; i++) {
      thing.push({ user_email: `user${i}@gmail.com` });
    }
    return thing;

    let response = await axios.get("/???"); //FIXME: backend url

    return response.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }

    return [];
  }
}

// removes the application for the user with user_email to become a vendor
export async function removeVendorRequest(user_email: string): Promise<void> {
  try {
    await axios.delete("/???", {
      //FIXME: backend url
      data: {
        user_email: user_email,
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }
  }
}
