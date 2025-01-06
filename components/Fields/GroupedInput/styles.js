import styled from "styled-components";

export const StyledGroupedInput = styled.div`
  --field-border-color: #b3b3b3;
  --box-background-color: rgba(255, 255, 255, 0.1);
  --placeholder-text-color: rgba(0, 0, 0, 0.4);
  --disabled-text-color: rgba(255, 255, 255, 0.5);
  --text-color: #000;
  --hint-color: #fd6969;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
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

  .input-item {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .input-alert {
    text-align: right;
    font-size: 12px;
    color: var(--hint-color);
    z-index: 0;
    margin-left: auto;
  }
`;
