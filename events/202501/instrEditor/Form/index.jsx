import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";

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
        <Edit
          methods={methods}
          formData={formData} // 表單基本資料
          defaultValues={defaultValues} // 表單預設值
          currentPanelData={currentPanelData} // 當前表單資料
        />
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
