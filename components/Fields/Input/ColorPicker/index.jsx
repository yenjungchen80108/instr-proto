import React, { useState } from "react";
import styled from "styled-components";

const SimpleColorPicker = ({ className }) => {
  const [color, setColor] = useState("#ffffff"); // 默认颜色

  return (
    <div className={className}>
      <span>選擇顏色: {color}</span>
      <input
        type="color"
        className="color-picker"
        value={color} // 设置当前颜色值
        onChange={(e) => setColor(e.target.value)} // 更新选定的颜色
        // style={{ width: "50px", height: "30px" }}
      />
    </div>
  );
};

export default styled(SimpleColorPicker)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .color-picker {
    width: 50px;
    height: 1.8em;
    vertical-align: bottom;
    border: none; /* 移除边框 */
    border-radius: 1px;
    -webkit-appearance: none; /* 移除默认样式 (Safari/Chrome) */
    -moz-appearance: none; /* 移除默认样式 (Firefox) */
    appearance: none; /* 移除默认样式 (通用支持) */
    cursor: pointer; /* 添加鼠标指针样式 */
  }
`;
