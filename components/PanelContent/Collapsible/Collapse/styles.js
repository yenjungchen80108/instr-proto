import styled from "styled-components";

export const StyledCollapse = styled.div`
  overflow: hidden;
  * {
    box-sizing: border-box;
  }

  .collapse-container {
    position: relative;
    ${({ startCollapsedSize, open }) => {
      if (!open && Number(startCollapsedSize) > 0) {
        return `
            transition: transform 0.6s ease;
            transform: translateY(${-startCollapsedSize}px);
        `;
      }

      return "";
    }}
  }
`;
