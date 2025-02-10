import { StyledContainer, StyledContent } from "./styles";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { instrConfigSelector } from "./store/selector";
import { useRouter } from "next/router";
import ActionButton from "@/components/ActionButton";
import { ToastContainer } from "react-toastify";
import Form from "./Form";

const page = ({ ...props }) => {
  const {
    instrConfig: { styles },
  } = useSelector(instrConfigSelector);

  const router = useRouter();

  const handleGoBack = () => {
    router.push(`/events/202501/act`);
  };

  if (!styles) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={styles}>
      <StyledContainer>
        <StyledContent>
          <ActionButton mb="10px" onClick={handleGoBack}>
            <div className="btn-text">Back</div>
          </ActionButton>
          <Form {...props} />
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
