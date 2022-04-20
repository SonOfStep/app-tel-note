import React, { FormEvent, useState } from "react";
import Button from "../UI/Button";
import styles from "./styles.module.css";

interface IProps {
  onAddContact: (name: string, phone: string) => void;
}

const format = (val: string) => val.replace(/^\+7 /, "");
const parse = (val: string) => "+7 " + val;

export default function ContactAddForm({ onAddContact }: IProps) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const resetFields = () => {
    setName("");
    setPhone("");
  };

  const handlerName = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handlerPhone = (e: FormEvent<HTMLInputElement>) => {
    setPhone(format(e.currentTarget.value));
  };

  const handlerSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAddContact(name, phone);
    resetFields();
  };

  return (
    <form onSubmit={handlerSubmit} className={styles.form}>
      <h2 className={styles.title}>Нового контакта</h2>
      <label className={styles["form-control"]}>
        Имя
        <input
          className={styles["input-text"]}
          type="text"
          value={name}
          onInput={handlerName}
          required
        />
      </label>

      <label className={styles["form-control"]}>
        Телефон
        <input
          className={styles["input-text"]}
          type="tel"
          value={parse(phone)}
          onInput={handlerPhone}
          minLength={13}
          maxLength={13}
          required
        />
      </label>

      <Button type="submit" colorSchema="purple">
        Добавить
      </Button>
    </form>
  );
}
