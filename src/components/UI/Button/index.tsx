import React from "react";
import styles from "./styles.module.css";
type TypesVariant = "rounded" | "icon" | "";
type TypesColorSchema = "white" | "gray" | "purple";

interface IProps {
  variant?: TypesVariant;
  colorSchema?: TypesColorSchema;
}

export default function Button({
  className = "",
  children,
  variant = "",
  colorSchema = "white",
  ...props
}: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  const classes = [
    styles[variant ? `btn-${variant}` : "btn"],
    styles["btn-" + colorSchema],
  ].join(" ");
  return (
    <button className={`${classes} ${className} `} {...props}>
      {children}
    </button>
  );
}
