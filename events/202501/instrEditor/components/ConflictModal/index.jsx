import React from "react";
import "./styles.css";

const ConflictModal = ({ isOpen, latestData, onClose, onResolveConflict }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* 標題區 */}
        <div className="modal-header">
          <h3>版本衝突</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* 內容區 */}
        <div className="modal-body">
          <p>有人已經修改了此數據，請選擇如何處理您的變更：</p>

          <div className="version-content">
            <p className="label">最新版本：</p>
            <pre className="json-box">
              {latestData ? JSON.stringify(latestData, null, 2) : "N/A"}
            </pre>
          </div>
        </div>

        {/* 按鈕區 */}
        <div className="modal-footer">
          <button
            className="confirm-btn"
            onClick={() => onResolveConflict(true)}
          >
            使用最新版本
          </button>
          <button
            className="cancel-btn"
            onClick={() => onResolveConflict(false)}
          >
            保留我的變更
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
