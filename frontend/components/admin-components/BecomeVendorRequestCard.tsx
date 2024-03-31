"use client";

import { removeVendorRequest, updateUserType } from "@/api/user";
import { UserTypes, BecomeVendorRequest } from "@/api/user.types";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

type VendorRequestCardProps = {
  request: BecomeVendorRequest;
};

export function VendorRequestCard({ request }: VendorRequestCardProps) {
  const queryClient = useQueryClient();

  async function approveRequest() {
    await updateUserType(request.user_email, UserTypes.Vendor);
    await removeVendorRequest(request.user_email);
    queryClient.invalidateQueries({ queryKey: ["Vendor Requests"] });
  }

  async function denyRequest() {
    await removeVendorRequest(request.user_email);
    queryClient.invalidateQueries({ queryKey: ["Vendor Requests"] });
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
