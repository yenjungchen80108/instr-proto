import { StyledCustomImage } from "../styles";

const renderDefaultPanelDetail = ({ title, titleImage, ...props }) => {
  if (titleImage) {
    return (
      <div className="panel-detail-button">
        <StyledCustomImage src={titleImage} alt="" {...props.styles} />
      </div>
    );
  }

  return <div className="panel-detail-button">{title}</div>;
};

export default renderDefaultPanelDetail;
