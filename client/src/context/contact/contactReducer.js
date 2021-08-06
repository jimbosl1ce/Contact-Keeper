import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';


// eslint-disable-next-line import/no-anonymous-default-export
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
        };

        // For update contact... we're mapping over current contact id's. If currenct contact id matches the payload's id
        // (ie the contact that we edited and sent as value to UPDATE_CONTACT...)
        // then that is true, and we return a NEW, UPDATED contact in that matched contact id's stead.
        // Else, if they don't match, we simply return the mismatched contact as its original self.
        case UPDATE_CONTACT:
          return {
            ...state,
            contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact )
          };

        case SET_CURRENT:
          return {
            ...state,
            // this is setting the value of 'current' in ContactState to the payload.
            // payload is receiving its value of 'contact' object from setCurrent method.
            // ContactItem is receiving setCurrent method from ContactContext.Provider, which is wrapping our "app" component.
            // ContentItem using React's 'useContext' hook, making method available.
            // Method beign passed in payload through anonymous function, which fires inside edit via onClick.
            current: action.payload
          };

        case CLEAR_CURRENT:
          return {
            ...state,
            current: null
          };

        case CLEAR_FILTER:
          return {
            ...state,
            filtered: null
          };

        case FILTER_CONTACTS:
          return {
            ...state,
            filtered: state.contacts.filter(contact => {
              const regex = new RegExp(`${action.payload}`, 'gi');
              return contact.name.match(regex) || contact.email.match(regex);
            })
          };

    default:
      return state;
  }
}