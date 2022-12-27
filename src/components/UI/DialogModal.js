import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const DialogModal = (props) => {

  let content;

  if(props.dataStatus === 'LOADING') {
    content = <div className='text-center'>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
  } else if(props.dataStatus === 'SUCCESS') {
    content = props.message
  }


  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title} {props.isLoading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DialogModal;