/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown, DropdownButton, Form } from 'react-bootstrap'
import { AiFillLike, AiOutlineEllipsis, AiOutlineLike } from 'react-icons/ai'
import { IComment } from '../../interfaces/IComment'
import { useAppSelector } from '../../redux/hooks'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { IRequest } from '../../interfaces/IRequest'

interface IProps {
    comment: IComment,
    postId: string,
    reload: Boolean,
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const Comment = ({ comment, postId, setReload, reload }: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const [commentToEdit, setCommentToEdit] = useState(comment.comment)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [commentLikes, setCommentLikes] = useState<IRequest[]>([])
    const [reloadPage, setReloadPage] = useState(false)


    const deleteComment = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}/comments/${comment._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    }
                }
            );
            if (response.ok) {
                setReload(!reload)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const editComment = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}/comments/${comment._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({ comment: commentToEdit }),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.ok) {
                setToggleEdit(false)
                setReload(!reload)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getLikes = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}/comments/${comment._id}/likes`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    }
                }
            );
            if (response.ok) {
                let likes = await response.json()
                setCommentLikes(likes)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const likeorDislikeComment = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts/${postId}/comments/${comment._id}/like`,
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
                setReloadPage(!reloadPage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLikes()
    }, [reloadPage])

    return (
        <div className="py-3 d-flex">
            <div className="post-comments">
                <div className="img-container">
                    <img src={comment.user.avatar} alt="User Avatar" />
                </div>
            </div>
            <div className="user-comment w-100">
                <div className='d-flex align-items-center'>
                    <div className="username">{comment.user.username}</div>
                    {myProfile && comment.user._id === myProfile._id &&
                        <DropdownButton
                            className="post-actions-btn ml-auto actions"
                            key='down'
                            id='dropdown-button-drop-down'
                            drop='down'
                            variant="secondary"
                            title={<AiOutlineEllipsis className="post-icons" />}
                        >
                            <Dropdown.Item eventKey="1" onClick={() => setToggleEdit(true)}>Edit</Dropdown.Item>
                            <Dropdown.Item eventKey="2" onClick={deleteComment}>Delete</Dropdown.Item>
                        </DropdownButton>}
                </div>
                {toggleEdit ? <Form className="w-100" onSubmit={(e) => {
                    e.preventDefault()
                    editComment()
                }}>
                    <Form.Group>
                        <Form.Control value={commentToEdit} onChange={(e) => setCommentToEdit(e.target.value)} className="badge-pill" type="text" />
                    </Form.Group>
                </Form> :
                    <div>{comment.comment}</div>}
                <div className='mt-2 d-flex align-items-center'>
                    {myProfile && commentLikes && commentLikes.some((user) => user._id === myProfile._id) ?
                        <div className='liked p-1 d-flex align-items-center' onClick={likeorDislikeComment} >
                            <AiFillLike className='post-icons comment-icons mr-2' />
                            {commentLikes && commentLikes.length}
                        </div> :
                        <div className='d-flex align-items-center p-1 like-comment' onClick={likeorDislikeComment}>
                            <AiOutlineLike className='post-icons comment-icons mr-2' />
                            {commentLikes && commentLikes.length}
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Comment