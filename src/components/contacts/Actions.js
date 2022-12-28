import { Link } from 'react-router-dom';

import {  ButtonGroup, Button } from 'react-bootstrap'

const Actions = (props) => {

  const { id, editContactHandler, removeContactHandler } = props;

  return (<ButtonGroup className="mb-2">
            <Link className='btn btn-outline-dark' to={`/contacts/${id}`}>
              View
            </Link>
            <Button variant='outline-dark' onClick={editContactHandler.bind(null, id)}>Edit</Button>
            <Button variant='outline-dark' onClick={removeContactHandler.bind(null, id)}>Delete</Button>
          </ButtonGroup>)
}

export default Actions;