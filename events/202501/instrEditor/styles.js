import styled from "styled-components";
import "@radix-ui/colors/slate.css";

export const StyledContainer = styled.div`
  min-height: 100vh;
  font-size: 12px;
  background: #fff;
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background: #fff;
  color: #000;
  background-color: var(--slate-3);
`;
