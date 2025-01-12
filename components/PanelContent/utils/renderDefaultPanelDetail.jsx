const renderDefaultPanelDetail = ({ title, titleImage }) => {
  if (titleImage) {
    return (
      <div className="panel-detail-button">
        <StyledCustomImage src={titleImage} alt="" />
      </div>
    );
  }

  return <div className="panel-detail-button">{title}</div>;
};

export default renderDefaultPanelDetail;
