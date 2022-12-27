import CyborgDelete from '../assets/cyborg-delete.png'
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () =>  {

    return <Container>
            <Row>
              <Col className='text-center'>
                <img src={CyborgDelete} alt='cyborg' className='mt-5'/>
                <h1 className='text-uppercase mt-4'>Page not found</h1>
                <p>The link you followed probably broken or the page has been removed</p>
              </Col>
            </Row>
           </Container>
}

export default NotFound;