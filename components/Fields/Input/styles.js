import styled from "styled-components";

import { px2Unit } from "@/styles/mixin";

export const StyledInput = styled.div`
  --field-border-color: #b3b3b3;
  --box-background-color: rgba(255, 255, 255, 0.1);
  --placeholder-text-color: rgba(0, 0, 0, 0.4);
  --disabled-text-color: rgba(255, 255, 255, 0.5);
  --text-color: #000;
  --hint-color: #fd6969;

  width: 100%;

  .input-header {
    display: flex;
    justify-content: space-between;
  }
  .input-title {
    flex-grow: 1;
    font-size: 5px;
    text-align: left;
    color: #ffffff;

    .input-description {
      margin-top: 4px;
      font-size: 5px;
    }
  }

  .input-info {
    position: relative;

    .input {
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

    .textarea {
      /* padding-top: ${px2Unit(14)}; */
      /* padding-bottom: ${px2Unit(14)}; */
      resize: none;

      &:focus {
        outline: none;
      }
    }

    .input-disabled {
      color: var(--disabled-text-color);
    }

    .input-desc {
      height: 12px;
      display: flex;
      align-items: center;
    }

    .input-alert {
      text-align: right;
      font-size: 12px;
      color: var(--hint-color);
      z-index: 0;
      margin-left: auto;
    }
  }
`;
