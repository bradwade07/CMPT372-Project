import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type AdditionalImgInputProps = {
  handleInputChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;
  onAmountDecrease(curAmount: number): void;
};

// Displays a variable number of file uploads for a vendor to upload additional images for product
export function AdditionalImgInput({
  handleInputChange,
  onAmountDecrease,
}: AdditionalImgInputProps) {
  const MAX_ADDITIONAL_IMG = 8;

  const [numOfAdditionalImg, setNumOfAdditionalImg] = useState(0);

  // displays the variable number of file upload inputs, depending on the number of additional images that is set
  const renderAdditonalImgInput = (): React.JSX.Element[] => {
    const elements = [];
    for (let i = 0; i < numOfAdditionalImg; i++) {
      elements.push(
        <div
          className="flex flex-col mb-2 w-fit md:w-1/2 lg:w-5/12 xl:w-1/3"
          key={i}
        >
          <label
            className="text-sm pb-[6px] hover:cursor-pointer"
            htmlFor={`additional_img_${i + 1}`}
            aria-required
          >
            Additional Product Image {i + 1}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="text-sm hover:cursor-pointer"
            id={`additional_img_${i + 1}`}
            name={`additional_img_${i + 1}`}
            type="file"
            accept="image/jpeg, image/png"
            required
            onChange={handleInputChange}
          />
        </div>,
      );
    }
    return elements;
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <label className="text-lg pb-[6px]">
          Additional Product Images (max. {MAX_ADDITIONAL_IMG})
        </label>
        <div className="flex text-center align-middle justify-center space-x-2">
          <Button
            type="button"
            className={`flex text-3xl bg-green-500 ${numOfAdditionalImg >= MAX_ADDITIONAL_IMG && "invisible pointer-events-none"}`}
            radius="full"
            isIconOnly
            onClick={() => setNumOfAdditionalImg(numOfAdditionalImg + 1)}
          >
            <AddIcon />
          </Button>
          <Button
            type="button"
            className={`flex text-3xl bg-red-500 ${numOfAdditionalImg <= 0 && "invisible pointer-events-none"}`}
            radius="full"
            isIconOnly
            onClick={() => {
              onAmountDecrease(numOfAdditionalImg - 1);
              setNumOfAdditionalImg(numOfAdditionalImg - 1);
            }}
          >
            <RemoveIcon />
          </Button>
        </div>
      </div>
      {renderAdditonalImgInput()}
    </>
  );
}
