import React from "react";
import { useFormContext } from "react-hook-form";
import { StyledGroupedInput } from "./styles";
import { StyledInputContainer } from "../styles";
// import { integerValidation } from "@/utils/formValidation";

const GroupedInput = ({
  className,
  fields,
  type,
  registerName,
  label,
  validate,
  placeholder,
  required,
  defaultLabel,
}) => {
  const formContext = useFormContext();
  const { register, formState } = formContext;
  const fieldError = formState.errors[registerName];

  return (
    <StyledInputContainer className={className}>
      <h3>
        {label || defaultLabel}{" "}
        {required && <span className="need-mark">*</span>}
      </h3>
      <StyledGroupedInput>
        {fields.map((field, index) => (
          <div key={index} className="input-item">
            <span>{field.label || field.defaultLabel} </span>
            <input
              type={type}
              placeholder={placeholder || field.defaultPlaceholder}
              {...register(`${registerName}.${field.registerName}`, {
                required: true,
                validate: {
                  ...validate,
                },
              })}
            />
          </div>
        ))}
        {fieldError && (
          <div className="input-desc">
            <div className="input-alert">
              {fieldError?.message || fieldError?.type || "※請檢查欄位"}
            </div>
          </div>
        )}
      </StyledGroupedInput>
    </StyledInputContainer>
  );
};

export default GroupedInput;
