import React, { useContext } from "react";
import PropTypes from 'prop-types';
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({contact}) => {
  // These two const variables pull methods from ContactState>>ContactContext:
  const contactContext = useContext(ContactContext);
  const {deleteContact, setCurrent } = contactContext;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    // each ContactItem is created via map. So each of THIS component is basically its own object instance of "contact" object array. That is how we're able to access (id) of specific deleted contact through global function variables.
    deleteContact(_id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{float: 'right'}}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (<li>
          <i className="fas fa-envelope-open"></i> {email}
        </li>)}
        {phone && (<li>
          <i className="fas fa-phone"></i> {phone}
        </li>)}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
