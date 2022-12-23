import { Card } from 'react-bootstrap'

const CustomCard = (props) => {

    return <Card className='mt-5 shadow border-0'>
						<Card.Body>
							{props.title && <Card.Title>{props.title}</Card.Title>}
							<hr />
							{props.children}
						</Card.Body>
					</Card>
}

export default CustomCard;