/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { actConfigSelector } from "@/events/202501/actPage/store/selector";
import PanelContent from "@/components/PanelContent";
import ActionButton from "@/components/ActionButton";
import styled from "styled-components";
import { space } from "styled-system";
import { withS3Host } from "@/utils/imageHost";
import UploadBlock from "@/events/202501/actPage/components/UploadBlock";

import { renderDefaultSeeMore } from "@/components/PanelContent/utils";

const Tab4 = ({ className, isEditMode, fileName, actInstrConfigData }) => {
  const {
    actConfig: { panelsConfig },
  } = useSelector(actConfigSelector);

  const panelData = panelsConfig?.[4]?.panelData;

  const router = useRouter();

  const handleGoToEdit = () => {
    // const instrPageId = 4;
    // router.push(`/events/202501/instr/instrPageId=${instrPageId}`);
    router.push({
      pathname: "/events/202501/instr",
      // query: { instrPageId },
    });
  };

  return (
    <div className={className}>
      {isEditMode && (
        <ActionButton onClick={handleGoToEdit}>
          <div className="btn-text">Edit</div>
        </ActionButton>
      )}
      <UploadBlock fileName={fileName} configData={actInstrConfigData}>
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
                  src={withS3Host(
                    `images/202501/act/instr/${data.open ? "see_more_open" : "see_more"}.png`
                  )}
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
      </UploadBlock>
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
