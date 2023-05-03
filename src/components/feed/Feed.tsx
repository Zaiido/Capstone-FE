import TheNavbar from "./TheNavbar"
import '../../css/feed.css'
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { useRef, useState } from "react";
import Post from "./Post";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlinePlusCircle } from 'react-icons/ai'
import Suggestion from "./Suggestion";
import Request from "./Request";

const Feed = () => {
    const [show, setShow] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [fileType, setFileType] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleFileModalClose = () => setShowFileModal(false);
    const handleFileModalShow = () => setShowFileModal(true);


    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef2 = useRef<HTMLInputElement>(null);
    const fileInputRef3 = useRef<HTMLInputElement>(null);

    const handleIconClick = (accept: string) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
            fileInputRef.current.click();
        }
    };

    const handleModalBodyClick = (accept: string) => {
        if (fileInputRef2.current) {
            fileInputRef2.current.accept = accept;
            fileInputRef2.current.click();
        }
    };

    const handleModalIconClick = (accept: string) => {
        if (fileInputRef3.current) {
            fileInputRef3.current.accept = accept;
            fileInputRef3.current.click();
        }
    };

    return (
        <div className="feed-body">
            <TheNavbar />
            <Container className="my-4">
                <Row>
                    <Col className="col-12 col-md-8 pr-5">
                        <Row className="mb-5">
                            <Col className="col-12">
                                <div className="section-container px-4 py-3">
                                    <div className="d-flex flex-column">
                                        <Button onClick={handleShow} className="badge-pill text-left" variant="light">Start a new post</Button>
                                        <div className="d-flex px-1 mt-3">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                            />
                                            <AiOutlineCamera className="post-icons mx-2" onClick={() => { handleIconClick("image/*"); setFileType("image/*"); handleFileModalShow() }} />
                                            <AiOutlineVideoCamera className="post-icons mx-2" onClick={() => { handleIconClick("video/*"); setFileType("video/*"); handleFileModalShow() }} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Post />
                        <Post />
                    </Col>
                    <Col className="col-12 col-md-4 d-none d-md-block">
                        <div className="section-container mb-3 p-4">
                            <p>Follow Requests</p>
                            <Request />
                            <Request />
                            <Request />
                            <Request />
                        </div>
                        <div className="section-container mb-3 p-4">
                            <p>Suggestions</p>
                            <Suggestion />
                            <Suggestion />
                            <Suggestion />
                            <Suggestion />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} className="post-modal">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control placeholder="What do you have in mind?" className="post-textarea" as="textarea" rows={4} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <div className="mr-auto">
                        <input
                            type="file"
                            id="file-upload"
                            ref={fileInputRef3}
                            style={{ display: 'none' }}
                        />
                        <AiOutlineCamera className="post-icons mx-2" onClick={() => { handleModalIconClick("image/*"); setFileType("image/*"); }} />
                        <AiOutlineVideoCamera className="post-icons mx-2" onClick={() => { handleModalIconClick("video/*"); setFileType("video/*"); }} />

                    </div>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="post-btn" onClick={handleClose}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showFileModal} onHide={handleFileModalClose} className="post-modal file-modal">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body onClick={() => handleModalBodyClick(fileType)}>
                    {/* <img src="https://img.freepik.com/free-vector/watercolor-blue-winter-background_23-2149147681.jpg?size=626&ext=jpg&uid=R88507229&ga=GA1.2.1424127144.1679833548&semt=ais" alt="" /> */}
                    <input
                        type="file"
                        id="file-upload"
                        ref={fileInputRef2}
                        style={{ display: 'none' }}
                    />
                    <AiOutlinePlusCircle className="post-icons" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFileModalClose}>
                        Cancel
                    </Button>
                    <Button className="post-btn" onClick={handleFileModalClose}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Feed