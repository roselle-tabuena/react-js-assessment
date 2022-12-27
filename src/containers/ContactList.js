import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';

import { Table, ButtonGroup, Button } from 'react-bootstrap'
import { fetchAllContacts, removeContact } from '../store/contact-actions';
import { contactActions } from '../store';

import Spinner from 'react-bootstrap/Spinner';
import DialogModal from '../components/UI/DialogModal';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts =  useSelector((state => state.contact.contacts))
  const dataStatus = useSelector((state => state.dataStatus.status))
  const actionType = useSelector((state => state.dataStatus.type))

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (actionType === null || actionType === 'FETCH') {
      dispatch(fetchAllContacts())
    }
  }, [dispatch, actionType])


  const editContactHandler = (id) => {
    dispatch(contactActions.onEditContact(id))
  }

  const removeContactHandler = (id) => {
    setShow(true)
    dispatch(removeContact(id))
  }


  const actions = (id) =>  (<ButtonGroup className="mb-2">
                              <Link className='btn btn-outline-dark' to={`/contacts/${id}`}>
                                View
                              </Link>
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


  if (dataStatus === 'LOADING' && actionType === 'FETCH') {
    contactList = <tr>
                    <td colSpan={5} className='text-center py-3'>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>  
                    </td>
                  </tr>  
  }

  let onRemoveLoading = false;
  if (dataStatus === 'LOADING' && actionType === 'REMOVE') {
    onRemoveLoading = true;
  }

  let removeMessage = ''
  if (dataStatus === 'SUCCESS' && actionType === 'REMOVE') {
    removeMessage = 'Contact successfully removed!'
    onRemoveLoading = false;
  }

  return (
    <>
    <DialogModal show={show} handleClose={handleClose} dataStatus={dataStatus} title='Remove - Contact' message={removeMessage} />

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
      </Table>  
    </>
  )
}

export default ContactList;

