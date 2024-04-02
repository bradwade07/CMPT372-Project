import { CheckboxGroup } from "@nextui-org/react";
import React from "react";
import { CustomCheckbox } from "./CustomCheckbox";

type TagsInputProps = {
  handleInputChange(value: string[]): void;
};

export default function TagsInput({ handleInputChange }: TagsInputProps) {
  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        className="gap-1"
        label="Select Product Tags"
        orientation="horizontal"
        name="product_tags"
        value={groupSelected}
        onChange={(value) => {
          setGroupSelected(value as string[]);
          handleInputChange(value as string[]);
        }}
      >
        <CustomCheckbox value="Electronics">Electronics</CustomCheckbox>
        <CustomCheckbox value="Fashion">Fashion</CustomCheckbox>
        <CustomCheckbox value="Kitchen">Kitchen</CustomCheckbox>
        <CustomCheckbox value="Home">Home</CustomCheckbox>
        <CustomCheckbox value="Garden">Garden</CustomCheckbox>
        <CustomCheckbox value="Toys">Toys</CustomCheckbox>
      </CheckboxGroup>
    </div>
  );
}
