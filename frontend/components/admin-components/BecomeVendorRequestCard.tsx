"use client";

import { removeVendorRequest, updateUserType } from "@/api/user";
import { UserTypes, BecomeVendorRequest } from "@/api/user.types";
import { Button, Card, CardBody } from "@nextui-org/react";
import React from "react";

type VendorRequestCardProps = {
  request: BecomeVendorRequest;
  refetch: () => void;
};

// Card containing information on a user's request to become a vendor, and approve/deny buttons
export function VendorRequestCard({
  request,
  refetch,
}: VendorRequestCardProps) {
  // Changes the approved user's type to a vendor and deletes the request
  async function approveRequest() {
    await updateUserType(request.user_email, UserTypes.Vendor);
    await removeVendorRequest(request.user_email);
    refetch();
  }

  // Deletes the request
  async function denyRequest() {
    await removeVendorRequest(request.user_email);
    refetch();
  }

  return (
    <div className="h-fit w-full">
      <Card className="h-auto">
        <CardBody className="flex flex-row justify-center align-middle text-center gap-4">
          <p className="flex self-center">{request.user_email}</p>
          <Button
            type="button"
            className="bg-green-500"
            size="sm"
            onClick={approveRequest}
          >
            Approve
          </Button>
          <Button
            type="button"
            className="bg-red-500"
            size="sm"
            onClick={denyRequest}
          >
            Deny
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
