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

    socket.on("update-unread", () => {
      socket.emit("get-contacts");   
    })

    socket.on("contacts", handleContacts);

    return () => {
      socket.off("contacts", handleContacts);
       socket.off("get-contacts");
    };
  }, [socket]);

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