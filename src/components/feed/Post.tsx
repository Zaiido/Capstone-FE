/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Row, Col, Modal, DropdownButton, Dropdown, Form, Button } from "react-bootstrap"
import { AiOutlineComment, AiOutlineEllipsis, AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { BsArrowClockwise } from 'react-icons/bs'
import Comment from "./Comment"
import { IPost } from "../../interfaces/IPost"
import { useAppSelector } from "../../redux/hooks"
import Cookies from "js-cookie"
import { IRequest } from "../../interfaces/IRequest"
import { IComment } from "../../interfaces/IComment"


interface IProps {
    post: IPost
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}


const Post = (props: IProps) => {
    const [imgSrc, setImgSrc] = useState("")
    const [show, setShow] = useState(false);
    const [showRepostModal, setShowRepostModal] = useState(false);
    const [commentsShow, setCommentsShow] = useState(false)
    const [likesNumber, setLikesNumber] = useState("")
    const [allLikes, setAllLikes] = useState<IRequest[]>([])
    const [liked, setLiked] = useState(false)
    const [postToEdit, setPostToEdit] = useState(false)
    const [postText, setPostText] = useState(props.post.text)
    const [comments, setComments] = useState<IComment[]>([])

    const myProfile = useAppSelector(state => state.myProfile.results)
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseRepostModal = () => setShowRepostModal(false);
    const handleShowRepostModal = () => setShowRepostModal(true);


    const getLikes = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${props.post._id}/likes`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                const likes = await response.json()
                setLikesNumber(likes.length)
                setAllLikes(likes)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const likeOrDislike = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${props.post._id}/like`,
                {
                    method: "POST",
                    body: JSON.stringify({ userId: myProfile._id }),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.ok) {
                setLiked(!liked)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${props.post._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    }
                }
            );
            if (response.ok) {
                props.setReloadPage(!props.reloadPage)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const editPost = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${props.post._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({ text: postText }),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.ok) {
                props.setReloadPage(!props.reloadPage)
                setPostToEdit(false)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const getComments = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${props.post._id}/comments`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                const comments = await response.json()
                setComments(comments)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getLikes()
        getComments()
    }, [liked])


    return (
        <>
            <Row className="my-4">
                <Col className="col-12">
                    <div className="section-container pt-4 px-5">
                        <div className="post">
                            <div className="user-section">
                                <div className="img-container">
                                    <img src={props.post.user.avatar} alt="User Avatar" />
                                </div>
                                <div className="username">
                                    {props.post.user.username}
                                </div>
                                {myProfile && myProfile._id === props.post.user._id &&
                                    <div className="ml-auto">
                                        <DropdownButton
                                            className="post-actions-btn"
                                            key='down'
                                            id='dropdown-button-drop-down'
                                            drop='down'
                                            variant="secondary"
                                            title={<AiOutlineEllipsis className="post-icons" />}
                                        >
                                            <Dropdown.Item eventKey="1" onClick={() => setPostToEdit(true)}>Edit</Dropdown.Item>
                                            <Dropdown.Item eventKey="2" onClick={deletePost}>Delete</Dropdown.Item>
                                        </DropdownButton>

                                    </div>}
                            </div>
                            <div className="media-section my-3">
                                <div className="media-container">
                                    {props.post.image &&
                                        <img
                                            onClick={(e) => { setImgSrc(e.currentTarget.src); handleShow() }}
                                            src={props.post.image} alt="Post" />}
                                    {props.post.video &&
                                        <>
                                            <video width="100%" height="240" controls>
                                                <source src={props.post.video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </>}

                                </div>
                            </div>
                            {postToEdit ?
                                <div className="d-flex flex-column">
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control className="post-textarea" value={postText} onChange={(e) => setPostText(e.target.value)} as="textarea" rows={4} />
                                    </Form.Group>
                                    <div className="ml-auto">
                                        <Button className="post-btn" onClick={editPost}>
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                                :
                                <div className="text-section">
                                    {props.post.text && props.post.text}
                                </div>
                            }
                            <div className="d-flex align-items-center justify-content-between reactions-container my-3">
                                <div className="d-flex align-items-center"><AiFillLike className="post-icons mr-2" />{likesNumber}</div>
                                <div className="comments-number" onClick={() => setCommentsShow(!commentsShow)}>{comments ? `${comments.length} Comments` : "No comments"}</div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2 p-3 action-icons">

                            {myProfile && allLikes && allLikes.some((user) => user._id === myProfile._id) ?
                                <div onClick={likeOrDislike} className="d-flex align-items-center p-2 action-btn liked">
                                    <AiFillLike className="post-icons mr-2" /> <span>Like</span>
                                </div>
                                :
                                <div onClick={likeOrDislike} className="d-flex align-items-center p-2 action-btn">
                                    <AiOutlineLike className="post-icons mr-2" /> <span>Like</span>
                                </div>
                            }

                            <div className="d-flex align-items-center p-2 action-btn" onClick={() => setCommentsShow(!commentsShow)}><AiOutlineComment className="post-icons mr-2" />Comment</div>
                            <div className="d-flex align-items-center p-2 action-btn" onClick={handleShowRepostModal}><BsArrowClockwise className="post-icons mr-2" />Repost</div>
                        </div>
                        {commentsShow && <div className="post-comments">
                            <div className="d-flex">
                                <div className="img-container">
                                    <img src={myProfile && myProfile.avatar} alt="Avatar" />
                                </div>
                                <Form className="w-100">
                                    <Form.Group>
                                        <Form.Control className="badge-pill" type="text" placeholder="Add a comment" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="all-comments">
                                {comments && comments.map((comment) => <Comment key={comment._id} comment={comment} />)}
                            </div>
                        </div>}
                    </div>
                </Col >
            </Row >
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
                    <Button className="post-btn" onClick={handleCloseRepostModal}>
                        Repost
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Post