
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { fetchContact } from '../store/contact-actions';
import { useDispatch, useSelector } from 'react-redux';
import CustomCard from '../components/UI/CustomCard';

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
                    <ul>
                      <li>{dataResponse.id}</li>
                      <li>{dataResponse.name}</li>
                      <li>{dataResponse.contact}</li>
                      <li>{dataResponse.email}</li>
                    </ul>
                    <Link to='/'>Back</Link>
                  </Col>
                </Row>
              </CustomCard>
            </Container>)
  } else {
    return <p>Loading...</p>
  }
}

export default ContactView;

