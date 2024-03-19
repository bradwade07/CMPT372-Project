"use client";

import { createNewUser, getUserType } from "@/api/user";
import { GoogleCredentials, login } from "@/app/auth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { UserTypes } from "@/api/user.types";

export function GoogleLoginButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse: CredentialResponse) => {
        const user_email = (
          jwt.decode(credentialResponse.credential!) as GoogleCredentials
        ).email;
        const user_type = await getUserType(user_email);

        if (user_type) {
          await login(credentialResponse, user_type);
        } else {
          await createNewUser(user_email, UserTypes.Customer);
          await login(credentialResponse, UserTypes.Customer);
        }

        router.push("/");
      }}
      onError={() => {
        console.error("Login Failed");
      }}
    />
  );
}
