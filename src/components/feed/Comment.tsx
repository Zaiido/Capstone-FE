import { Dropdown, DropdownButton } from 'react-bootstrap'
import { AiOutlineEllipsis, AiOutlineLike } from 'react-icons/ai'
import { IComment } from '../../interfaces/IComment'
import { useAppSelector } from '../../redux/hooks'

interface IProps {
    comment: IComment
}
const Comment = ({ comment }: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)

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
                            className="post-actions-btn ml-auto"
                            key='down'
                            id='dropdown-button-drop-down'
                            drop='down'
                            variant="secondary"
                            title={<AiOutlineEllipsis className="post-icons" />}
                        >
                            <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
                        </DropdownButton>}
                </div>
                <div>{comment.comment}</div>
                <div className='mt-2 d-flex align-items-center'>
                    <AiOutlineLike className='post-icons comment-icons mr-2' /> 0
                </div>
            </div>
        </div>
    )
}

export default Comment