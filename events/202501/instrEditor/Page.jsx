import Form from "./Form";
import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { instrConfigSelector } from "./store/selector";

const page = () => {
  const {
    instrConfig: { styles },
  } = useSelector(instrConfigSelector);

  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>
          <Form />
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default page;
