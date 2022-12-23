import './App.css';
import { Container, Row, Col } from 'react-bootstrap';

import CustomNav from './components/UI/CustomNav';
import ContactForm from './containers/ContactForm';
import ContactList from './containers/ContactList';

function App() {
  return (
    <>
    <CustomNav />

    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <ContactForm />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <ContactList />
        </Col>

      </Row>
    </Container>
    </>
  );
}

export default App;
