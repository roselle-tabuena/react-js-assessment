import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import Input from './Input';
import UseInput from '../../hooks/use-input';
import LoadingButton from '../UI/LoadingButton';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from './Avatar';
 

const ContactForm = (props) => {
  const { onEdit, 
          contacts, 
          editId, 
          isPending } = props

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
	


	let formIsValid = false;

	if(contactIsValid && emailIsValid && nameIsValid) {
			formIsValid = true;
	}

	useEffect(() => {

		if(onEdit) {
			let onEditContact = contacts.find(contact => contact.id === editId)

			toast.info('You are on edit mode', { autoClose: 2000 })

			setSelectedAvatar(onEditContact.avatar || 'no-avatar')
			setName(onEditContact.name)
			setEmail(onEditContact.email)
			setContact(onEditContact.contact)
		} 

	}, [onEdit, editId, contacts, setName, setEmail, setContact])
	
	const resetForm = () => {
		setSelectedAvatar(default_image)
		resetName()
		resetEmail()
		resetContact()
	}


	const handleSelectedAvatar = (selectedAvatar) => {

		setSelectedAvatar(selectedAvatar)
	}

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = { name, 
                       email, 
                       contact, 
                       avatar: selectedAvatar };

    props.onSubmit(formData);

    resetForm()
  }

	const handleCancel = () => {

		resetForm();
    props.onCancel();
	}


  let submitButton;

	if (isPending) {
		submitButton = <LoadingButton />
	} else {
		submitButton = <Button variant='dark' 
													 type='submit' 
													 className='w-100' 
													 aria-label='submit' 
													 disabled={!formIsValid}>{onEdit ? 'Update' : `Add`}
										</Button>
	}
	

  return (<Form id='contact_form' onSubmit={handleSubmit} > 
						<Avatar onEdit={onEdit} onSelectAvatar={handleSelectedAvatar} selectedAvatar={selectedAvatar} />
						<Input label='Name'  
										required={true}
										hasError={nameHasError}
										errorMessage='Please input a valid name'
										inputs={{type: 'text', 
														id: 'name',
														value: name,
														onChange: nameChangeHandler,
														onBlur: nameBlurHandlder,
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
										inputs={{type: 'tel', 
														id: 'contact',
														value: contact,
														onChange: contactChangeHandler,
														onBlur: contactBlurHandlder,
														'aria-label': "Your contact number",
														name: 'contact' }} />

            {submitButton}

            {props.onEdit &&  <Button variant='outline-secondary' 
															type='button' 
															className='w-100 mt-2' 
															onClick={handleCancel}
															aria-label='Cancel edit'>Cancel
															</Button>}
					</Form>
				)
}

export default ContactForm;