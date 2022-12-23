import { Form} from 'react-bootstrap';

const Input = (props) => {

  const { inputs, label, required, errorMessage, hasError } = props 

  const errorDisplay = <div id={`${inputs.id}HelpBlock`} class="form-text text-danger">
                          {errorMessage}
                        </div>

  return (<Form.Group className="mb-3">
            <Form.Label htmlFor={inputs.id}>{label} {required && <span className='text-danger'>*</span>}</Form.Label>
            <Form.Control {...inputs} className={hasError && 'border-danger'} ariaDescribedby={`${inputs.id}HelpBlock`} />
            {hasError && errorDisplay}

          </Form.Group>)
}

export default Input;