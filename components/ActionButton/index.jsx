import React, { forwardRef, cloneElement } from "react";
import styled from "styled-components";
import {
  position,
  layout,
  space,
  background,
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  border,
  letterSpacing,
} from "styled-system";

import { smallText } from "@/styles/mixin";

const ActionButton = forwardRef(({ asChild, children, ...props }, ref) => {
  const { className, onClick, disabled, ...actionData } = props;

  const handleClick = () => {
    onClick?.({ disabled, ...actionData });
  };

  const child = asChild ? (
    cloneElement(React.Children.only(children), {
      ref,
      className: `action ${className}`,
      onClick: handleClick,
      disabled: disabled,
    })
  ) : (
    <div
      className={`action ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </div>
  );

  return child;
});

ActionButton.displayName = "ActionButton";

export default styled(ActionButton)`
  cursor: pointer;
  user-select: none;
  ${layout}
  ${position}
  ${space}
  ${background}
  ${backgroundImage}
  ${backgroundPosition}
  ${backgroundRepeat}
  ${backgroundSize}
  ${border}
  ${letterSpacing}
  &[disabled] {
    cursor: auto;
  }

  img {
    width: 100%;
    height: auto;
  }

  .countdown-wrapper {
    position: relative;
    left: -25%;
  }

  .countdown {
    ${smallText(8)};
    text-align: center;
    white-space: pre-wrap;
    transform-origin: left center;
  }
`;
