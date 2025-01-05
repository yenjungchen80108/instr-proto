import { useState } from "react";

const useImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Convert file to base64 URL for preview
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null); // Clear image if validation failed
    }
  };

  return {
    uploadedImage,
    handleImageChange,
  };
};

export default useImageUploader;
