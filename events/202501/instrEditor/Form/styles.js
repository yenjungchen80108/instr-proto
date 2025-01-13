import styled from "styled-components";
import { space } from "styled-system";
import "@radix-ui/colors/slate.css";

export const StyledFormBlock = styled.div`
  margin-bottom: 10px;

  .horizontal-line {
    border: 1px dashed var(--slate-6);
    margin: 5px 0;
  }
`;

export const StyledBtn = styled.div`
  border: 1px solid #b1b1b1;
  color: #b1b1b1;
  background: #fff;
  border-radius: 10px;
  width: 25px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  ${space};
`;

export const StyledSaveBtn = styled(StyledBtn)`
  background: #000;
  color: #fff;
  border-radius: 10px;
  width: 60px;
`;
