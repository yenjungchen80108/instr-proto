import React, { useState } from "react";
import styled from "styled-components";
import { space } from "styled-system";

import { DropdownContainer, StyledSelect, StyledOption } from "./styles";

const Dropdown = ({ formFields, onSelect, className }) => {
  const [selectedId, setSelectedId] = useState("");

  const handleChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <DropdownContainer className={className}>
      <StyledSelect value={selectedId} onChange={handleChange}>
        <StyledOption value="">請選擇說明頁類別</StyledOption>
        {Object.keys(formFields).map((id) => (
          <StyledOption key={id} value={id}>
            {formFields[id].title}
          </StyledOption>
        ))}
      </StyledSelect>
    </DropdownContainer>
  );
};

export default styled(Dropdown)`
  ${space}
`;
