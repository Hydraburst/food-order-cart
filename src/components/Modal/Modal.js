import React from "react";
import styles from "./Modal.module.css";
import Cart from "../Cart/Cart";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseCart}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default function Modal(props) {
    const portalRoot = document.getElementById('overlays')
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onCloseCart = {props.onCloseCart} />, portalRoot)}
      {ReactDOM.createPortal(<ModalOverlay> {props.children}</ModalOverlay>, portalRoot)}
    </>
  );
}
