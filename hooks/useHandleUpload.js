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
  const [currentETag, setCurrentETag] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [latestData, setLatestData] = useState(null);

  /**
   * 获取 presigned URL，并存下当前 `ETag`
   */
  const fetchPresignedUrl = useCallback(async (fileName) => {
    try {
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

      const { url, key, latestETag } = await response.json();
      setCurrentETag(latestETag); // 记录当前 ETag
      return { url, key, latestETag };
    } catch (error) {
      console.error("Error getting presigned URL:", error);
    }
  }, []);

  /**
   * 处理上传逻辑，检查 `ETag`
   */
  const handleUpload = useCallback(
    async (fileName, dataToUpload) => {
      try {
        // 1️⃣ **获取 S3 最新的 ETag**
        const latestResponse = await fetch(`/api/gen-presigned-post-url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName }),
        });

        if (!latestResponse.ok) {
          throw new Error("Failed to fetch latest ETag");
        }

        const { latestETag } = await latestResponse.json();

        // 2️⃣ **如果 `currentETag` 不是最新，阻止上传**
        if (currentETag && latestETag !== currentETag) {
          console.warn("Version conflict detected!");

          setShowConflictModal(true);
          return;
        }

        // 3️⃣ **上传数据**
        const { url } = await fetchPresignedUrl(fileName);
        const fileContent = JSON.stringify(dataToUpload);

        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: fileContent,
          headers: {
            "Content-Type": "application/json",
            "If-Match": currentETag, // **S3 进行 ETag 版本冲突检测**
          },
        });

        // 4️⃣ **处理 412 冲突**
        if (uploadResponse.status === 412) {
          console.warn("Version conflict detected!");

          const latestConfigResponse = await fetch(
            `/api/get-latest-config?fileName=${fileName}`
          );
          if (latestConfigResponse.ok) {
            const latestConfig = await latestConfigResponse.json();
            setLatestData(latestConfig);
          }

          setShowConflictModal(true);
          return;
        }

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file to S3");
        }

        toast.success(`S3 Upload Success - config: ${fileName}`);
        setUploadStatus(`File uploaded successfully`);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error(`S3 Upload Error: ${error}`);
        setUploadStatus("Upload failed");
      }
    },
    [currentETag]
  );

  return {
    handleUpload,
    uploadStatus,
    showConflictModal,
    setShowConflictModal,
    latestData,
  };
};
