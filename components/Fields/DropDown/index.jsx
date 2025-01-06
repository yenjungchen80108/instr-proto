import React, { useState } from "react";

import { DropdownContainer, StyledSelect, StyledOption } from "./styles";

const Dropdown = ({ formFields, onSelect }) => {
  const [selectedId, setSelectedId] = useState("");

  const handleChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <DropdownContainer>
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

export default Dropdown;
