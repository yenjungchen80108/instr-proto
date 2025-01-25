import { space } from "styled-system";
import styled from "styled-components";
import { useSelector } from "react-redux";

import StaticImage from "@/components/Fields/StaticImage";
import Input from "@/components/Fields/Input";
import GroupedInput from "@/components/Fields/GroupedInput";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";

const FieldContent = ({ className = "", formId, fieldData, fieldValue }) => {
  const {
    instrConfig: {
      instrFieldType: {
        staticImage,
        inputText,
        inputTextColor,
        inputNumber,
        doubleInputNumber,
        quadrupleInputNumber,
      },
    },
  } = useSelector(instrConfigSelector);

  const renderContent = (content, index) => {
    if (!content.type) return null;

    switch (content.type) {
      case "static_image":
        return <StaticImage key={index} {...content} {...staticImage} />;
      case "input_number":
        return (
          <Input
            key={index}
            {...content}
            {...inputNumber}
            defaultValues={fieldValue}
            formId={formId}
          />
        );
      case "input_text":
        return (
          <Input
            key={index}
            {...content}
            {...inputText}
            defaultValues={fieldValue}
            formId={formId}
          />
        );
      case "input_text_color":
        return (
          <Input
            key={index}
            {...content}
            {...inputTextColor}
            defaultValues={fieldValue}
            formId={formId}
          />
        );
      case "double_input_number":
        return <GroupedInput key={index} {...content} {...doubleInputNumber} />;
      case "quadruple_input_number":
        return (
          <GroupedInput key={index} {...content} {...quadrupleInputNumber} />
        );
      default:
        return null;
    }
  };

  return <div className={className}>{fieldData.fields.map(renderContent)}</div>;
};

export default styled(FieldContent)`
  ${space}
`;
