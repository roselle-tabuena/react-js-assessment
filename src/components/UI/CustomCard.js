import { Card } from 'react-bootstrap'

const CustomCard = (props) => {

    return <Card className='mt-5 shadow border-0'>
						<Card.Body>
							<div aria-label='header form title'>
								{props.title && <h1 className='fs-4'>{props.title}</h1>}
							</div>
							<hr />
							{props.children}
						</Card.Body>
					</Card>
}

export default CustomCard;