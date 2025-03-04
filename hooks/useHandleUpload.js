import { useState, useCallback } from "react";
import { toast } from "react-toastify";

/**
 * 處理 S3 上傳邏輯
 */
export const useHandleUpload = (fileName) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [latestETag, setLatestETag] = useState(null);

  /**
   * 獲取 Presigned URL 並獲取最新 ETag
   */
  const fetchPresignedUrl = useCallback(async (fileName) => {
    try {
      const response = await fetch("/api/gen-presigned-post-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) throw new Error("Failed to get presigned URL");

      const { url, latestETag } = await response.json();

      return { url, latestETag };
    } catch (error) {
      console.error("Error getting presigned URL:", error);
    }
  }, []);

  /**
   * 處理上傳邏輯
   */
  const handleUpload = useCallback(
    async (fileName, dataToUpload, initialETag) => {
      try {
        // **獲取 Presigned URL 和 最新的 ETag**
        const { url, latestETag } = await fetchPresignedUrl(fileName);

        console.log("initialETag", initialETag);
        console.log("latestETag", latestETag);

        // **比對 initialETag 和 latestETag**
        if (initialETag && latestETag !== initialETag) {
          console.warn("Version conflict detected!");
          setShowConflictModal(true);
          setLatestETag(latestETag);
          return;
        }

        // **上傳數據**
        const fileContent = JSON.stringify(dataToUpload);

        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: fileContent,
          headers: {
            "Content-Type": "application/json",
            "If-Match": initialETag, // 讓 S3 進行版本沖突檢測
          },
        });

        // **處理 412 版本沖突**
        if (uploadResponse.status === 412) {
          console.warn("Version conflict detected!");
          setShowConflictModal(true);
          return;
        }

        if (!uploadResponse.ok) throw new Error("Failed to upload file to S3");

        toast.success(`S3 Upload Success - config: ${fileName}`);
        setUploadStatus(`File uploaded successfully`);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error(`S3 Upload Error: ${error}`);
        setUploadStatus("Upload failed");
      }
    },
    []
  );

  return {
    handleUpload,
    uploadStatus,
    showConflictModal,
    setShowConflictModal,
    latestETag,
  };
};
