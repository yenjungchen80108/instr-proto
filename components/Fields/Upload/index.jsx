import React, { useState, useRef } from "react";
import { StyledInputContainer } from "../styles";
import styled from "styled-components";

const SingerImageUploader = ({
  className,
  onChange,
  maxFileSize = 5 * 1024 * 1024,
  acceptType = ["image/jpeg", "image/png"],
}) => {
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const validateFileSize = (file) => {
    if (!acceptType.includes(file.type)) {
      return "Invalid file type";
    }
    if (file.size > maxFileSize) {
      return "File size exceeds limit";
    }
    return null;
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateFileSize(file);
    if (error) {
      setError(error);
      onChange(null);
    } else {
      setError(null);
      onChange(file);
    }
  };

  return (
    <StyledInputContainer className={className}>
      <div className="upload-block">
        <input
          type="file"
          accept={acceptType.join(",")}
          onChange={handleChange}
          ref={inputRef}
        />
        <button onClick={() => inputRef.current && inputRef.current.click()}>
          Upload
        </button>
        <button onClick={() => onChange(null)}>remove</button>
      </div>
      {error && (
        <div className="input-desc">
          <div className="input-alert">{error || "※請檢查欄位"}</div>
        </div>
      )}
    </StyledInputContainer>
  );
};

export default styled(SingerImageUploader)`
  .upload-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }
`;
