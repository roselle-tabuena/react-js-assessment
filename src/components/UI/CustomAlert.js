import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = (props) => {


  const [show, setShow] = useState(true);
  const variant = props.error ? 'danger' : 'success'


  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  if(show === false) {
    return null
  }

  return (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      <p>{props.message ? props.message : props.error} {show}</p>
    </Alert>
  );
}

export default CustomAlert;