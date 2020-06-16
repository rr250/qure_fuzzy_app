import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, SEARCH_LEAD } from './types';

// GET LEADS
export const getContacts = () => (dispatch, getState) => {
  axios
    .get('/api/contacts/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE LEAD
export const deleteContact = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/contacts/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteContact: 'Contact Deleted' }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD LEAD
export const addContact = (contact) => (dispatch, getState) => {
  axios
    .post('/api/contacts/', contact, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addContact: 'Contact Added' }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// SEARCH LEAD
export const searchContacts = (search) => (dispatch, getState) => {
  axios
    .get('/api/contacts/search?search='+ search, tokenConfig(getState))
    .then((res) => {
      // console.log(res.data.length<1)
      if(res.data.length<1){
        dispatch(createMessage({ noContact: 'No contact found' }));
      }
      dispatch({
        type: SEARCH_LEAD,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

