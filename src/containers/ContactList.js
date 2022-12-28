import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap'
import { contactActions } from '../store';

import Spinner from 'react-bootstrap/Spinner';
import useResponse from '../hooks/use-response';
import { fetchContacts, deleteContact } from '../lib/api'
import Actions from '../components/contacts/Actions';
import { toast } from 'react-toastify';

let isInitial = true;

const ContactList = () => {
  const dispatch = useDispatch();
 
  const { sendRequest: fetchAllContacts, 
          status, 
          error } = useResponse(fetchContacts, false, 'FETCH_ALL');

  const { sendRequest: removeContact, 
          removeError } = useResponse(deleteContact, true, 'REMOVE');

  const contacts =  useSelector((state => state.contacts))

  useEffect (() => {

    if (removeError) {
      toast(removeError)
    }

  }, [removeError])

  useEffect(() => {

    if (isInitial) {
      fetchAllContacts()

      isInitial = false
      return
    }
  }, [fetchAllContacts])


  const editContactHandler = (id) => {
    dispatch(contactActions.onEditContact(id))
  }

  const removeContactHandler = (id, name) => {
    toast.error(`${name} was succesfully deleted`, {
                                              position: "top-right",
                                              autoClose: 3000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                              theme: "light",
                                              })
    removeContact(id)
  }


  let contactList; 
  if (contacts.length === 0) {

      contactList = <tr>
                      <td colSpan={5} className='text-center'>No data to show...</td>
                    </tr>  
    
  }

  if (contacts.length > 0) {

    contactList = contacts.map((contact) => <tr key={contact.id}>
                                                    <td>{contact.id}</td>
                                                    <td>{contact.name}</td>
                                                    <td>{contact.email}</td>
                                                    <td>{contact.contact}</td>
                                                    <td className='text-center'>
                                                      {<Actions id={contact.id} 
                                                                editContactHandler={editContactHandler.bind(null, contact.id)} 
                                                                removeContactHandler={removeContactHandler.bind(null, contact.id, contact.name)}/>}
                                                    </td>
                                                  </tr>)
  }

  if (error) {

    contactList = <tr>
                  <td colSpan={5} className='text-center py-3'>
                    <p>Something went wrong!</p>
                  </td>
                </tr>  
  }


  if (status === 'pending') {
    contactList = <tr>
                    <td colSpan={5} className='text-center py-3'>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>  
                    </td>
                  </tr>  
  }

  return (
    <>
    <Table  striped bordered responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th className='w-25 text-center'></th>
        </tr>
      </thead>
        <tbody>
          {contactList}
        </tbody>
      </Table>  
    </>
  )
}

export default ContactList;

