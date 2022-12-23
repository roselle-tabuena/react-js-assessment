import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Table, ButtonGroup, Button } from 'react-bootstrap'
import { fetchAllContacts, removeContact } from '../store/contact-actions';
import { contactActions } from '../store';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts =  useSelector((state => state.contacts))

  useEffect(() => {
    dispatch(fetchAllContacts())
  }, [dispatch])


  const editContactHandler = (id) => {
    dispatch(contactActions.onEditContact(id))
  }

  const removeContactHandler = (id) => {
    dispatch(removeContact(id))
  }


  const actions = (id) =>  (<ButtonGroup className="mb-2">
                              <Button variant='outline-dark'>View</Button>
                              <Button variant='outline-dark' onClick={editContactHandler.bind(null, id)}>Edit</Button>
                              <Button variant='outline-dark' onClick={removeContactHandler.bind(null, id)}>Delete</Button>
                            </ButtonGroup>)

  let contactList; 
  if (contacts.length === 0) {

      contactList = <tr>
                      <td colSpan={5} className='text-center'>No data to show...</td>
                    </tr>  
    
  }

  if (contacts.length > 0) {

    contactList = contacts.map((contact, index) => <tr key={contact.id}>
                                              <td>{index + 1}</td>
                                              <td>{contact.name}</td>
                                              <td>{contact.email}</td>
                                              <td>{contact.contact}</td>
                                              <td className='text-center'>
                                                {actions(contact.id)}
                                              </td>
                                            </tr>)
  }



  return (
      
    <Table className='mt-5' striped bordered responsive>
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
      </Table>  )
}

export default ContactList;

