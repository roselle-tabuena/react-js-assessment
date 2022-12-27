
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchContact } from '../store/contact-actions';
import CustomCard from '../components/UI/CustomCard';
import Spinner from 'react-bootstrap/Spinner';

const ContactView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { contactId } = params;
  const dataResponse = useSelector((state => state.dataStatus.response))
  const dataStatus = useSelector((state => state.dataStatus.status))
  const actionType = useSelector((state => state.dataStatus.type))


  useEffect(() => {
    dispatch(fetchContact(contactId))
  }, [contactId, dispatch])


  if (dataStatus === 'SUCCESS' && actionType === 'GET') {
    return (<Container>
              <CustomCard title='Contact - View'>
                <Row>
                  <Col>
                  <div className='text-center'>
                    <label className='text-center fs-4 fw-bolder'>{dataResponse.name}</label>
                    <p>ID: {dataResponse.id}</p>
                    <p className='p-0 m-0 fs-6'>Phone: {dataResponse.contact}</p>
                    <p className='p-0 m-0 fs-6'>Email: {dataResponse.email}</p>
                  </div>
                    <Link to='/' className='btn btn-outline-dark'>Back</Link>
                  </Col>
                </Row>
              </CustomCard>
            </Container>)
  } else {
    return <Container>
            <CustomCard title='Contact - View'>
            <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" style={{width: '3rem', height: '3rem'}} >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
           </div>
           </CustomCard>
          </Container>
  }
}

export default ContactView;

