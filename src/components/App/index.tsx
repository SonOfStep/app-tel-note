import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Contact } from "../../libs/classes";
import ContactAddForm from "../ContactAddForm";
import ContactCard from "../ContactCard";
import ContactList from "../ContactList";
import Header from "../Header";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

//TODO: Notification
//TODO: PWA

class ContactFactory {
  createContact(name: string, phone: string, createdAt?: number) {
    const instanceContact = new Contact(name, phone, createdAt);

    instanceContact.render = (): JSX.Element => {
      return (
        <ContactCard
          name={instanceContact.name}
          phone={instanceContact.phone}
        />
      );
    };

    return instanceContact;
  }
}

export default function App() {
  const initialState: Contact[] = [];

  const [contacts, setContacts] = useState<Contact[]>(initialState);

  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    const savedData = localStorage.getItem("contacts");
    if (savedData) {
      const unSerialisedData = JSON.parse(savedData);

      setContacts([
        ...unSerialisedData.map(
          (contact: { name: string; phone: string; createdAt: number }) =>
            new ContactFactory().createContact(
              contact.name,
              contact.phone,
              contact.createdAt
            )
        ),
      ]);
    }
  }, []);

  const handlerNewContact = async (name: string, phone: string) => {
    const matchedContact = contacts.find((contact) => {
      return (
        contact.name.toLocaleLowerCase() === name.toLocaleLowerCase() ||
        contact.phone == phone
      );
    });

    if (!matchedContact) {
      const newContact = new ContactFactory().createContact(name, phone);
      const newContacts = [...contacts, newContact];

      const serializedData = JSON.stringify(newContacts);
      localStorage.setItem("contacts", serializedData);

      setContacts([...newContacts]);
    }
  };

  const handlerRemoveContact = async (deletedContact: Contact) => {
    const filteredArray = contacts.filter(
      (contact) => contact !== deletedContact
    );

    const serializedData = JSON.stringify(filteredArray);
    localStorage.setItem("contacts", serializedData);

    setContacts([...filteredArray]);
  };

  const handlerSorting = (option: string) => {
    setSort(option);

    setContacts(
      [...contacts].sort((a, b) => {
        switch (option) {
          case "name":
            return a.name.localeCompare(b.name);

          case "createdAt":
            return a.createdAt - b.createdAt;

          default:
            return 0;
        }
      })
    );
  };

  const [open, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={"wrapper"}>
      <div className="container">
        <Header onSorting={handlerSorting} />

        <main className="content">
          <ContactList
            contacts={contacts}
            onRemoveContact={handlerRemoveContact}
          />

          <aside className="add">
            <Button
              type="button"
              variant="rounded"
              colorSchema="purple"
              onClick={() => {
                onOpen();
              }}
            >
              Добавить контакт
            </Button>
            <Modal isOpen={open} onClose={onClose}>
              <ContactAddForm onAddContact={handlerNewContact} />
            </Modal>
          </aside>
        </main>
      </div>
    </div>
  );
}
