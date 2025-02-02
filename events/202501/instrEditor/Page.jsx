import Form from "./Form";
import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { instrConfigSelector, actConfigSelector } from "./store/selector";
import { useRouter } from "next/router";
import ActionButton from "@/components/ActionButton";
import { ToastContainer } from "react-toastify";

const page = () => {
  const {
    instrConfig: { styles },
  } = useSelector(instrConfigSelector);

  const router = useRouter();

  const handleGoBack = () => {
    router.push(`/events/202501/act`);
  };

  // 检查 styles 是否为 undefined
  if (!styles) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>
          <ActionButton onClick={handleGoBack}>
            <div className="btn-text">Back</div>
          </ActionButton>
          <Form />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </StyledContent>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default page;
