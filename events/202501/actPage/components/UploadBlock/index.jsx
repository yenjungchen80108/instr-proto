import { useState, useCallback } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";

/*
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
*/

const UploadBlock = ({ fileName, configData, children }) => {
  const [jsonData, setJsonData] = useState(configData);
  const [tempJson, setTempJson] = useState(JSON.stringify(configData, null, 2));
  const [uploadStatus, setUploadStatus] = useState("");

  /*
  const debouncedUpdateJson = useCallback(
    debounce((updatedJson) => {
      try {
        const parsedJson = JSON.parse(updatedJson); // 验证 JSON 格式
        setJsonData(parsedJson); // 更新最终的 JSON 数据
      } catch (err) {
        console.error("Invalid JSON format:", err);
      }
    }, 1000),
    []
  );

  // 用户修改 JSON 的方法
  const handleJsonChange = (event) => {
    const updatedJson = event.target.value;
    setTempJson(updatedJson); // 实时更新临时 JSON 数据
    debouncedUpdateJson(updatedJson); // 延迟更新最终 JSON 数据
  };
  */

  const handleUpload = async () => {
    // const fileName = "example.json"; // 假设文件名固定或从输入框获取

    try {
      // 1. 调用服务端 API 获取预签名 URL
      const response = await fetch("/api/gen-presigned-url", {
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
      // console.log({ url, key });

      // 2. 使用预签名 URL 上传文件
      const fileContent = JSON.stringify(jsonData); // 假设这是需要上传的 JSON 数据
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: fileContent,
        headers: {
          "Content-Type": "application/json", // 文件类型必须与服务端指定的一致
        },
      });
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }
      setUploadStatus(`File uploaded successfully to: ${key}`);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed");
    }
  };

  return (
    <div>
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList" aria-label="">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            JSON
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            Upload
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <textarea
            value={tempJson} // 显示 JSON 数据
            // onChange={handleJsonChange} // 监听用户修改
            rows={100}
            cols={50}
            readOnly
          ></textarea>
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <button onClick={handleUpload}>Upload JSON to S3</button>
          {uploadStatus && <p>{uploadStatus}</p>}
          {children}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default styled(UploadBlock)``;
