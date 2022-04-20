import React from "react";
import styles from "./styles.module.css";

type TypeOption = {
  value: string;
  title: string;
};

interface IProps {
  options: TypeOption[];
}

export default function Select({
  title = "Список",
  options,
  ...props
}: IProps & React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element {
  options[0].value !== "" && options.unshift({ value: "", title: title });
  return (
    <select defaultValue={""} {...props} className={styles.select}>
      {options.map((item, index) =>
        !index ? (
          <option disabled value={item.value} key={item.value}>
            {item.title}
          </option>
        ) : (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        )
      )}
    </select>
  );
}
