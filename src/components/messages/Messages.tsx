/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import TheNavbar from "../navbar/TheNavbar"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { fetchAllChatsAction, fetchFollowingAction, fetchMyProfileAction } from "../../redux/actions"
import { IRequest } from "../../interfaces/IRequest"
import { AiOutlineCamera, AiOutlineVideoCamera } from 'react-icons/ai'
import NewChat from "./NewChat"
import '../../css/messages.css'
import Chat from "./Chat"
import SingleMessage from "./SingleMessage"
import { IChat } from "../../interfaces/IChat"
import { io } from 'socket.io-client'
import { IMessage } from "../../interfaces/IMessage"
import uniqid from 'uniqid'

const socket = io(process.env.REACT_APP_BE_URL!, { transports: ["websocket"] });

const Messages = () => {

    const [reloadPage, setReloadPage] = useState(false)

    const myProfile = useAppSelector(state => state.myProfile.results)
    const following = useAppSelector(state => state.following.results)
    const allChats = useAppSelector(state => state.allChats.results)
    const activeChat = useAppSelector(state => state.activeChat.results)

    const dispatch = useAppDispatch()

    const [allMessages, setAllMessages] = useState<IMessage[]>([])
    const [messageText, setMessageText] = useState("")

    useEffect(() => {
        const tokenCookie = Cookies.get("accessToken");
        if (tokenCookie) {
            dispatch(fetchMyProfileAction(tokenCookie));
        } else {
            const accessToken = localStorage.getItem("accessToken");
            dispatch(fetchMyProfileAction(accessToken as string));
        }

        // SOCKET IO
        socket.emit("joinRoom", activeChat._id)
        socket.on("roomName", (roomName) => {
            console.log(roomName)
        })

        socket.on("newMessage", (newMessage) => {
            const isDuplicate = allMessages.some(
                (message) => message.manualId === newMessage.message.manualId
            );

            if (!isDuplicate) {
                setAllMessages((allMessages) => [...allMessages, newMessage])
            }
        })

        return () => {
            socket.off("newMessage");
        }
    }, [dispatch, activeChat])

    const sendNewMessage = () => {
        const newMessage = {
            manualId: uniqid(),
            sender: myProfile._id,
            text: messageText,
            createdAt: new Date().toLocaleString("en-GB"),
        };
        socket.emit("sendMessage", { message: newMessage });
        const isDuplicate = allMessages.some(
            (message) => message.manualId === newMessage.manualId
        );

        if (!isDuplicate) {
            setAllMessages([...allMessages, newMessage])
        }
        setMessageText("")
    };

    useEffect(() => {
        if (myProfile && !Array.isArray(myProfile)) {
            const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchFollowingAction(myProfile._id, accessToken as string));
            dispatch(fetchAllChatsAction(myProfile._id, accessToken as string))
        }

    }, [myProfile, dispatch]);

    useEffect(() => {
        setAllMessages([])
    }, [reloadPage])

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
                                        {allChats && allChats.map((chat: IChat) => <Chat key={chat._id} reloadPage={reloadPage} setReloadPage={setReloadPage} chat={chat} />)}
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
                                        {following &&
                                            following.filter((user: IRequest) =>
                                                !allChats.some((chat: IChat) =>
                                                    chat.members.length === 2 &&
                                                    chat.members.some((member: IRequest) => member._id === user._id) &&
                                                    chat.members.some((member: IRequest) => member._id === myProfile._id)
                                                )
                                            ).map((user: IRequest) => (
                                                <NewChat key={user._id} reloadPage={reloadPage} setReloadPage={setReloadPage} user={user} />
                                            ))}
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
                                        {activeChat && activeChat.messages?.map((message: IMessage) => <SingleMessage message={message} historyChat={true} />)}
                                        {allMessages && allMessages.map((message: IMessage) => <SingleMessage message={message} historyChat={false} />)}
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
                                                <Form.Control placeholder="Message..." value={messageText} onChange={(e) => setMessageText(e.target.value)} className="post-textarea" as="textarea" rows={2} />
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
                                                <Button className="login-btn ml-auto mr-3"
                                                    onClick={(e) => {
                                                        sendNewMessage()
                                                    }
                                                    }
                                                >
                                                    Send</Button>
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