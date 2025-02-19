import { useState, useCallback } from "react";
import { toast } from "react-toastify";

/**
 * 封裝上傳到 S3 的邏輯
 *
 * @returns {Object} { handleUpload, uploadStatus }
 *   - handleUpload: 上傳函式，可在任何地方呼叫
 *   - uploadStatus: 當前上傳狀態字串 (成功或失敗訊息)
 */
export const useHandleUpload = () => {
  const [uploadStatus, setUploadStatus] = useState("");

  /**
   * @param {string} fileName - 要上傳到 S3 的檔名
   * @param {any} dataToUpload - 要上傳的 JSON 資料
   */
  const handleUpload = useCallback(async (fileName, dataToUpload) => {
    try {
      // 1. 向後端拿 presigned URL
      const response = await fetch("/api/gen-presigned-post-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });
      if (!response.ok) {
        throw new Error("Failed to get presigned URL");
      }
      const { url, key } = await response.json();

      // 2. 直接使用 presigned URL 上傳檔案內容
      // 先把 dataToUpload 轉成 JSON 字串
      const fileContent = JSON.stringify(dataToUpload);
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: fileContent,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      toast.success(`S3 Upload Success - config: ${fileName}`);
      setUploadStatus(`File uploaded successfully to: ${key}`);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`S3 Upload Error- config: ${error}`);
      setUploadStatus("Upload failed");
    }
  }, []);

  return { handleUpload, uploadStatus };
};
