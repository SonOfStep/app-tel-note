import { ChangeEvent, useState } from "react";
import Button from "../UI/Button";
import Select from "../UI/Select";
import styles from "./styles.module.css";

interface IProps {
  onSorting: (option: string) => void;
}

export default function Header({ onSorting }: IProps): JSX.Element {
  const [isOpened, setOpen] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <Button
          variant="icon"
          onClick={() => {
            setOpen(true);
          }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384.97 384.97"
          >
            <path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03    C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z" />
            <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03    S379.58,180.455,372.939,180.455z" />
            <path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909    c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z" />
          </svg>
        </Button>

        <div
          className={[styles.menu__content, isOpened && styles.visible].join(
            " "
          )}
        >
          <ol className={styles.menu__list}>
            <li>
              <Button
                variant="icon"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                </svg>
              </Button>
            </li>
            <li>
              <Select
                title="Сортировка"
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  onSorting(e.target.value)
                }
                options={[
                  { value: "name", title: "Имя" },
                  { value: "createdAt", title: "Дата создания" },
                ]}
              ></Select>
            </li>
            <li></li>
          </ol>
        </div>
      </div>
      <h1 className={styles.header__title}>Телефонный справочник</h1>
      <div></div>
    </header>
  );
}
