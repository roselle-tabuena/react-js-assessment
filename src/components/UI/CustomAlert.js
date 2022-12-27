import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = (props) => {
  const [show, setShow] = useState(true);

  const variants = { 'ERROR': 'danger',
                     'SUCCESS': 'success' }

  if(!show) {
    return 
  }

  console.log(props.type)
  return (
    <Alert variant={variants[props.type]} onClose={() => setShow(false)} dismissible>
      <p>{props.message}</p>
    </Alert>
  );
}

export default CustomAlert;