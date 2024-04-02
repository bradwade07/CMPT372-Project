"use client";

import { applyToBecomeVendor } from "@/api/user";
import { getSessionUserEmail } from "@/app/auth";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BecomeVendorButton() {
  const router = useRouter();
  const [pressState, setPressState] = useState<
    "unpressed" | "success" | "error"
  >("unpressed");

  async function apply() {
    const user_email = await getSessionUserEmail();

    if (user_email) {
      setPressState("success");
      await applyToBecomeVendor(user_email);
    } else {
      router.push("/signin");
    }
  }

  if (pressState == "unpressed") {
    return (
      <Button
        className="w-fit mt-8 self-center"
        color="success"
        onPress={apply}
      >
        Become a Vendor
      </Button>
    );
  } else if (pressState == "success") {
    return (
      <p className="text-lg font-semibold mt-4">
        Application Successful. Your application will be processed within 5
        business days.
      </p>
    );
  } else {
    return (
      <p className="text-lg text-red-500 mt-4">
        Error occurred, please return to home page.
      </p>
    );
  }
}
