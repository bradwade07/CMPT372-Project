import { CheckboxGroup } from "@nextui-org/react";
import React from "react";
import { CustomCheckbox } from "@/components/general";
import { useQuery } from "@tanstack/react-query";
import { getProductTags } from "@/api/product";

type TagsInputProps = {
  handleInputChange(value: string[]): void;
};

export default function TagsInput({ handleInputChange }: TagsInputProps) {
  const { data } = useQuery({
    queryKey: ["Product Tags"],
    queryFn: getProductTags,
  });

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
        {data?.map((tag) => (
          <span key={tag}>
            <CustomCheckbox value={tag}>{tag}</CustomCheckbox>
          </span>
        ))}
      </CheckboxGroup>
    </div>
  );
}
