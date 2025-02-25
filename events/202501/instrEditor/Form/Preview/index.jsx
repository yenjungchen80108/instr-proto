/* eslint-disable @next/next/no-img-element */
import React from "react";
import PanelContent from "@/components/PanelContent";
import { withS3Host } from "@/utils/imageHost";
import { renderDefaultSeeMore } from "@/components/PanelContent/utils";

import { useHandleUpload } from "@/hooks/useHandleUpload";
import styled from "styled-components";
import { StyledPreviewBlock } from "@/events/202501/instrEditor/Form/styles";
import ConflictModal from "@/events/202501/instrEditor/components/ConflictModal";

const Preview = ({
  className,
  panelData,
  fileName,
  instrTabId,
  panelsConfig,
}) => {
  const {
    handleUpload,
    uploadStatus,
    showConflictModal,
    setShowConflictModal,
    latestData,
  } = useHandleUpload();

  const { panelData: oldPanelData, ...rest } = panelsConfig?.[instrTabId] || {};

  const newPanelsConfig = {
    panelsConfig: {
      [instrTabId]: {
        panelData,
        ...rest,
      },
    },
  };

  const onUploadClick = (e) => {
    e.preventDefault();

    handleUpload(fileName, newPanelsConfig);
  };

  return (
    <StyledPreviewBlock className={className}>
      <button onClick={onUploadClick}>Upload to S3</button>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      <ConflictModal
        isOpen={showConflictModal}
        latestData={latestData}
        onClose={() => setShowConflictModal(false)}
        onResolveConflict={(useLatest) => {
          if (useLatest) {
            console.log("使用最新版本");
          } else {
            console.log("保留我的變更");
          }
          setShowConflictModal(false);
        }}
      />

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
    </StyledPreviewBlock>
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

export default Preview;
