import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import styled from "styled-components";
import Dropdown from "@/components/Fields/DropDown";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import ImageWithCollapseModal from "../components/ImageWithCollapseModal";
import ImageWithNavTab from "../components/ImageWithNavTab";
import SingleStaticImage from "../components/SingleStaticImage";
import FloatImages from "../components/FloatImages";
import Terms from "../components/Terms";

import { FIELD_TYPE } from "../constant";

const formComponents = {
  [FIELD_TYPE?.STATIC_IMAGE]: SingleStaticImage,
  [FIELD_TYPE?.IMAGE_WITH_NAV_TAB]: ImageWithNavTab,
  [FIELD_TYPE?.IMAGE_WITH_COLLAPSE_MODAL]: ImageWithCollapseModal,
  [FIELD_TYPE?.FLOAT_IMAGES]: FloatImages,
  [FIELD_TYPE?.TERMS]: Terms,
};

const Form = ({ className, onSubmit = () => null }) => {
  const methods = useForm({
    mode: "onBlur",
  });

  const {
    instrConfig: { formFields },
  } = useSelector(instrConfigSelector);

  const [selectedFormId, setSelectedFormId] = useState("");
  const SelectedComponent = formComponents[selectedFormId];

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods?.handleSubmit(onSubmit)}
        // autoComplete="off"
      >
        <Dropdown formFields={formFields} onSelect={setSelectedFormId} />
        {SelectedComponent ? (
          <SelectedComponent mb={4} />
        ) : (
          <p>未選擇說明頁類型</p>
        )}
      </form>
    </FormProvider>
  );
};

export default styled(Form)`
  padding: 8px;
`;
