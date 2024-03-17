"use client";

import { login } from "@/app/auth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export function GoogleLoginButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={(credentialResponse: CredentialResponse) =>
        login(credentialResponse).then(() => router.push("/"))
      }
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
