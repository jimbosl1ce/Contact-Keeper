import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(()=>{
    if(current !== null){
        setContact(current)
      } else {
        setContact({
          name: "",
          email: "",
          phone: "",
          type: 'personal'
        });
      }
  }, [contactContext, current])
// We only want this effect to CHANGE based on these two dependencies:
// if the contactContext has changed OR
// if the value of 'current' has changed

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // If current is null, that means we're creating a new contact.
    if (current === null) {
      addContact(contact);
    // If current is NOT null, we're updating a contact.
    } else {
      updateContact(contact);
    };
    // And this simply clears state.
    setContact({
      name: "",
      email: "",
      phone: "",
      type: 'personal'
    });
  };

  const clearAll = () => {
    clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>
        Clear
        </button></div>}
    </form>
  );
};

export default ContactForm;
