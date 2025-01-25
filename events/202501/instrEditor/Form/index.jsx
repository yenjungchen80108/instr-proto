import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import Dropdown from "@/components/Fields/DropDown";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import ImageWithCollapseModal from "../components/ImageWithCollapseModal";
import ImageWithNavTab from "../components/ImageWithNavTab";
import SingleStaticImage from "../components/SingleStaticImage";
import FloatImages from "../components/FloatImages";
import Terms from "../components/Terms";

import { instrConfigToFormFields } from "@/hoc/jsonAdapter";

import { FIELD_TYPE } from "../constant";
import { StyledFormBlock, StyledBtn, StyledSaveBtn } from "./styles";

const formComponents = {
  [FIELD_TYPE?.STATIC_IMAGE]: SingleStaticImage,
  [FIELD_TYPE?.IMAGE_WITH_NAV_TAB]: ImageWithNavTab,
  [FIELD_TYPE?.IMAGE_WITH_COLLAPSE_MODAL]: ImageWithCollapseModal,
  [FIELD_TYPE?.FLOAT_IMAGES]: FloatImages,
  [FIELD_TYPE?.TERMS]: Terms,
};

const Form = ({ className, onSubmit = () => null }) => {
  const {
    instrConfig: { formFields },
    actConfig: { panelsConfig },
  } = useSelector(instrConfigSelector);
  const [formData, setFormData] = useState([]);

  const router = useRouter();
  const { instrPageId } = router.query;

  useEffect(() => {
    // const defaultFormData = panelsConfig?.[instrPageId] || {};
    const currentFormFields =
      instrConfigToFormFields(panelsConfig, formFields) || [];

    if (instrPageId) {
      setFormData(currentFormFields);
    }
  }, [instrPageId]);

  const defaultValues = formData.reduce((acc, item, index) => {
    item.fields.forEach((field) => {
      if (field.registerName) {
        const uniqueKey = `${field.registerName}_${index}`;
        acc[uniqueKey] = String(field.value) || "";
      }
    });
    return acc;
  }, {});

  const methods = useForm({
    mode: "onBlur",
    defaultValues,
  });

  // const [selectedFormId, setSelectedFormId] = useState("");
  // const SelectedComponent = formComponents[selectedFormId];
  const [dropdowns, setDropdowns] = useState([
    { id: 1, selectedFormId: "" }, // init first dropdown
  ]);

  const addDropdown = () => {
    setDropdowns((prev) => [
      ...prev,
      { id: prev.length + 1, selectedFormId: "" },
    ]);
  };

  const removeDropdown = (id) => {
    setDropdowns((prev) => prev.filter((dropdown) => dropdown.id !== id));
  };

  const handleSelect = (id, selectedValue) => {
    setDropdowns((prev) =>
      prev.map((dropdown) =>
        dropdown.id === id
          ? { ...dropdown, selectedFormId: selectedValue }
          : dropdown
      )
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods?.handleSubmit(onSubmit)}
        // autoComplete="off"
      >
        {/* v1 <Dropdown
          formFields={formFields}
          onSelect={setSelectedFormId}
          mb="6px"
        />
        {SelectedComponent ? (
          <SelectedComponent />
        ) : (
          <div>未選擇說明頁類型</div>
        )} */}

        {/* v2 {dropdowns?.map((dropdown, index) => {
          const SelectedComponent = formComponents[dropdown?.selectedFormId];
          
          return (
            <StyledFormBlock key={index}>
              <div>
                <Dropdown
                  formFields={formFields}
                  onSelect={(selectedFormId) =>
                    handleSelect(dropdown.id, selectedFormId)
                  }
                  mb="6px"
                />
                {SelectedComponent ? (
                  <SelectedComponent />
                ) : (
                  <div>未選擇說明頁類型</div>
                )}
                <StyledBtn
                  type="button"
                  onClick={() => removeDropdown(dropdown.id)}
                  // my="10px"
                >
                  -
                </StyledBtn>
              </div>
              <hr className="horizontal-line" />
            </StyledFormBlock>
          );
        })} */}
        {formData?.map((data, index) => {
          const dropDownType = data?.dropType;
          const SelectedComponent = formComponents[dropDownType];

          return (
            <StyledFormBlock key={index}>
              <Dropdown
                dropType={dropDownType}
                formFields={formFields}
                onSelect={(selectedFormId) =>
                  handleSelect(dropDownType, selectedFormId)
                }
                mb="10px"
              />
              {SelectedComponent ? (
                <SelectedComponent
                  formId={index}
                  fields={data.fields}
                  defaultValues={defaultValues}
                />
              ) : (
                <div>未選擇說明頁類型</div>
              )}
              <StyledBtn type="button" onClick={() => removeDropdown(data.id)}>
                -
              </StyledBtn>

              <hr className="horizontal-line" />
            </StyledFormBlock>
          );
        })}

        {/* 添加按钮 */}
        <StyledBtn type="button" onClick={addDropdown}>
          +
        </StyledBtn>
        {/* 提交按钮 */}
        <StyledSaveBtn
          type="submit"
          style={{ marginTop: "10px", padding: "15px 20px" }}
        >
          Save
        </StyledSaveBtn>
      </form>
    </FormProvider>
  );
};

export default styled(Form)`
  padding: 10px 8px;
`;
