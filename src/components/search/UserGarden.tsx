import { Col, Card } from "react-bootstrap"

interface IProps {
    plant: any
}

const UserGarden = ({ plant }: IProps) => {
    const dateString = plant.createdAt;
    const datetime = new Date(dateString);
    const formattedDate = `${datetime.getDate() < 10 ? '0' : ''}${datetime.getDate()}.${datetime.getMonth() + 1 < 10 ? '0' : ''}${datetime.getMonth() + 1}.${datetime.getFullYear()}`;
    const formattedTime = `${datetime.getHours() < 10 ? '0' : ''}${datetime.getHours()}:${datetime.getMinutes() < 10 ? '0' : ''}${datetime.getMinutes()}`;

    return (
        <>
            <Col className="col-12 col-md-4 col-lg-3 px-0">
                <Card className="single-plant-card">
                    <Card.Img variant="top" src={plant.image} />
                    <Card.Body>
                        <Card.Title>{plant.name}</Card.Title>
                        <Card.Text style={{ fontSize: "13px" }}>
                            On {formattedDate}, at {formattedTime}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default UserGarden