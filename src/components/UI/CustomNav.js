
import {Navbar, Container} from 'react-bootstrap';

const CustomNav = () => {

  return (<Navbar bg="dark">
            <Container>
            <Navbar.Brand 
							href="#home" 
							className='text-white'>
								<i className="bi bi-telephone-fill px-1"></i> CRUD Contact
						</Navbar.Brand>
            </Container>
        	</Navbar>)

}

export default CustomNav;