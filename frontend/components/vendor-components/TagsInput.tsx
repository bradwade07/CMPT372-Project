import { CheckboxGroup } from "@nextui-org/react";
import React from "react";
import { CustomCheckbox } from "@/components/general";
import { useQuery } from "@tanstack/react-query";
import { getProductTags } from "@/api/product";

type TagsInputProps = {
  handleInputChange(value: string[]): void;
  isInvalid?: boolean;
  errorMessage?: React.ReactNode;
};

// Displays the input for the user to choose all the tags that apply to the new product
export default function TagsInput({
  handleInputChange,
  isInvalid,
  errorMessage,
}: TagsInputProps) {
  const { data } = useQuery({
    queryKey: ["Product Tags"],
    queryFn: getProductTags,
  });

  const [groupSelected, setGroupSelected] = React.useState<string[]>([]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <CheckboxGroup
        className="gap-1"
        label="Select Product Tags (Min. 1)"
        classNames={{
          label: isInvalid && "text-[#F31260]",
        }}
        orientation="horizontal"
        name="product_tags"
        value={groupSelected}
        isRequired
        onChange={(value) => {
          setGroupSelected(value as string[]);
          handleInputChange(value as string[]);
        }}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
      >
        {data?.map((tag) => (
          <span key={tag}>
            <CustomCheckbox value={tag}>{tag}</CustomCheckbox>
          </span>
        ))}
      </CheckboxGroup>
    </div>
  );
}
