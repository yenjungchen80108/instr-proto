import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";

import { useHandleUpload } from "@/hooks/useHandleUpload";

const UploadBlock = ({ fileName, configData, children }) => {
  const [jsonData, setJsonData] = useState(configData);
  const [tempJson, setTempJson] = useState(JSON.stringify(configData, null, 2));

  const { handleUpload, uploadStatus } = useHandleUpload();

  const onUploadClick = async (e) => {
    e.preventDefault();
    handleUpload(fileName, jsonData);
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
          <button onClick={onUploadClick}>Upload JSON to S3</button>
          {uploadStatus && <p>{uploadStatus}</p>}
          {children}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default styled(UploadBlock)``;
