import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import Dropdown from "@/components/Fields/DropDown";
import {
  instrConfigSelector,
  imageUploaderSelector,
} from "@/events/202501/instrEditor/store/selector";
import ImageWithCollapseModal from "../components/ImageWithCollapseModal";
import ImageWithNavTab from "../components/ImageWithNavTab";
import SingleStaticImage from "../components/SingleStaticImage";
import FloatImages from "../components/FloatImages";
import Terms from "../components/Terms";

import { instrConfigToFormFields } from "@/hoc/jsonAdapter";
import { FIELD_TYPE } from "../constant";
import { StyledFormBlock, StyledBtn, StyledSaveBtn } from "./styles";
import { extractRegisterValues } from "./utils";

const formComponents = {
  [FIELD_TYPE?.STATIC_IMAGE]: SingleStaticImage,
  [FIELD_TYPE?.IMAGE_WITH_NAV_TAB]: ImageWithNavTab,
  [FIELD_TYPE?.IMAGE_WITH_COLLAPSE_MODAL]: ImageWithCollapseModal,
  [FIELD_TYPE?.FLOAT_IMAGES]: FloatImages,
  [FIELD_TYPE?.TERMS]: Terms,
};

const Form = ({ className }) => {
  const {
    instrConfig: { formFields },
    actConfig: { panelsConfig },
  } = useSelector(instrConfigSelector);
  const [formData, setFormData] = useState([]);
  const [isPreview, setIsPreview] = useState(false); // 是否為預覽模式
  const [uploaded, setUploaded] = useState(false); // 是否已上傳成功
  const { modifiedImages } = useSelector(imageUploaderSelector) || {};

  useEffect(() => {
    const currentFormFields =
      instrConfigToFormFields(panelsConfig, formFields) || [];
    setFormData(currentFormFields);
  }, []);

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

  const handleSave = methods.handleSubmit((data) => {
    console.log("儲存成功:", data);
    console.log("modifiedImages", modifiedImages);
    setIsPreview(true); // 進入預覽模式
  });

  const handlePreview = () => {};

  const handleUpload = async () => {
    try {
      console.log("開始上傳...");
      // 假設這裡是上傳到 S3 的 API 調用
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 模擬上傳延遲
      setUploaded(true);
      alert("上傳成功！");
    } catch (error) {
      console.error("上傳失敗:", error);
      alert("上傳失敗，請重試！");
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={className} autoComplete="off">
        {formData?.map((data, index) => {
          const SelectedComponent = formComponents[data?.dropType];
          return (
            <StyledFormBlock key={index}>
              <Dropdown
                dropType={data?.dropType}
                formFields={formFields}
                disabled={isPreview}
              />
              {SelectedComponent ? (
                <SelectedComponent
                  formId={index}
                  fields={data.fields}
                  defaultValues={defaultValues}
                  disabled={isPreview} // 禁用所有表單欄位
                />
              ) : (
                <div>未選擇說明頁類型</div>
              )}
              <hr className="horizontal-line" />
            </StyledFormBlock>
          );
        })}

        {/* 預覽模式顯示 Edit & Upload */}
        <div className="btn-group">
          {isPreview ? (
            <>
              <StyledSaveBtn mr="10px" type="button" onClick={handleUpload}>
                Upload
              </StyledSaveBtn>
              <StyledSaveBtn mr="10px" type="button" onClick={handlePreview}>
                Preview
              </StyledSaveBtn>
              <StyledBtn type="button" onClick={() => setIsPreview(false)}>
                Edit
              </StyledBtn>
            </>
          ) : (
            <StyledSaveBtn type="submit" onClick={handleSave}>
              Save
            </StyledSaveBtn>
          )}
        </div>
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
