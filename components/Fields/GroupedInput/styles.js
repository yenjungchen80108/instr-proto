import styled from "styled-components";

export const StyledGroupedInput = styled.div`
  --field-border-color: #b3b3b3;
  --box-background-color: rgba(255, 255, 255, 0.1);
  --placeholder-text-color: rgba(0, 0, 0, 0.4);
  --disabled-text-color: rgba(255, 255, 255, 0.5);
  --text-color: #000;
  --hint-color: #fd6969;

  display: flex;
  position: relative;
  gap: 3px;

  input {
    width: 100%;
    height: 20px;
    border-radius: 5px;
    border: solid 1px var(--field-border-color);
    background-color: #eee;
    color: var(--text-color);

    -webkit-user-select: text;

    &::placeholder {
      color: var(--placeholder-text-color);
    }
  }
`;
