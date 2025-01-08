/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import SingleImageUploader from "@/components/Fields/Upload";
import useImageUploader from "@/hooks/useImageUploader";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import { space } from "styled-system";

const StaticImage = ({ className, label, registerName, required }) => {
  const { uploadedImage, handleImageChange } = useImageUploader();
  const {
    instrConfig: {
      instrFieldType: { staticImage },
    },
  } = useSelector(instrConfigSelector);

  return (
    <div className={className}>
      <h3>{label || staticImage.label}</h3>
      <SingleImageUploader
        onChange={handleImageChange}
        maxFileSize={1 * 1024 * 1024}
      />
      {uploadedImage && (
        <img
          src={uploadedImage.previewUrl}
          alt="Uploaded"
          style={{ height: "auto", width: "100%" }}
        />
      )}
    </div>
  );
};

export default styled(StaticImage)`
  ${space}
`;
