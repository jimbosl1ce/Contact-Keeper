import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Bill Murray",
        email: "bigB@gmail.com",
        phone: "111-121-1414",
        type: 'professional'
      },
      {
        id: 2,
        name: "Bo Murray",
        email: "bigB@gmail.com",
        phone: "111-121-1414",
        type: 'personal'
      },
      {
        id: 3,
        name: "Bam Murray",
        email: "bigB@gmail.com",
        phone: "111-121-1414",
        type: 'personal'
      }
    ],
    current:{}
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  // Set Current Content

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
    value={{
      contacts: state.contacts,
      addContact,
      deleteContact
    }}>
      { props.children }
    </ContactContext.Provider>
  );

};

export default ContactState;