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
      <div className="relative w-full h-96">
        <Image
          isZoomed
          width={1000}
          height={1000}
          src={`data:image/jpeg;base64, ${selectedImage}`}
          alt="Product Image"
          className="object-contain"
        />
      </div>
      <div className="w-full mt-4">
        <h2>IMAGE SELECTOR</h2>
        <div className="flex justify-between mt-2">
          {pictures.map((index: any) => (
            <Image
              onClick={handleSelected(index)}
              isZoomed
              key={index}
              width={100}
              height={100}
              src={`data:image/jpeg;base64, ${index}`}
              alt={`grey.jpg`}
              className={`cursor-pointer `} ////images/image${index}.jpg
            />
          ))}
        </div>
      </div>
    </>
  );
}
