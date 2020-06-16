import { GET_LEADS, DELETE_LEAD, ADD_LEAD, CLEAR_LEADS, SEARCH_LEAD } from '../actions/types.js';

const initialState = {
  contacts: [],
  searchResults: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        contacts: action.payload,
      };
    case DELETE_LEAD:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    case ADD_LEAD:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case CLEAR_LEADS:
      return {
        ...state,
        contacts: [],
      };
    case SEARCH_LEAD:
      return {
        ...state,
        searchResults: action.payload
      };
    default:
      return state;
  }
}
