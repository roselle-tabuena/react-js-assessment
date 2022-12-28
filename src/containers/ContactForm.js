import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import Input from '../components/contacts/Input';
import UseInput from '../hooks/use-input';
import LoadingButton from '../components/UI/LoadingButton';

import useResponse from '../hooks/use-response';
import { addContact, updateContact } from '../lib/api'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactActions } from '../store/index'
import Avatar from '../components/contacts/Avatar';
 

const ContactForm = () => {

	const dispatch = useDispatch()

	const { sendRequest: addContactReq, 
					status: addStatus } = useResponse(addContact, false, 'ADD_CONTACT');

	const { sendRequest: editContact, 
					status: editStatus  } = useResponse(updateContact, false, 'UPDATE_CONTACT');

	const default_image = 'no-avatar'
	const [selectedAvatar, setSelectedAvatar] = useState(default_image);

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
				reset: resetContact } = UseInput(value => value.length === 11, value => value.replace(/[^0-9]/gi, ''));
	

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

			toast.info('You are on edit mode', { autoClose: 3000 })
			setSelectedAvatar(onEditContact.avatar || 'no-avatar')
			setName(onEditContact.name)
			setEmail(onEditContact.email)
			setContact(onEditContact.contact)
		}

	}, [onEdit, new_contacts, setName, setEmail, setContact])


	const onSubmitHandler = (event) =>{
		event.preventDefault()
		const formData = { name, email, contact, avatar: selectedAvatar };
		let message = '';

		if (onEdit[0]) {
			editContact(onEdit[1], formData)
			message = 'Contact successfully was updated!'
		} else {
			addContactReq(formData)
			message = 'Contact successfully was added!'
		}
		
		toast.success(message)

		resetForm();
		formIsValid = false;
	}

	const handleCancel = () => {

		resetForm();
		dispatch(contactActions.cancelEdit());
	}

	
	const resetForm = () => {
		setSelectedAvatar(default_image)
		resetName()
		resetEmail()
		resetContact()
	}


	const handleSelectedAvatar = (selectedAvatar) => {

		setSelectedAvatar(selectedAvatar)
	}

	
	let submitButton;

	if (isPending) {
		submitButton = <LoadingButton />
	} else {
		submitButton = <Button variant='dark' 
													 type='submit' 
													 className='w-100' 
													 aria-label='submit' 
													 disabled={!formIsValid}>{onEdit[0] ? 'Update' : `Add`}
										</Button>
	}


  return (<Form id='contact_form' onSubmit={onSubmitHandler} > 
						<Avatar onEdit={onEdit[0]} onSelectAvatar={handleSelectedAvatar} selectedAvatar={selectedAvatar} />
						<Input label='Name'  
										required={true}
										hasError={nameHasError}
										errorMessage='Please input a valid name'
										inputs={{type: 'text', 
														id: 'name',
														value: name,
														onBlur: nameBlurHandlder,
														onChange: nameChangeHandler,
														'aria-label': "Your name",
														name: 'name' }} />


						<Input label='Email'  
										required={true}
										hasError={emailHasError}
										errorMessage='Please input a valid email'
										inputs={{type: 'email', 
														id: 'email',
														value: email,
														onBlur: emailBlurHandlder,
														onChange: emailChangeHandler,
														'aria-label': "Your Email",
														name: 'email' }} />
							
						<Input label='Contact'  
										required={true}
										hasError={contactHasError}
										errorMessage='Contact number must be 11 characters'
										inputs={{type: 'text', 
														id: 'contact',
														value: contact,
														onChange: contactChangeHandler,
														onBlur: contactBlurHandlder,
														'aria-label': "Your contact number",
														name: 'contact' }} />

							{submitButton}

							{onEdit[0] &&  <Button variant='secondary' 
															type='button' 
															className='w-100 mt-2' 
															onClick={handleCancel}
															aria-label='Cancel edit'>Cancel
															</Button>}
					</Form>
				)
}

export default ContactForm;