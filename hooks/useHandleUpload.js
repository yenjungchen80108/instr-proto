import { useState, useCallback } from "react";
import { toast } from "react-toastify";

/**
 * 處理 S3 上傳邏輯
 */
export const useHandleUpload = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [initialETag, setInitialETag] = useState(null); // 記錄初始 ETag
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [latestData, setLatestData] = useState(null);

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

      // 只在打開編輯器時記錄 initialETag
      // if (!initialETag) {
      //   setInitialETag(latestETag);
      // }

      return { url, latestETag };
    } catch (error) {
      console.error("Error getting presigned URL:", error);
    }
  }, []);

  /**
   * 處理上傳邏輯
   */
  const handleUpload = useCallback(
    async (fileName, dataToUpload) => {
      try {
        // **獲取 Presigned URL 和 最新的 ETag**
        const { url, latestETag } = await fetchPresignedUrl(fileName);

        // **比對 initialETag 和 latestETag**
        if (initialETag && latestETag !== initialETag) {
          console.warn("Version conflict detected!");
          setShowConflictModal(true);
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

          // **獲取最新數據**
          const latestConfigResponse = await fetch(
            `/api/get-latest-config?fileName=${fileName}`
          );
          if (latestConfigResponse.ok) {
            const latestConfig = await latestConfigResponse.json();
            setLatestData(latestConfig);
          }

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
    [initialETag]
  );

  return {
    handleUpload,
    uploadStatus,
    showConflictModal,
    setShowConflictModal,
    latestData,
    setInitialETag,
  };
};
