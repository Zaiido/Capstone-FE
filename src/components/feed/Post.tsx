import { useState } from "react"
import { Row, Col, Modal, DropdownButton, Dropdown, Form, Button } from "react-bootstrap"
import { AiOutlineComment, AiOutlineEllipsis, AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { BsArrowClockwise } from 'react-icons/bs'
import Comment from "./Comment"

const Post = () => {
    const [imgSrc, setImgSrc] = useState("")
    const [show, setShow] = useState(false);
    const [showRepostModal, setShowRepostModal] = useState(false);
    const [commentsShow, setCommentsShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseRepostModal = () => setShowRepostModal(false);
    const handleShowRepostModal = () => setShowRepostModal(true);

    return (
        <>
            <Row className="my-4">
                <Col className="col-12">
                    <div className="section-container pt-4 px-5">
                        <div className="post">
                            <div className="user-section">
                                <div className="img-container">
                                    <img src="./assets/feed/cactus-avatar.jpg" alt="User Avatar" />
                                </div>
                                <div className="username">
                                    Username
                                </div>
                                <div className="ml-auto">
                                    <DropdownButton
                                        className="post-actions-btn"
                                        key='down'
                                        id='dropdown-button-drop-down'
                                        drop='down'
                                        variant="secondary"
                                        title={<AiOutlineEllipsis className="post-icons" />}
                                    >
                                        <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
                                    </DropdownButton>

                                </div>
                            </div>
                            <div className="media-section my-3">
                                <div className="media-container">
                                    <img
                                        onClick={(e) => { setImgSrc(e.currentTarget.src); handleShow() }}
                                        src="https://img.freepik.com/free-photo/hanging-pothos-plant-gray_53876-146607.jpg?size=626&ext=jpg&uid=R88507229&ga=GA1.2.1424127144.1679833548&semt=sph" alt="Post" />
                                </div>
                            </div>
                            <div className="text-section">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam distinctio voluptate, veritatis, voluptates, sed deleniti cupiditate minus quo veniam eum ad ipsa vero. Maiores blanditiis doloremque ea quam suscipit dicta.
                                Officia debitis delectus eaque exercitationem minima laboriosam illum rerum dignissimos omnis at labore reprehenderit eius quod blanditiis perferendis error aspernatur ad, aut reiciendis! Dolorem sequi perferendis animi labore, expedita exercitationem?
                            </div>
                            <div className="d-flex align-items-center justify-content-between reactions-container my-3">
                                <div className="d-flex align-items-center"><AiFillLike className="post-icons mr-2" />  0</div>
                                <div className="comments-number" onClick={() => setCommentsShow(!commentsShow)}>2 Comments</div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2 p-3 action-icons">
                            <div className="d-flex align-items-center p-2 action-btn"><AiOutlineLike className="post-icons mr-2" />Like</div>
                            <div className="d-flex align-items-center p-2 action-btn" onClick={() => setCommentsShow(!commentsShow)}><AiOutlineComment className="post-icons mr-2" />Comment</div>
                            <div className="d-flex align-items-center p-2 action-btn" onClick={handleShowRepostModal}><BsArrowClockwise className="post-icons mr-2" />Repost</div>
                        </div>
                        {commentsShow && <div className="post-comments">
                            <div className="d-flex">
                                <div className="img-container">
                                    <img src="./assets/feed/cactus-avatar.jpg" alt="Avatar" />
                                </div>
                                <Form className="w-100">
                                    <Form.Group>
                                        <Form.Control className="badge-pill" type="text" placeholder="Add a comment" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="all-comments">
                                <Comment />
                            </div>
                        </div>}
                    </div>
                </Col>
            </Row>
            <Modal className="media-modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <img src={imgSrc} alt="Post" />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <Modal className="repost-modal" show={showRepostModal} onHide={handleCloseRepostModal}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to repost this?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRepostModal}>
                        Cancel
                    </Button>
                    <Button className="post-btn">
                        Repost
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Post