import { addContact, fetchContacts, deleteContact, updateContact } from '../lib/api'
import { contactActions } from "./index";


export const removeContact = (id) => {
  return async dispatch => {

    try {
      await deleteContact(id);
      dispatch(contactActions.removeContact(id))

    } catch(error) {
      console.log(error)
    }
  }
}

export const alterContact = (id, obj) => {


  return async dispatch => {

    try {
      const response = await updateContact(id, obj)
      const data = response

      data.id = id
      dispatch(contactActions.updateContact(data))

    } catch(error) {
      console.log(error)
    }
  }
}


export const fetchAllContacts = () => {

  return async dispatch => {

    try {
      const response = await fetchContacts()
      dispatch(contactActions.populateContacts(response))

    } catch (error) {

      console.log(error)
    }
  }

}

export const AddContact = (data) => {

  return async dispatch => {

    try {
      const response = await addContact(data)

      dispatch(contactActions.addContact(response))

    } catch(error) {

      console.log('fdsfsda')
    }
  }

}