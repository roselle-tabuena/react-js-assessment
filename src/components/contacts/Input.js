import { Form} from 'react-bootstrap';

const Input = (props) => {

  const { inputs, label, required } = props 

  return (<Form.Group className="mb-3">
            <Form.Label htmlFor={inputs.id}>{label} {required && <span className='text-danger'>*</span>}</Form.Label>
            <Form.Control {...inputs}  />
          </Form.Group>)
}

export default Input;