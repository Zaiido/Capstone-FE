import { Col } from "react-bootstrap"
import { AiFillPlusCircle } from "react-icons/ai"

interface IProps {
    result: any
}

const SingleMatch = ({ result }: IProps) => {
    const randomIndex = Math.floor(Math.random() * result.images.length);
    return (
        <Col className="col-12 col-md-6 my-2">
            <div className="d-flex align-items-center p-1 plant-details-2">
                <div className="plant-img-container mr-1">
                    <img src={result.images[randomIndex].url.s} alt="Plant" />
                </div>
                <div className="d-flex flex-column">
                    <div>{result.species.scientificNameWithoutAuthor}</div>
                    <div style={{ fontSize: "13px" }}>{result.score}</div>
                </div>
                <AiFillPlusCircle className="ml-auto mr-2 post-icons" />
                {/* <Button className="ml-auto mr-2 post-btn">Add to garden</Button> */}
            </div>
        </Col>
    )
}

export default SingleMatch