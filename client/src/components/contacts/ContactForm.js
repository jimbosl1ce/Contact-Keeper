import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import classes from "./ContactForm.module.css";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
        occasion: [],
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
    occasion: [],
  });
  const [activeButton, setActiveButton] = useState({
    birthday: false,
    workAnniversary: false,
    weddingAnniversary: false,
  });

  const { name, email, phone, type, occasion } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });
  console.log(contact);

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const isActiveHandler = (e) => {
    e.preventDefault();
    // setContact({
    //   ...contact,
    //   occasion: ["hi"],
    // });
    if (e.target.innerText === "Birthday") {
      setActiveButton((prevState) => {
        return { ...prevState, birthday: !prevState.birthday };
      });
    } else if (e.target.innerText === "Work Anniversary") {
      setActiveButton((prevState) => {
        return { ...prevState, workAnniversary: !prevState.workAnniversary };
      });
    } else if (e.target.innerText === "Wedding Anniversary") {
      setActiveButton((prevState) => {
        return {
          ...prevState,
          weddingAnniversary: !prevState.weddingAnniversary,
        };
      });
    }

    console.log(e.target.innerText);
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">
          {current ? "Edit Contact" : "Add Contact"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={onChange}
        />
        <h5>Occasions</h5>
        <div className={classes.container}>
          <button
            onClick={isActiveHandler}
            className={`${classes.btn} ${
              activeButton.birthday ? classes.active : ""
            }`}
          >
            Birthday
          </button>
          <button
            onClick={isActiveHandler}
            className={`${classes.btn} ${
              activeButton.workAnniversary ? classes.active : ""
            }`}
          >
            Work Anniversary
          </button>
          <button
            onClick={isActiveHandler}
            className={`${classes.btn} ${
              activeButton.weddingAnniversary ? classes.active : ""
            }`}
          >
            Wedding Anniversary
          </button>
        </div>
        <h5>Contact Type</h5>
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />{" "}
        Personal{" "}
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />{" "}
        Professional
        <div>
          <input
            type="submit"
            value={current ? "Update Contact" : "Add Contact"}
            className="btn btn-primary btn-block"
          />
        </div>
        {current && (
          <div>
            <button className="btn btn-light btn-block" onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
