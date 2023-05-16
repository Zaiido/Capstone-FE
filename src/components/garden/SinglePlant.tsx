import { Col, Card, DropdownButton, Dropdown } from "react-bootstrap"
import { AiOutlineEllipsis } from "react-icons/ai"

const SinglePlant = () => {
    return (<Col className="col-12 col-md-4 col-lg-3 px-0">
        <Card>
            <Card.Img variant="top" src="./assets/feed/cactus-avatar.jpg" />
            <Card.Body>
                <Card.Title>Plant Name</Card.Title>
                <Card.Text>
                    Details
                </Card.Text>
            </Card.Body>
            <DropdownButton
                className="post-actions-btn actions garden-actions"
                key='down'
                id='dropdown-button-drop-down'
                drop='down'
                variant="secondary"
                title={<AiOutlineEllipsis className="post-icons" />}
            >
                <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
            </DropdownButton>
        </Card>
    </Col>)
}

export default SinglePlant