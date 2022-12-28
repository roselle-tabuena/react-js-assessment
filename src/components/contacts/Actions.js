import { Link } from 'react-router-dom';

import {  ButtonGroup, Button } from 'react-bootstrap'

const Actions = (props) => {

  const { id, editContactHandler, removeContactHandler } = props;

  return (<ButtonGroup className="mb-2">
            <Link className='btn btn-outline-dark' aria-label='View contact' to={`/contacts/${id}`}>
              View
            </Link>
            <Button variant='outline-dark' aria-label='Edit contact' onClick={editContactHandler.bind(null, id)}>Edit</Button>
            <Button variant='outline-dark' aria-label='Remove contact' onClick={removeContactHandler.bind(null, id)}>Delete</Button>
          </ButtonGroup>)
}

export default Actions;