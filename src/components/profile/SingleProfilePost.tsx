import { Col, Card } from "react-bootstrap"
import { IPost } from "../../interfaces/IPost"

interface IProps {
    post: IPost
}

const SingleProfilePost = ({ post }: IProps) => {
    return (
        <>
            <Col className="col-12 col-md-4 col-lg-3 px-0">
                <Card className="single-plant-card">
                    {post.image && <Card.Img variant="top" src={post.image} />}
                    {post.video && <video width="100%" height="300px" controls>
                        <source src={post.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>}
                    {(!post.image && !post.video) && <Card.Img variant="top" src="https://img.freepik.com/free-vector/cultivate-your-mind_1133-10.jpg?w=740&t=st=1684354419~exp=1684355019~hmac=b58ba4f9f16934956a3e812c01a846045b62e2d6d624094b3ade4476e8e95cbe" />}
                </Card>
            </Col>
        </>
    )
}

export default SingleProfilePost