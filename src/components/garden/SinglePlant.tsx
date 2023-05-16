import { Col, Card, DropdownButton, Dropdown } from "react-bootstrap"
import { AiOutlineEllipsis } from "react-icons/ai"

interface IProps {
    plant: any
}

const SinglePlant = ({ plant }: IProps) => {
    const dateString = plant.createdAt;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    return (
        <Col className="col-12 col-md-4 col-lg-3 px-0">
            <Card>
                <Card.Img variant="top" src={plant.image} />
                <Card.Body>
                    <Card.Title>{plant.name}</Card.Title>
                    <Card.Text style={{ fontSize: "13px" }}>
                        {formattedDate}
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