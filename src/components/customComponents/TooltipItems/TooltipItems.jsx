import React from "react";
import { Tooltip } from "react-bootstrap";

export const TooltipItems = (children, props) => (
  <Tooltip id="button-tooltip" {...props}>
    {children}
  </Tooltip>
);
