import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

type Props = {
  onClick: () => void;
};

const Backdrop: React.FC<Props> = (props) => {
  const content = <div className="backdrop" onClick={props.onClick}></div>;
  const container = document.getElementById("backdrop-hook")!;
  return ReactDOM.createPortal(content, container);
};

export default Backdrop;
