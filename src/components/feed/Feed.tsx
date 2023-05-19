/* eslint-disable react-hooks/exhaustive-deps */
import TheNavbar from "../navbar/TheNavbar"
import '../../css/feed.css'
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { AiOutlineCamera, AiOutlineVideoCamera, AiOutlinePlusCircle } from 'react-icons/ai'
import Suggestion from "./Suggestion";
import Request from "./Request";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Cookies from "js-cookie";
import { fetchAllPostsAction, fetchAllProfilesAction, fetchFollowingAction, fetchMyProfileAction, fetchReceivedRequestsAction, fetchSentRequestsAction } from "../../redux/actions";
import { IUser } from "../../interfaces/IUser";
import { IRequest } from "../../interfaces/IRequest";
import { IPost } from "../../interfaces/IPost";

const Feed = () => {
    const [show, setShow] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [fileType, setFileType] = useState("")
    const [text, setText] = useState("")
    const [file, setFile] = useState<File | null>(null);
    const [reloadPage, setReloadPage] = useState(false)
    const dispatch = useAppDispatch()

    const handleClose = () => {
        setText("")
        setFile(null)
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleFileModalClose = () => {
        setText("")
        setFile(null)
        setShowFileModal(false)
    };
    const handleFileModalShow = () => {
        setText("")
        setShowFileModal(true)
    };


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


    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        } else {
            setFile(null);
        }
    };

    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const handleSubmitTextOnly = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`,
                {
                    method: "POST",
                    body: JSON.stringify({ text, "user": myProfile._id }),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.ok) {
                setText("")
                setReloadPage(!reloadPage)
            } else {
                console.log("Try harder!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("user", myProfile._id)
            let endpoint;

            if (file && file.type.includes("image")) {
                formData.append("postImage", file);
                endpoint = "image"
            } else if (file && file.type.includes("video")) {
                formData.append("postVideo", file);
                endpoint = "video"
            } else {
                await handleSubmitTextOnly()
                return
            }

            if (text === "") {
                formData.append("text", " ")
            } else {
                formData.append("text", text)
            }

            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${endpoint}`,
                {
                    method: "POST",
                    body: formData,
                    headers: { "Authorization": `Bearer ${accessToken}` }
                }
            );
            if (response.ok) {
                setText("")
                setReloadPage(!reloadPage)
            } else {
                console.log("Try harder!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const allProfiles = useAppSelector(state => state.allProfiles.results)
    const allPosts = useAppSelector(state => state.allPosts.results)
    const myProfile = useAppSelector(state => state.myProfile.results)
    const receivedRequests = useAppSelector(state => state.receivedRequests.results)
    const following = useAppSelector(state => state.following.results)

    useEffect(() => {
        const tokenCookie = Cookies.get("accessToken");
        if (tokenCookie) {
            localStorage.setItem("accessToken", tokenCookie)
            dispatch(fetchMyProfileAction(tokenCookie));
            dispatch(fetchAllProfilesAction(tokenCookie));
            dispatch(fetchAllPostsAction(tokenCookie));
        } else {
            const accessToken = localStorage.getItem("accessToken");
            dispatch(fetchMyProfileAction(accessToken as string));
            dispatch(fetchAllProfilesAction(accessToken as string));
            dispatch(fetchAllPostsAction(accessToken as string));
        }
    }, [reloadPage]);


    useEffect(() => {
        if (myProfile && !Array.isArray(myProfile)) {
            const tokenCookie = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchReceivedRequestsAction(myProfile._id, tokenCookie as string));
            dispatch(fetchSentRequestsAction(myProfile._id, tokenCookie as string));
            dispatch(fetchFollowingAction(myProfile._id, tokenCookie as string));
        }

    }, [myProfile, reloadPage]);



    return (
        <div className="feed-body">
            <TheNavbar />
            <Container className="my-4">
                <Row>
                    <Col className="col-12 col-md-8 pr-lg-5">
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
                                                onChange={handleFileUpload}
                                            />
                                            <AiOutlineCamera className="post-icons mx-2" onClick={() => { handleIconClick("image/*"); setFileType("image/*"); handleFileModalShow() }} />
                                            <AiOutlineVideoCamera className="post-icons mx-2" onClick={() => { handleIconClick("video/*"); setFileType("video/*"); handleFileModalShow() }} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {allPosts && allPosts.slice().reverse().map((post: IPost) => <Post post={post} key={post._id} reloadPage={reloadPage} setReloadPage={setReloadPage} />)}
                    </Col>
                    <Col className="col-12 col-md-4 d-none d-md-block">
                        <div className="section-container mb-3 p-4">
                            <p>Follow Requests</p>
                            {receivedRequests && receivedRequests.length === 0 ? <p style={{ fontSize: "13px" }}>You have no new requests!</p> : receivedRequests.slice(0, 4).map((user: IRequest, i: number) => <Request user={user} key={i} setReloadPage={setReloadPage} reloadPage={reloadPage} />)}

                        </div>
                        {allProfiles.filter(
                            (profile: IUser) =>
                                profile._id !== myProfile._id &&
                                !following.some((user: IRequest) => user._id === profile._id)
                        ).length > 0 && <div className="section-container mb-3 p-4">
                                <p>Suggestions</p>
                                {allProfiles && myProfile && following && allProfiles.filter((profile: IUser) => profile._id !== myProfile._id && !following.some((user: IRequest) => user._id === profile._id)).slice(0, 4).map((profile: IUser) => <Suggestion key={profile._id} profile={profile} reloadPage={reloadPage} setReloadPage={setReloadPage} />)}
                            </div>}
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose} className="post-modal">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control value={text} onChange={(e) => setText(e.target.value)} placeholder="What do you have in mind?" className="post-textarea" as="textarea" rows={4} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <div className="mr-auto d-flex align-items-center">
                        <input
                            type="file"
                            id="file-upload"
                            ref={fileInputRef3}
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        <AiOutlineCamera className="post-icons mx-2" onClick={() => { handleModalIconClick("image/*"); setFileType("image/*"); }} />
                        <AiOutlineVideoCamera className="post-icons mx-2" onClick={() => { handleModalIconClick("video/*"); setFileType("video/*"); }} />
                        {file && <div style={{ fontSize: "13px" }}>{file.name}</div>}

                    </div>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="post-btn" onClick={async () => {
                        await handleSubmit()
                        handleClose()
                    }}>
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
                        onChange={handleFileUpload}
                    />
                    <AiOutlinePlusCircle className="post-icons" />
                </Modal.Body>
                <Modal.Footer>
                    {file && <div style={{ fontSize: "13px" }}>{file.name}</div>}
                    <Button variant="secondary" onClick={handleFileModalClose}>
                        Cancel
                    </Button>
                    <Button className="post-btn" onClick={async () => {
                        await handleSubmit()
                        handleFileModalClose()
                    }}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Feed