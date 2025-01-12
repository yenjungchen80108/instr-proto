import { StyledCustomImage } from "../styles";
import ActionButton from "../../ActionButton";
import styled from "styled-components";

const BasicActionButton = ({
  className,
  title,
  titleImage,
  onActionButtonClick,
}) => (
  <ActionButton className={className} onClick={onActionButtonClick}>
    {title && <div className="action-title">{title}</div>}
    {titleImage && (
      <StyledCustomImage className="action-btn-img" src={titleImage} />
    )}
  </ActionButton>
);

export default styled(BasicActionButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  ${background};
  ${color};
  ${typography};

  .action-btn-img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
