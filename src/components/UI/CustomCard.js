import { Card } from 'react-bootstrap'

const CustomCard = (props) => {

    return <Card className='mt-5 shadow border-0'>
						<Card.Body>
							{props.title && <h1 className='fs-4' aria-label="Header">{props.title}</h1>}
							<hr />
							{props.children}
						</Card.Body>
					</Card>
}

export default CustomCard;