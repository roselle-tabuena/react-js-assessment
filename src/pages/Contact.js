import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';


import ContactList from "../containers/ContactList";
import CustomCard from '../components/UI/CustomCard';
import NewContact from '../containers/NewContact'

const Contact = () => {

  const onEdit =  useSelector((state => state.onEdit));
  const [editMode, ] = onEdit;

  return (<Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <CustomCard title={editMode ? 'Edit - Contact' : 'Add - Contact' }>
                <NewContact />
              </CustomCard>
            </Col>
          </Row>
          
          <Row>
            <Col md={12}>
              <div aria-label='List of Contacts'>
                <h1 className='fs-2 mt-5 mb-3'>Contact List</h1>
              </div>
              <ContactList />
            </Col>
          </Row>
        </Container>)
}

export default Contact;