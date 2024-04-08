import { isAxiosError } from "axios";
import { axios } from "./axios";
import {
  UserAddress,
  UserTypes,
  BecomeVendorRequest,
  getUserEnumVal,
} from "./user.types";

// Creates a new user with the user_email as the type user_type
export async function createNewUser(
  user_email: string,
  user_type: UserTypes,
): Promise<void> {
  try {
    axios.post("/postUser", {
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

// Returns the type of user for the user_email
export async function getUserType(
  user_email: string,
): Promise<UserTypes | null> {
  try {
    let response = await axios.get(`/getUserTypeByUserEmail/${user_email}`);

    const user_type = getUserEnumVal(response.data.type);

    if (user_type) {
      return user_type;
    } else {
      return null;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }

    return null;
  }
}

// Changes the user type for the user_email to the type user_type
export async function updateUserType(
  user_email: string,
  user_type: UserTypes,
): Promise<void> {
  try {
    axios.patch("/patchUserType", {
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

// Changes the address for the user_email to the new address
export async function updateUserAddress(
  user_email: string,
  address: UserAddress,
): Promise<void> {
  try {
    axios.patch("/patchUserAddress", {
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

// User with user_email applies to become a vendor account, application stored in database and will be approved/denied by an admin later
export async function applyToBecomeVendor(user_email: string): Promise<void> {
  try {
    axios.post("/postVendorRequestsByUserEmail", {
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

// Returns the list of all applications for users to become a vendor
export async function getBecomeVendorRequests(): Promise<
  BecomeVendorRequest[]
> {
  try {
    let response = await axios.get<BecomeVendorRequest[]>(
      "/getAllVendorRequests",
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }

    return [];
  }
}

// Removes the application for the user with user_email to become a vendor
export async function removeVendorRequest(user_email: string): Promise<void> {
  try {
    axios.delete("/deleteVendorRequestByUserEmail", {
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
