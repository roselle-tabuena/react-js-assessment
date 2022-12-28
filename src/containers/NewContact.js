import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ContactForm from "../components/contacts/ContactForm"
import { contactActions } from '../store/index'

import useResponse from '../hooks/use-response';
import { addContact, updateContact } from '../lib/api'



const NewContact = () => {

  const dispatch = useDispatch();

	const onEdit =  useSelector((state => state.onEdit));
	const contacts =  useSelector((state => state.contacts));

  const [editMode, id] = onEdit;

  
	const { sendRequest: addContactReq, 
          status: addStatus } = useResponse(addContact, false, 'ADD_CONTACT');

  const { sendRequest: editContact, 
          status: editStatus  } = useResponse(updateContact, false, 'UPDATE_CONTACT');

  const isPending = addStatus === 'pending' || editStatus === 'pending' 

  const onSubmitHandler = (data) =>{
		let message = '';

		if (editMode) {
			editContact(id, data)

			message = 'Contact successfully was updated!'
		} else {
			addContactReq(data)
			message = 'Contact successfully was added!'
		}
		
		toast.success(message)
	}

  
	const handleCancel = () => {

		dispatch(contactActions.cancelEdit());
	}

  return <ContactForm isPending={isPending} 
                      onEdit={editMode} 
                      editId={id} 
                      onSubmit={onSubmitHandler} 
                      onCancel={handleCancel}
                      contacts={contacts} />
}


export default NewContact;
