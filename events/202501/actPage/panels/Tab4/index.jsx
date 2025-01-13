/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSelector } from "react-redux";
import { actConfigSelector } from "@/events/202501/actPage/store/selector";
import PanelContent from "@/components/PanelContent";
import styled from "styled-components";
import { space } from "styled-system";

const Tab4 = ({ className }) => {
  const {
    actConfig: { panelsConfig },
  } = useSelector(actConfigSelector);

  const panelData = panelsConfig?.[4]?.panelData;

  return (
    <div className={className}>
      <PanelContent
        className="panel-content"
        panelData={panelData?.slice(0, 1)}
        // onActionButtonClick={handleNavTab}
        // onOpenModalClick={handleOpenModalClick}
        renderSeeMore={(data) => {
          if (data.index !== 0) return renderDefaultSeeMore(data);

          return (
            <StyledSeeMore onClick={data?.onToggle} {...(data?.styles || {})}>
              <img
                src={`/assets/images/202501/act/instr/${data.open ? "see_more_open" : "see_more"}.png`}
                alt=""
              />
            </StyledSeeMore>
          );
        }}
      />
      <PanelContent
        className="panel-content"
        panelData={panelData?.slice(1)}
        // onActionButtonClick={handleNavTab}
      />
    </div>
  );
};

const StyledSeeMore = styled.div`
  position: relative;
  margin: -10px auto 10px;
  width: 100px;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default styled(Tab4)`
  ${space}
`;
