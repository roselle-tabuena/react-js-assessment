
import { Form, Button } from 'react-bootstrap';

import CustomCard from '../components/UI/CustomCard';
import Input from '../components/contacts/Input';

const ContactForm = () => {

    const onSubmitHandler = (event) =>{
        event.preventDefault()

				console.log(event.target)
    }

    return (<CustomCard>
							<Form id='contact_form' onSubmit={onSubmitHandler}> 

							<Input label='Name:'  
										 required={true}
										 inputs={{type: 'text', 
															id: 'name',
															name: 'name' }} />


							<Input label='Email:'  
										 required={true}
										 inputs={{type: 'email', 
															id: 'email',
															name: 'email' }} />


							
							<Input label='Contact:'  
										 required={false}
										 inputs={{type: 'text', 
															id: 'contact',
															name: 'contact' }} />


								<Button variant='dark' type='submit' className='w-100'>Add</Button>
							</Form>
            </CustomCard>
					)
}

export default ContactForm;