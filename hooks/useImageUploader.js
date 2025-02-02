import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setModifiedImage,
  removeModifiedImage,
} from "@/events/202501/instrEditor/store/imageUploader/slice";
import { imageUploaderSelector } from "@/events/202501/instrEditor/store/selector";
import { toast } from "react-toastify";

const useImageUploader = () => {
  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState(null);

  const { modifiedImages } = useSelector(imageUploaderSelector) || {};
  // console.log("modifiedImages", modifiedImages);

  // 選擇新圖片
  const handleImageChange = (file, defaultValue) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage({
          previewUrl: reader.result, // Base64 URL
          fileName: file.name, // 文件名
        });
      };
      reader.readAsDataURL(file);
      dispatch(setModifiedImage({ key: defaultValue, file }));
    }
  };

  // 上傳圖片到 S3
  const uploadToS3 = async ({ defaultValue }) => {
    const file = modifiedImages[defaultValue];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", defaultValue);
    formData.append("fileType", file.type);

    console.log("file", file);

    try {
      const response = await fetch("/api/upload-to-s3", {
        method: "POST",
        body: formData, // 发送 FormData
      });

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to upload image to S3");
      }

      const { fileUrl } = await response.json();
      console.log("S3 Upload Success:", fileUrl);
      toast.success(`S3 Upload Success: ${fileUrl}`);

      dispatch(removeModifiedImage(defaultValue)); // 上传成功后移除

      return fileUrl;
    } catch (error) {
      console.error("S3 Upload Error:", error);
      toast.error(`S3 Upload Error: ${error.message}`);
      return null;
    }
  };

  const batchUploadImages = async () => {
    for (const defaultValue in modifiedImages) {
      const file = modifiedImages[defaultValue];
      await uploadToS3(file, defaultValue);
    }
  };

  return {
    uploadedImage,
    handleImageChange,
    uploadToS3,
    batchUploadImages,
  };
};

export default useImageUploader;
