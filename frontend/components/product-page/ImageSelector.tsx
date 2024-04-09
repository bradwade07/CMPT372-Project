import { MouseEventHandler, useState } from "react";
import { Image } from "@nextui-org/react";
import { ProductFull } from "@/api/product.types";

export default function ImageSelector({
  product_main_img,
  additional_img,
}: {
  product_main_img: string;
  additional_img: string[];
}) {
  const [selectedImage, setSelectedImage] = useState("");
  const [pictures, setPictures] = useState([product_main_img]);
  const [firstTimeRender, setFirstTimeRender] = useState(true);
  if (firstTimeRender) {
    if (additional_img) {
      let list = pictures;
      for (let i = 0; i < additional_img.length; i++) {
        list[i + 1] = additional_img[i];
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
          src={`data:image/jpeg;base64, ${selectedImage}`}
          alt="Product Image"
          className="object-contain max-w-[40rem] min-w-[40rem] max-h-[40rem] min-h-[40rem]"
        />
      </div>
      <div className="w-full mt-[10.5rem]">
        <div className="flex justify-between mt-[10rem]">
          {pictures.map((index: any) => (
            <Image
              onClick={handleSelected(index)}
              isZoomed
              key={index}
              src={`data:image/jpeg;base64, ${index}`}
              alt={`grey.jpg`}
              className={`cursor-pointer object-contain max-w-[4rem] min-w-[4rem] max-h-[4rem] min-h-[4rem]`} ////images/image${index}.jpg
            />
          ))}
        </div>
      </div>
    </>
  );
}
