import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function LoadingButton() {
  return (<Button variant="dark" className='w-100' disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className='me-2'
                  />
                  Loading...
                </Button>);
}

export default LoadingButton;