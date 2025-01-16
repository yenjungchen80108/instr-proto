import { useState } from "react";

const UploadButton = ({ fileName, configData }) => {
  const [uploadStatus, setUploadStatus] = useState("");

  const handleUpload = async () => {
    // const fileName = "example.json"; // 假设文件名固定或从输入框获取

    try {
      // 1. 调用服务端 API 获取预签名 URL
      const response = await fetch("/api/generate-presigned-url", {
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
      console.log({ url, key });

      // 2. 使用预签名 URL 上传文件
      // const fileContent = JSON.stringify(configData); // 假设这是需要上传的 JSON 数据
      // const uploadResponse = await fetch(url, {
      //   method: "PUT",
      //   body: fileContent,
      //   headers: {
      //     "Content-Type": "application/json", // 文件类型必须与服务端指定的一致
      //   },
      // });

      // if (!uploadResponse.ok) {
      //   throw new Error("Failed to upload file to S3");
      // }

      // setUploadStatus(`File uploaded successfully to: ${key}`);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed");
    }
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload JSON to S3</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadButton;
