import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import Input from '../components/contacts/Input';
import UseInput from '../hooks/use-input';
import LoadingButton from '../components/UI/LoadingButton';

import useResponse from '../hooks/use-response';
import { addContact, updateContact } from '../lib/api'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContactForm = (props) => {

	const { sendRequest: addContactReq, 
					status: addStatus } = useResponse(addContact, false, 'ADD_CONTACT');

	const { sendRequest: editContact, 
					status: editStatus  } = useResponse(updateContact, false, 'UPDATE_CONTACT');

  const {value: name, 
		setValue: setName,
		isValid: nameIsValid,
		hasError: nameHasError,
		onChangeHandler: nameChangeHandler,
		onBlurHandler: nameBlurHandlder,
		reset: resetName } = UseInput(value => value.trim() !== '', 
																	value => value.replace(/[^a-zA-Z \u00C0-\u00FF , .]/gi, ''))

	const {value: email, 
			setValue: setEmail,
			isValid: emailIsValid,
			hasError: emailHasError,
			onChangeHandler: emailChangeHandler,
			onBlurHandler: emailBlurHandlder,
			reset: resetEmail } = UseInput(value => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())))

	const {value: contact, 
				setValue: setContact,
				isValid: contactIsValid,
				hasError: contactHasError,
				onChangeHandler: contactChangeHandler,
				onBlurHandler: contactBlurHandlder,
				reset: resetContact } = UseInput(value => value.length === 11 || value.trim() === '', value => value.replace(/[^0-9]/gi, ''));
	

	const onEdit =  useSelector((state => state.onEdit));
	const contacts =  useSelector((state => state.contacts));

	const isPending = addStatus === 'pending' || editStatus === 'pending' 

	let formIsValid = false;

	if(contactIsValid && emailIsValid && nameIsValid) {
			formIsValid = true;
	}

	const new_contacts = contacts;
	
	useEffect(() => {
		const [editMode, id] = onEdit 

		if(editMode) {
			let onEditContact = new_contacts.find(contact => contact.id === id)

			setName(onEditContact.name)
			setEmail(onEditContact.email)
			setContact(onEditContact.contact)
		}

	}, [onEdit, new_contacts, setName, setEmail, setContact])


	const onSubmitHandler = (event) =>{
		event.preventDefault()
		const formData = { name, email, contact}

		if (onEdit[0]) {
			editContact(onEdit[1], formData)
			toast('Contact successfully was updated!')
		} else {
			addContactReq(formData)
			toast('Contact successfully was added!')
		}

		resetName()
		resetEmail()
		resetContact()

		formIsValid = false;
	}

	
	let submitButton;

	if (isPending) {
		submitButton = <LoadingButton />
	} else {
		submitButton = <Button variant='dark' 
													 type='submit' 
													 className='w-100' 
													 disabled={!formIsValid}>{onEdit[0] ? 'Update' : `Add`}
										</Button>
	}

  return (<Form id='contact_form' onSubmit={onSubmitHandler} > 
						<Input label='Name:'  
										required={true}
										hasError={nameHasError}
										errorMessage='Please input a valid name'
										inputs={{type: 'text', 
														id: 'name',
														value: name,
														onBlur: nameBlurHandlder,
														onChange: nameChangeHandler,
														name: 'name' }} />


						<Input label='Email:'  
										required={true}
										hasError={emailHasError}
										errorMessage='Please input a valid email'
										inputs={{type: 'email', 
														id: 'email',
														value: email,
														onBlur: emailBlurHandlder,
														onChange: emailChangeHandler,
														name: 'email' }} />
							
						<Input label='Contact:'  
										required={false}
										hasError={contactHasError}
										errorMessage='Contact number must be 11 characters'
										inputs={{type: 'text', 
														id: 'contact',
														value: contact,
														onChange: contactChangeHandler,
														onBlur: contactBlurHandlder,
														name: 'contact' }} />

							{submitButton}
					</Form>
				)
}

export default ContactForm;