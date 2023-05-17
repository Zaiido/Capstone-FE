import { useState } from "react";
import { Col, Card } from "react-bootstrap"

interface IProps {
    result: any
}

const SingleDiagnose = ({ result }: IProps) => {
    const [randomIndex] = useState(Math.floor(Math.random() * result?.similar_images?.length));


    return (
        <Col className="col-12 col-md-4 col-lg-3 px-1 diagnose-container">
            <Card>
                <Card.Img variant="top" src={result?.similar_images[randomIndex]?.url} />
                <Card.Body>
                    <Card.Title>{result?.disease_details?.local_name}</Card.Title>
                    <Card.Text className="line-clamp" style={{ fontSize: "13px" }}>
                        {result?.disease_details?.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default SingleDiagnose