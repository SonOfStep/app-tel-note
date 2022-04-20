export type tagName = "Семья" | "Друзья" | "Коллеги" | "Знакомый";

// Интерфейс
export interface IContact {
  name: string;
  phone: string;
  tag: tagName;
  createdAt: number;

  render: () => any;
}

export class Contact implements IContact {
  public name: string;
  public phone: string;
  public tag: tagName;
  public createdAt: number;

  constructor(
    name: string,
    phone: string,
    createdAt: number = Date.now(),
    tag: tagName = "Знакомый"
  ) {
    this.name = name;
    this.phone = phone;
    this.tag = tag;
    this.createdAt = createdAt;
  }

  render(): any {
    return `${this.name} (${this.tag}) - +7 ${this.phone}`;
  }
}
