import { useState } from "react";
import Image from "next/image";

export default function ImageSelector() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="w-full mt-4">
      <h2>IMAGE SELECTOR</h2>
      <div className="flex justify-between mt-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <Image
            key={index}
            width={100}
            height={100}
            src={`/images/grey.jpg`}
            alt={`grey.jpg`}
            className={`cursor-pointer ${selectedImage === `/images/grey.jpg` ? "border-2 border-blue-500" : ""}`} ////images/image${index}.jpg
          />
        ))}
      </div>
      <div className="mt-2">
        Selected Image:{" "}
        {selectedImage ? (
          <img src={selectedImage} alt="Selected Image" className="w-20 h-20" />
        ) : (
          "None"
        )}
      </div>
    </div>
  );
}
