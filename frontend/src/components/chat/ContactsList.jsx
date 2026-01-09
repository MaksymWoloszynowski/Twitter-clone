import Contact from "./Contact";
import useSocket from "../../hooks/useSocket";
import { useState, useEffect } from "react";

const ContactsList = () => {
  const socket = useSocket();
  const [contacts, setContacts] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    socket.emit("get-contacts");

    const handleContacts = (newContacts) => {
      setContacts(newContacts);
    };

    const handleNewMessage = () => {
      socket.emit("get-contacts");
    };

    socket.on("contacts", handleContacts);
    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("contacts", handleContacts);
      socket.off("new-message", handleNewMessage);
    };
  }, []);

  return (
    <div>
      {contacts.map((contact) => (
        <Contact
          key={contact.user_id}
          contact={contact}
          isActive={contact.user_id === activeId}
          onClick={() => setActiveId(contact.user_id)}
        />
      ))}
    </div>
  );
};

export default ContactsList;