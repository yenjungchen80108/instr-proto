import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchJsonById } from "@/hoc/fetchJsonById";
import useFetchJsonDiff from "@/hooks/useFetchJsonDiff";
import { extractDiffData } from "./extractDiffData";

const ConflictModal = ({
  isOpen,
  curEditJson,
  latestVersionId,
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
      if (!latestVersionId) {
        setHasDiff(false);
        return;
      }

      const result = await fetchJsonById(fileName, latestVersionId);
      if (result?.latestJson) {
        setInitialJson(curEditJson);
        setLatestJson(result.latestJson);
        setHasDiff(true);
      }
    };

    fetchData();
  }, [isOpen, fileName, latestVersionId]);

  const jsonDiff = useFetchJsonDiff(initialJson, latestJson);

  if (!isOpen) return null;

  const diffData = extractDiffData(jsonDiff?.panelsConfig?.["4"]?.panelData);
  // console.log("diffData", diffData);
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>版本衝突</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* {hasDiff && (
          <div className="modal-body">
            <div className="version-content">
              <p>Diff</p>
              <pre>
                {jsonDiff ? JSON.stringify(jsonDiff, null, 2) : "Loading..."}
              </pre>
            </div>
          </div>
        )} */}
        {hasDiff && (
          <div className="modal-body">
            <p>有人已修改此數據，請選擇如何處理您的更改：</p>

            {/* ✅ 生成表格 */}
            {diffData.length > 0 ? (
              <table className="diff-table">
                <thead>
                  <tr>
                    <th>欄位名稱</th>
                    <th>原始值 (Old)</th>
                    <th>新值 (New)</th>
                  </tr>
                </thead>
                <tbody>
                  {diffData.map(({ index, changes }) =>
                    changes.map(({ keyPath, oldValue, newValue }) => (
                      <tr key={keyPath}>
                        <td>{keyPath}</td>
                        <td className="old-value">{oldValue}</td>
                        <td className="new-value">{newValue}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <p>没有可比较的变更</p>
            )}

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
