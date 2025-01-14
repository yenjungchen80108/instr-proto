import Form from "./Form";
import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { instrConfigSelector } from "./store/selector";
import { useRouter } from "next/router";
import ActionButton from "@/components/ActionButton";

const page = () => {
  const {
    instrConfig: { styles },
  } = useSelector(instrConfigSelector);

  const router = useRouter();

  const handleGoBack = () => {
    router.push(`/events/202501/act/edit`);
  };

  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>
          <ActionButton onClick={handleGoBack}>
            <div className="btn-text">Back</div>
          </ActionButton>
          <Form />
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default page;
