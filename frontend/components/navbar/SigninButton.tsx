"use client";

import { getSession } from "@/app/auth";
import { Button, Link } from "@nextui-org/react";
import React from "react";
import { UserControls } from "./UserControls";
import { useQuery } from "@tanstack/react-query";

// If user is not logged in, displays a button to press that takes them to the sign in page
// If user is logged in, displays the user's profile icon that can be clicked to open a dropdown menu
export function SigninButton() {
  const { isLoading, data: session } = useQuery({
    queryKey: ["session"],
    queryFn: checkForSession,
  });

  // returns the session if the user is logged in
  // this function is needed to not cause an error with server actions
  async function checkForSession() {
    const session = await getSession();
    return session;
  }

  return (
    <>
      {!isLoading &&
        (session ? (
          <UserControls />
        ) : (
          <Button as={Link} color="primary" href="/signin" variant="flat">
            Sign In
          </Button>
        ))}
    </>
  );
}
