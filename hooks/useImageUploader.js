import { useState } from "react";

const useImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage({
          previewUrl: reader.result, // Base64 URL
          fileName: file.name, // 文件名
        });
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
    }
  };

  return {
    uploadedImage,
    handleImageChange,
  };
};

export default useImageUploader;
