import { Table, ButtonGroup, Button } from 'react-bootstrap'
import CustomCard from '../components/UI/CustomCard';

const ContactList = () => {

  return (
      
    <Table className='mt-5' striped bordered responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Email</th>
          <th className='w-25 text-center'></th>
        </tr>
      </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td className='text-center'>

            <ButtonGroup className="mb-2">
                <Button variant='outline-dark'>View</Button>
                <Button variant='outline-dark'>Edit</Button>
                <Button variant='outline-dark'>Delete</Button>
            </ButtonGroup>

            </td>
          </tr>
        </tbody>
      </Table>  )
}

export default ContactList;

