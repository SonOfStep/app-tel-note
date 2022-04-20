import { MouseEvent } from "react";

import styles from "./styles.module.css";

interface IProps {
  isOpen?: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export default function Modal({
  isOpen = false,
  onClose,
  children,
}: IProps): JSX.Element {
  return (
    <div
      className={[styles.modal, isOpen && styles.visible].join(" ")}
      onClick={() => {
        onClose();
      }}
    >
      <div
        className={styles.modal__content}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
