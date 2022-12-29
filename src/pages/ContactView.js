
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { fetchContact } from '../lib/api'
import useResponse from '../hooks/use-response';
import CustomCard from '../components/UI/CustomCard';
import Spinner from 'react-bootstrap/Spinner';
import LetteredAvatar from 'react-lettered-avatar';

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
    const img = require(`../assets/avatar/${data.avatar}.png`);

    content =  <Row>
                <Col>
                  <table className='w-auto mx-auto'>
                    <tbody>

                      <tr>
                        <td className='text-center'  colSpan='2'>
                          {data.avatar === 'no-avatar' && <LetteredAvatar name={data.name}  
                                                                          imgClass='mx-auto'
                                                                          backgroundColor="#023167" 
                                                                          size={100} />}

                          {data.avatar !== 'no-avatar' && <img src={img} alt={`${data.avatar}-avatar`} />}
                        </td> 
                      </tr>   
                      <tr className='text-center'>
                        <td  colSpan='2'><label className='text-center fs-4 fw-bolder' arial-label='contact-name'>{data.name}</label></td>
                      </tr>

                      <tr>
                        <th>ID: </th>
                        <td className='ps-2'>{data.id}</td>
                      </tr>
                        
                      <tr>
                        <th>Email: </th>
                        <td className='ps-2'>{data.email}</td>
                      </tr>
                      
                      {data.contact && <tr>
                                          <th>Phone: </th>
                                          <td className='ps-2'>{data.contact}</td>
                                        </tr>}
                    </tbody>
                  </table>
                  
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
            <Row>
            <Col md={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2}}>
              <CustomCard title='View - Contact'>
                {content}
                <Link to='/' 
                      aria-label='Back to index' 
                      title="Go back to contact" 
                      className='btn btn-outline-dark mt-3'>Back</Link>
              </CustomCard>
            </Col>
            </Row>
          </Container>
}

export default ContactView;

