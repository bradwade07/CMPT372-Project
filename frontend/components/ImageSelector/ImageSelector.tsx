import { MouseEventHandler, useState } from "react";
import { Image, Button } from "@nextui-org/react";
import { ProductFull } from "@/api/product.types";

export default function ImageSelector(imageData: ProductFull) {
  const [selectedImage, setSelectedImage] = useState("");
  const [pictures, setPictures] = useState([imageData.product_main_img]);
  const [firstTimeRender, setFirstTimeRender] = useState(true);
  if (firstTimeRender) {
    if (imageData.additional_img) {
      let list = pictures;
      for (let i = 0; i < imageData.additional_img.length; i++) {
        list[i + 1] = imageData.additional_img[i];
      }
      setPictures(list);
    }

    setFirstTimeRender(false);
    setSelectedImage(pictures[0]);
  }

  const handleSelected = (index: any): MouseEventHandler<HTMLImageElement> => {
    return (event: any) => {
      setSelectedImage(index);
    };
  };
  return (
    <>
      <div className="relative w-full h-[30rem]">
        <Image
          isZoomed
          src={`data:image/jpeg;base64, ${selectedImage}`}
          alt="Product Image"
          className="object-contain max-w-[40rem] min-w-[40rem] max-h-[40rem] min-h-[40rem]"
        />
      </div>
      <div className="w-full mt-4">
        <h2>IMAGE SELECTOR</h2>
        <div className="flex justify-between mt-[10rem]">
          {pictures.map((index: any) => (
            <Image
              onClick={handleSelected(index)}
              isZoomed
              key={index}
              src={`data:image/jpeg;base64, ${index}`}
              alt={`grey.jpg`}
              className={`cursor-pointer max-w-[4rem] min-w-[4rem] max-h-[4rem] min-h-[4rem]`} ////images/image${index}.jpg
            />
          ))}
        </div>
      </div>
    </>
  );
}
