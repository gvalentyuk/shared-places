import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../UI/Backdrop";
import "./Modal.css";

type ModalProps = {
  className?: string;
  style?: CSSProperties;
  headerClass?: string;
  header: React.ReactNode;
  onSubmit?: () => void;
  contentClass?: string;
  children: React.ReactNode;
  footerClass?: string;
  footer: React.ReactNode;
  onCancel: () => void;
  show: boolean;
};

const ModalOverlay: React.FC<ModalProps> = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  const container = document.getElementById("modal-hook")!;

  return ReactDOM.createPortal(content, container);
};

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
