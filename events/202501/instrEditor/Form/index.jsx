import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import VersionSelector from "../components/VersionSelector";
import { S3_FILE_NAME } from "@/events/202501/actPage/constant";

import * as Tabs from "@radix-ui/react-tabs";

import Edit from "./Edit";
import Preview from "./Preview";

import { instrConfigToFormFields } from "@/utils/jsonAdapter";
import { extractRegisterValues } from "./utils";

const Form = ({ fileName, instrTabId }) => {
  const {
    instrConfig: { formFields },
    actConfig: { panelsConfig },
    instrTempConfig,
  } = useSelector(instrConfigSelector);
  const [formData, setFormData] = useState([]);

  const { panelData } = panelsConfig?.[instrTabId] || {};

  const [currentPanelData, setCurrentPanelData] = useState(panelData);

  useEffect(() => {
    // 如果 instrTempConfig 有值，則更新 currentPanelData
    if (instrTempConfig?.length > 0) {
      setCurrentPanelData(instrTempConfig);
    }

    const currentFormFields =
      instrConfigToFormFields(currentPanelData, formFields) || [];
    setFormData(currentFormFields);
  }, [instrTempConfig, panelsConfig, currentPanelData]);

  const defaultValues = formData.reduce((acc, item, index) => {
    if (item.fields && Array.isArray(item.fields)) {
      extractRegisterValues(item.fields, acc, index);
    }
    return acc;
  }, {});

  const methods = useForm({
    mode: "onChange",
    defaultValues,
    shouldFocusError: false,
  });

  const tabConfig = [
    {
      label: "Edit",
      value: "edit",
      content: (
        <>
          <VersionSelector onSelect={(versionId) => loadConfig(versionId)} />
          <Edit
            methods={methods}
            formData={formData} // 表單基本資料
            defaultValues={defaultValues} // 表單預設值
            currentPanelData={currentPanelData} // 當前表單資料
          />
        </>
      ),
    },
    {
      label: "Preview",
      value: "preview",
      content: (
        <Preview
          panelData={currentPanelData} // 預覽資料
          fileName={fileName}
          instrTabId={instrTabId}
          panelsConfig={panelsConfig}
        />
      ),
    },
  ];

  // 下拉選單選擇版本時，更新表單資料
  const loadConfig = async (versionId) => {
    const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
    const objectKey = S3_FILE_NAME;

    const url = `https://${bucket}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${objectKey}?versionId=${versionId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      console.log("Fetched Data:", data); // 检查数据结构

      // if (Array.isArray(data)) {
      //   setCurFormData(data); // 只有是数组才更新
      // } else {
      //   console.error("Error: API did not return an array");
      //   setCurFormData([]); // 设为空数组，避免 map 错误
      // }
    } catch (error) {
      console.error("Error loading config:", error);
      // setCurFormData([]); // 发生错误时设为空数组
    }
  };

  return (
    <FormProvider {...methods}>
      <form autoComplete="off">
        <Tabs.Root className="TabsRoot" defaultValue="edit">
          <Tabs.List className="TabsList" aria-label="">
            {tabConfig.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                className="TabsTrigger"
                value={tab.value}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {tabConfig.map((tab) => (
            <Tabs.Content
              key={tab.value}
              className="TabsContent"
              value={tab.value}
            >
              {tab.content}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </form>
    </FormProvider>
  );
};

export default styled(Form)`
  padding: 10px 8px;

  .btn-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
