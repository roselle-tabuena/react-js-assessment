
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchContact, deleteContact } from '../lib/api'
import useResponse from '../hooks/use-response';
import CustomCard from '../components/UI/CustomCard';
import Spinner from 'react-bootstrap/Spinner';

const ContactView = () => {
  const params = useParams();
  const { contactId } = params;

  const { sendRequest, 
          status, 
          data, 
          error } = useResponse(fetchContact, true, 'FETCH');

  useEffect(() => {
    sendRequest(contactId)
  }, [contactId, sendRequest])


  let content =  <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status" style={{width: '3rem', height: '3rem'}} >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>

  if (status === 'completed' && data !== null) {
    content =  <Row>
                <Col>
                <div className='text-center'>
                  <label className='text-center fs-4 fw-bolder'>{data.name}</label>
                  <p>ID: {data.id}</p>
                  {data.contact && <p className='p-0 m-0 fs-6'>Phone: {data.contact}</p>}
                  <p className='p-0 m-0 fs-6'>Email: {data.email}</p>
                </div>
                  <Link to='/' className='btn btn-outline-dark'>Back</Link>
                </Col>
              </Row>
  }

  if (status === 'completed' && data === null) {
    content = <div className="d-flex justify-content-center">
                <p>Contact doesn't exist!</p>
              </div>
  }

  if (error) {
    content = <div className="d-flex justify-content-center">
                <p>Something went wrong!</p>
              </div>
  }


    return <Container>
            <CustomCard title='Contact - View'>
            {content}
           </CustomCard>
          </Container>
}

export default ContactView;

