import React from "react";
import { useFormContext } from "react-hook-form";
import { StyledGroupedInput } from "./styles";
// import { integerValidation } from "@/utils/formValidation";

const GroupedInput = ({
  className,
  fields,
  type,
  registerName,
  label,
  validate,
  placeholder,
}) => {
  const { register } = useFormContext();

  return (
    <div className={className}>
      <h3>{label}</h3>
      <StyledGroupedInput>
        {fields.map((field, index) => (
          <input
            key={index}
            type={type}
            placeholder={placeholder || field.defaultPlaceholder}
            {...register(`${registerName}.${field.registerName}`, {
              required: true,
              validate: {
                ...validate,
              },
            })}
          />
        ))}
      </StyledGroupedInput>
    </div>
  );
};

export default GroupedInput;
