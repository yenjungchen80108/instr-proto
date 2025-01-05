import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";

import ImageWithCollapseModal from "../components/ImageWithCollapseModal";
import ImageWithNavTab from "../components/ImageWithNavTab";
import SingleStaticImage from "../components/SingleStaticImage";
import FloatImages from "../components/FloatImages";
import Terms from "../components/Terms";

const Form = ({ className, onSubmit = () => null }) => {
  const methods = useForm({
    mode: "onBlur", // 实时验证
  });

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods?.handleSubmit(onSubmit)}
        // autoComplete="off"
      >
        <SingleStaticImage mb={4} />
        <ImageWithNavTab mb={4} />
        <ImageWithCollapseModal mb={4} />
        <FloatImages mb={4} />
        <Terms />
      </form>
    </FormProvider>
  );
};

export default Form;
