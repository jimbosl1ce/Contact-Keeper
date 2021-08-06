import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';


export default(state, action) => {
  switch(action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
      case DELETE_CONTACT:
        return{
          ...state,
          contacts: state.contacts.filter(contact => contact.id !== action.payload)
          // The above: filter adds all contacts BUT the contact that matches the id that matches our payload. Because remember, our payload is the id of the user we are trying to delete.
        }
    default:
      return state;
  }
}