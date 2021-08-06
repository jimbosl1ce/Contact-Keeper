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
        id: uuidv4(),
        name: "Bill Murray",
        email: "bigB@gmail.com",
        phone: "111-121-1414",
        type: 'professional'
      },
      {
        id: uuidv4(),
        name: "Bo Murray",
        email: "bigB@gmail.com",
        phone: "111-121-1414",
        type: 'personal'
      },
      {
        id: uuidv4(),
        name: "Bam Murray",
        email: "bigB@gmail.com",
        phone: "111-121-1414",
        type: 'personal'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  }

  // Set Current Content
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  // Clear Current Contact
  const clearCurrent = () => {
    // notice that we don't have a payload, as we are setting payload to null.
    dispatch({ type: CLEAR_CURRENT })
  }
  // Update Contact
  const updateContact = (contact) => {
    dispatch({type: UPDATE_CONTACT, payload: contact})
  }

  // Filter Contacts
  const filterContacts = text => {
    dispatch({type: FILTER_CONTACTS, payload: text})
  }

  // Clear Filter
  const clearFilter = () => {
    // notice that we don't have a payload, as we are setting payload to null.
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ContactContext.Provider
    value={{
      // These values are pulled from 'useReducer' destructured state:
      contacts: state.contacts,
      current: state.current,
      filtered: state.filtered,
      // These values are above methods that we make available via React's 'useContext' hook...
      // And we create this context via contactContext, where we pulled in React's 'createContext hook:
      addContact,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContacts,
      clearFilter
    }}>
      { props.children }
    </ContactContext.Provider>
  );

};

export default ContactState;