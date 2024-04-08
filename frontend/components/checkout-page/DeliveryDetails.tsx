import { PROVINCES } from "@/api/checkout.types";
import { ShoppingCartEntry } from "@/api/product.types";
import { UserAddress } from "@/api/user.types";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const PickupMap = dynamic(() => import("./PickupMap"), {
  loading: () => null,
  ssr: false,
});

type DeliveryDetailsProps = {
  data: ShoppingCartEntry[] | undefined;
  onInfoSubmit: (deliveryDetails?: UserAddress) => void;
  onInfoEdit: () => void;
};

// Displays a form for the user to fill out their delivery information, as well as a map showing all the locations to pick up their items
export function DeliveryDetails({
  data,
  onInfoSubmit,
  onInfoEdit,
}: DeliveryDetailsProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [deliveryFormData, setDeliveryFormData] = useState<UserAddress>({
    street_name: "",
    post_code: "",
    city: "",
    province: "BC",
    country: "",
  });

  // updates a specific attribute in the user's address whenever they type something
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setDeliveryFormData({ ...deliveryFormData, [name]: value });
  };

  // validates the delivery address form info and then sets the form as submitted
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let validForm = true;
    Object.values(deliveryFormData).forEach((value, index) => {
      if (value === "") {
        validForm = false;
      }
    });

    if (validForm) {
      onInfoSubmit(deliveryFormData);
      setFormSubmitted(true);
    }
  };

  // a form that asks for the user's address
  function getDeliveryDetails(): React.JSX.Element {
    return (
      <div>
        <p className="mb-3 text-lg">
          Please enter the address you want the shipped items to be shipped to:
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            className="mb-1"
            label="Street Address"
            name="street_name"
            placeholder="Enter your street address"
            isRequired
            onChange={handleInputChange}
            defaultValue={deliveryFormData.street_name}
          />
          <Input
            className="mb-1"
            label="Postal Code"
            name="post_code"
            placeholder="Enter your postal code"
            isRequired
            onChange={handleInputChange}
            defaultValue={deliveryFormData.post_code}
          />
          <Input
            className="mb-1"
            label="City"
            name="city"
            placeholder="Enter your city"
            isRequired
            onChange={handleInputChange}
            defaultValue={deliveryFormData.city}
          />
          <Select
            label="Select a province/territory"
            name="province"
            className="max-w-xs mb-1"
            isRequired
            onChange={handleInputChange}
            defaultSelectedKeys={[deliveryFormData.province]}
          >
            {PROVINCES.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </Select>
          <Input
            className="mb-1"
            label="Country"
            name="country"
            placeholder="Enter your country"
            isRequired
            onChange={handleInputChange}
            defaultValue={deliveryFormData.country}
          />
          <Button
            type="submit"
            color="primary"
            className="w-fit self-center mt-3"
          >
            Save
          </Button>
        </form>
      </div>
    );
  }

  // displays the address info that the user entered previously
  function displayDeliveryDetails(): React.JSX.Element {
    return (
      <div>
        <p className="mb-1 text-lg">Shipping Details:</p>
        <p>Address: {deliveryFormData.street_name}</p>
        <p>Postal Code: {deliveryFormData.post_code}</p>
        <p>City: {deliveryFormData.city}</p>
        <p>Province: {deliveryFormData.province}</p>
        <p>Country: {deliveryFormData.country}</p>
        <Button
          type="submit"
          className="w-fit self-center mt-3"
          onClick={() => {
            setFormSubmitted(false);
            onInfoEdit();
          }}
        >
          Edit
        </Button>
      </div>
    );
  }

  // Displays a form for user to fill out their address, as well as a map with the locations of the warehouses to pick up their items
  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl flex justify-center mb-2">
          Item delivery details:
        </h3>
        {!formSubmitted ? getDeliveryDetails() : displayDeliveryDetails()}
      </div>
      <div className="w-full h-96">
        <PickupMap data={data} />
      </div>
    </div>
  );
}
