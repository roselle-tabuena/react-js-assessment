import { addContact, fetchContacts, deleteContact, updateContact, getContact } from '../lib/api'
import { contactActions } from "./index";
import { statusActions } from './status-slice';


export const removeContact = (id) => {
  const type = 'REMOVE';

  return async dispatch => {

    dispatch(statusActions.showStatus({
      status: 'LOADING',
      message: 'Loading...',
      type
    }))

    try {
      await deleteContact(id);
      dispatch(contactActions.removeContact(id))

      dispatch(statusActions.showStatus({
        status: 'SUCCESS',
        message: 'Successfully loaded',
        type
      }))

    } catch(error) {

      dispatch(statusActions.showStatus({
        status: 'ERROR',
        message: error.message
      }))

    }
  }
}

export const alterContact = (id, obj) => {
  const type = 'UPDATE';

  return async dispatch => {

    dispatch(statusActions.showStatus({
      status: 'LOADING',
      message: 'Loading...',
      type
    }))

    try {
      const response = await updateContact(id, obj)
      const data = response

      data.id = id
      dispatch(contactActions.updateContact(data))

      dispatch(statusActions.showStatus({
        status: 'SUCCESS',
        message: 'Successfully loaded',
        type
      }))

    } catch(error) {
      
      dispatch(statusActions.showStatus({
        status: 'ERROR',
        message: error.message,
        type
      }))

    }
  }
}

export const fetchContact = (id) => {
  const type = 'GET';

  return async dispatch => {

    dispatch(statusActions.showStatus({
      status: 'LOADING',
      message: 'Loading...',
      type
    }))


    try {
      const response = await getContact(id)

      dispatch(statusActions.showStatus({
        status: 'SUCCESS',
        message: 'Successfully loaded',
        type,
        response
      }))
  

    } catch (error) {

      dispatch(statusActions.showStatus({
        status: 'ERROR',
        message: error.message,
        type
      }))

    }
  }

}

export const fetchAllContacts = () => {
  const type = 'FETCH';

  return async dispatch => {

    dispatch(statusActions.showStatus({
      status: 'LOADING',
      message: 'Loading...',
      type
    }))


    try {
      const response = await fetchContacts()
      dispatch(contactActions.populateContacts(response))

      dispatch(statusActions.showStatus({
        status: 'SUCCESS',
        message: 'Successfully loaded',
        type
      }))
  

    } catch (error) {

      dispatch(statusActions.showStatus({
        status: 'ERROR',
        message: error.message,
        type
      }))

    }
  }

}

export const AddContact = (data) => {
  const type = 'ADD';

  return async dispatch => {

    dispatch(statusActions.showStatus({
      status: 'LOADING',
      message: 'Loading...',
      type
    }))

    try {
      const response = await addContact(data)

      dispatch(contactActions.addContact(response))

      dispatch(statusActions.showStatus({
        status: 'SUCCESS',
        message: 'Successfully loaded',
        type
      }))
  

    } catch(error) {

      console.log(error.message)
      dispatch(statusActions.showStatus({
        status: 'ERROR',
        message: error.message,
        type
      }))

    }
  }

}