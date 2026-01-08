import React from "react";
import Contact from "./Contact";
import useSocket from "../../hooks/useSocket";
import { useState } from "react";
import { useEffect } from "react";

const ContactsList = () => {
  const socket = useSocket();
  const [contacts, setContacts] = useState([]);
  

  useEffect(() => {
    socket.emit("get-contacts");
  }, []);

  return (
    <div>
      {contacts.map((contact) => (
        <Contact contact={contact} />
      ))}
    </div>
  );
};

export default ContactsList;
