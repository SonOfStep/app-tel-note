interface IProps {
  name: string;
  phone: string;
}
export default function ContactCard({ name, phone }: IProps) {
  return (
    <div className="contact">
      <b className="contact__name">{name}</b>
      <span className="contact__phone">{phone}</span>
    </div>
  );
}
