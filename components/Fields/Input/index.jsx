import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

import { StyledInput } from "./styles";

const Input = (props) => {
  const {
    className,
    required,
    registerName,
    description,
    label,
    defaultLabel,
    type,
    placeholder,
    defaultPlaceholder,
    style,
    disabled: disabledProps = false,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    validate,
  } = props;

  const formContext = useFormContext();
  const { register, formState } = formContext;
  const fieldError = formState.errors[registerName];

  const disabled = useMemo(() => disabledProps, [disabledProps]);

  return (
    <StyledInput className={className}>
      <h3>
        {label || defaultLabel}{" "}
        {required && <span className="need-mark">*</span>}
      </h3>
      <div className="input-title">
        {!!description && (
          <div className="input-description">{description}</div>
        )}
      </div>
      <div className="input-info">
        {type === "text" && (
          <input
            style={style}
            {...register(registerName, {
              required,
              minLength,
              maxLength,
              pattern,
              validate,
            })}
            type={type}
            placeholder={placeholder || defaultPlaceholder}
            disabled={disabled}
            className={classNames("input", { "input-disabled": disabled })}
          />
        )}
        {type === "number" && (
          <input
            style={style}
            {...register(registerName, {
              required,
              min: {
                value: min?.value || 0,
                message: min?.message || "輸入值過小",
              },
              max: {
                value: max?.value || 10,
                message: max?.message || "輸入值過大",
              },
              validate: {
                notStartWithZero: (value) =>
                  /^[1-9][0-9]*$/.test(value) || "數字不能以 0 開頭",
              },
            })}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={classNames("input", { "input-disabled": disabled })}
          />
        )}
        {type === "textarea" && (
          <textarea
            style={style}
            {...register(registerName, {
              required,
              minLength,
              maxLength,
              pattern,
              validate,
            })}
            placeholder={placeholder}
            disabled={disabled}
            className={classNames("input textarea", {
              "input-disabled": disabled,
            })}
          />
        )}
        {fieldError && (
          <div className="input-desc">
            <div className="input-alert">
              {fieldError?.message || "※請檢查欄位"}
            </div>
          </div>
        )}
      </div>
    </StyledInput>
  );
};

export default Input;
