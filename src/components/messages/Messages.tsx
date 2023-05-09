/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import TheNavbar from "../navbar/TheNavbar"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { fetchFollowingAction, fetchMyProfileAction } from "../../redux/actions"
import { IRequest } from "../../interfaces/IRequest"
import { AiOutlineCamera, AiOutlineVideoCamera } from 'react-icons/ai'
import NewChat from "./NewChat"
import '../../css/messages.css'
import Chat from "./Chat"
import SingleMessage from "./SingleMessage"

const Messages = () => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const following = useAppSelector(state => state.following.results)
    const [reloadPage, setReloadPage] = useState(false)

    const dispatch = useAppDispatch()


    useEffect(() => {

        const tokenCookie = Cookies.get("accessToken");
        if (tokenCookie) {
            dispatch(fetchMyProfileAction(tokenCookie));
        } else {
            const accessToken = localStorage.getItem("accessToken");
            dispatch(fetchMyProfileAction(accessToken as string));
        }
    }, [reloadPage]);

    useEffect(() => {
        if (myProfile && !Array.isArray(myProfile)) {
            const tokenCookie = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchFollowingAction(myProfile._id, tokenCookie as string));
        }

    }, [myProfile, reloadPage]);


    return (
        <div className="feed-body">
            <TheNavbar />
            <Container className="my-4">
                <Row>
                    <Col className="col-12 col-md-5">
                        <Row>
                            <Col className="col-12">
                                <div className="section-container mb-3 p-4">
                                    <div>
                                        <span className="ml-2">Chats</span>
                                    </div>
                                    <div className="network-container">
                                        {following && following.map((user: IRequest) => <Chat key={user._id} reloadPage={reloadPage} setReloadPage={setReloadPage} user={user} />)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12">
                                <div className="section-container mb-3 p-4">
                                    <div>
                                        <span className="ml-2">Start a new chat</span>
                                    </div>
                                    <div className="network-container">
                                        {following && following.map((user: IRequest) => <NewChat key={user._id} reloadPage={reloadPage} setReloadPage={setReloadPage} user={user} />)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-12 col-md-7">
                        <Row>
                            <Col className="col-12">
                                <div className="section-container mb-3 p-4">
                                    <div className="messages-container d-flex flex-column">
                                        <SingleMessage />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12">
                                <div className="section-container mb-3 p-4">
                                    <div className="send-message-container">
                                        <div className="d-flex flex-column">
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Control placeholder="Message..." className="post-textarea" as="textarea" rows={2} />
                                            </Form.Group>
                                            <div className="d-flex align-items-center px-1 mt-3">
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    // ref={fileInputRef}
                                                    style={{ display: 'none' }}
                                                // onChange={handleFileUpload}
                                                />
                                                <AiOutlineCamera className="post-icons mx-2" />
                                                <AiOutlineVideoCamera className="post-icons mx-2" />
                                                <Button className="login-btn ml-auto mr-3">Send</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Messages