import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchJsonDiff } from "@/hoc/fetchJsonDiff";
import useFetchJsonDiff from "@/hooks/useFetchJsonDiff";

const ConflictModal = ({
  isOpen,
  initialETag,
  latestETag,
  fileName,
  onClose,
  onResolveConflict,
}) => {
  const [initialJson, setInitialJson] = useState(null);
  const [latestJson, setLatestJson] = useState(null);
  const [hasDiff, setHasDiff] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      if (!initialETag || !latestETag) {
        setHasDiff(false);
        return;
      }

      const result = await fetchJsonDiff(fileName, initialETag, latestETag);
      if (result?.initialJson && result?.latestJson) {
        setInitialJson(result.initialJson);
        setLatestJson(result.latestJson);
        setHasDiff(true);
      }
    };

    fetchData();
  }, [isOpen, fileName, initialETag, latestETag]);

  const jsonDiff = useFetchJsonDiff(initialJson, latestJson);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>版本衝突</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {hasDiff && (
          <div className="modal-body">
            <p>有人已經修改了此數據，請選擇如何處理您的變更：</p>
            <div className="version-content">
              <p>Diff</p>
              <pre>
                {jsonDiff ? JSON.stringify(jsonDiff, null, 2) : "Loading..."}
              </pre>
            </div>
          </div>
        )}
        {!hasDiff && (
          <div className="modal-body">
            <p>沒有衝突</p>
          </div>
        )}

        <div className="modal-footer">
          {hasDiff && (
            <button
              className="confirm-btn"
              onClick={() => onResolveConflict(true)}
            >
              使用最新版本
            </button>
          )}
          <button
            className="cancel-btn"
            onClick={() => onResolveConflict(false)}
          >
            {hasDiff ? "保留我的變更" : "關閉"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
