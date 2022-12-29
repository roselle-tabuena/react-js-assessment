import { Link } from 'react-router-dom'
import {Navbar, Container} from 'react-bootstrap';

const CustomNav = () => {

  return (<Navbar bg="dark" className='fixed-top mb-5'>
            <Container>
							<Link to='/contacts' className='text-white font-weight-bold navbar-brand fs-2'>
								CRUD Contact
							</Link>					
            </Container>
        	</Navbar>)

}

export default CustomNav;