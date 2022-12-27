import { Link } from 'react-router-dom'
import {Navbar, Container} from 'react-bootstrap';

const CustomNav = () => {

  return (<Navbar bg="dark">
            <Container>
							<Link to='/contacts' className='text-white navbar-brand fs-2'>
								CRUD Contact
							</Link>
            </Container>
        	</Navbar>)

}

export default CustomNav;