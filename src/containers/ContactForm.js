import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Button } from 'react-bootstrap';

import CustomCard from '../components/UI/CustomCard';
import Input from '../components/contacts/Input';
import { AddContact, alterContact } from '../store/contact-actions';
import UseInput from '../hooks/use-input';
import LoadingButton from '../components/UI/LoadingButton';

const ContactForm = () => {

  const {value: name, 
		setValue: setName,
		hasError: nameHasError,
		onChangeHandler: nameChangeHandler,
		onBlurHandler: nameBlurHandlder,
		reset: resetName } = UseInput(value => value.trim() !== '')

	const {value: email, 
			setValue: setEmail,
			hasError: emailHasError,
			onChangeHandler: emailChangeHandler,
			onBlurHandler: emailBlurHandlder,
			reset: resetEmail } = UseInput(value => value.includes('@'))

	const {value: contact, 
				setValue: setContact,
				hasError: contactHasError,
				onChangeHandler: contactChangeHandler,
				onBlurHandler: contactBlurHandlder,
				reset: resetContact } = UseInput(value => value.length === 11 || value.trim() === '');
	

	const onEdit =  useSelector((state => state.contact.onEdit));
	const contacts =  useSelector((state => state.contact.contacts));
	const dataStatus = useSelector((state => state.dataStatus.status));
	const actionType = useSelector((state => state.dataStatus.type));
	const dispatch = useDispatch();

	let formIsValid = false;

	if(!contactHasError && !emailHasError && !nameHasError) {
			formIsValid = true;
	}


	const new_contacts = contacts
	
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

		if (onEdit[0]) {
			dispatch(alterContact(onEdit[1], {name, email, contact}))
		} else {
			dispatch(AddContact({name, 
													email, 
													contact}))		
		}

		resetName()
		resetEmail()
		resetContact()

		formIsValid = false;
	}

	
	let submitButton;
	if (dataStatus === 'LOADING' && (actionType === 'ADD' || actionType === 'UPDATE')) {
		submitButton = <LoadingButton />
	} else {
		submitButton = <Button variant='dark' type='submit' className='w-100' disabled={!formIsValid}>{onEdit[0] ? 'Update' : `Add`} </Button>
	}

  return (<CustomCard title={onEdit[0] ? 'Edit - Contact' : 'Add - Contact' }>
							
							<Form id='contact_form' onSubmit={onSubmitHandler}> 

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
            </CustomCard>
					)
}

export default ContactForm;