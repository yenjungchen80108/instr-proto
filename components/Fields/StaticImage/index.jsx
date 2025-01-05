import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import SingleImageUploader from "@/components/Fields/Upload";
import useImageUploader from "@/hooks/useImageUploader";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import { space } from "styled-system";

const StaticImage = ({ className, label }) => {
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
        maxFileSize={2 * 1024 * 1024}
      />
      {uploadedImage && (
        <img
          src={uploadedImage}
          alt="Uploaded"
          style={{ height: "100px", width: "100px" }}
        />
      )}
    </div>
  );
};

export default styled(StaticImage)`
  ${space}
`;
