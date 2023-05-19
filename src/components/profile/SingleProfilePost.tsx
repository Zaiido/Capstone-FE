import { Col, Card, Button, Modal } from "react-bootstrap"
import { IPost } from "../../interfaces/IPost"
import { useState } from "react";

interface IProps {
    post: IPost,
    otherProfile: boolean
}

const SingleProfilePost = ({ post, otherProfile }: IProps) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dateString = post.createdAt;
    const datetime = new Date(dateString);
    const formattedDate = `${datetime.getDate() < 10 ? '0' : ''}${datetime.getDate()}.${datetime.getMonth() + 1 < 10 ? '0' : ''}${datetime.getMonth() + 1}.${datetime.getFullYear()}`;
    const formattedTime = `${datetime.getHours() < 10 ? '0' : ''}${datetime.getHours()}:${datetime.getMinutes() < 10 ? '0' : ''}${datetime.getMinutes()}`;

    return (
        <>
            <Col className="col-12 col-md-4 col-lg-3 px-0">
                <Card className="single-plant-card" onClick={handleShow}>
                    {post.image && <Card.Img variant="top" src={post.image} />}
                    {post.video && <video width="100%" height="300px">
                        <source src={post.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>}
                    {post.repost?.image && <Card.Img variant="top" src={post.repost?.image} />}
                    {post.repost?.video && <video width="100%" height="300px">
                        <source src={post.repost?.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>}
                    {(!post.image && !post.video) && (!post.repost?.image && !post.repost?.video) && <Card.Img variant="top" src="https://img.freepik.com/free-vector/cultivate-your-mind_1133-10.jpg?w=740&t=st=1684354419~exp=1684355019~hmac=b58ba4f9f16934956a3e812c01a846045b62e2d6d624094b3ade4476e8e95cbe" />}
                </Card>
            </Col>
            <Modal show={show} onHide={handleClose} className="profile-post-modal">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {otherProfile ? <div style={{ fontSize: "12px" }}>{post.user.username}, on {formattedDate} at {formattedTime}</div> : <div style={{ fontSize: "12px" }}>You, on {formattedDate} at {formattedTime}</div>}
                    {post.image && <img src={post.image} alt="Post" />}
                    {post.video && <video width="100%" height="300px" controls>
                        <source src={post.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>}
                    {post.text && <p>{post.text}</p>}
                    {post.repost && <div style={{ fontSize: "12px" }}>reposted from: {post.repost.user.username}</div>}
                    {post.repost && post.repost.image && <img src={post.repost.image} alt="Post" />}
                    {post.repost && post.repost.video && <video width="100%" height="300px" controls>
                        <source src={post.repost.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>}
                    {post.repost && post.repost.text && <p>{post.repost.text}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SingleProfilePost