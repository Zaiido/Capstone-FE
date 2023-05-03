import { AiOutlineLike } from 'react-icons/ai'

const Comment = () => {
    return (
        <div className="py-3 d-flex">
            <div className="post-comments">
                <div className="img-container">
                    <img src="./assets/feed/cactus-avatar.jpg" alt="Avatar" />
                </div>
            </div>
            <div className="user-comment">
                <div className="username">Username</div>
                <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At eius sint accusamus esse dolorum, voluptas culpa. Dolorem nemo minima similique, velit explicabo ipsam quia aliquid eveniet, temporibus commodi nisi repellat?</div>
                <div className='mt-1 d-flex align-items-center'>
                    <AiOutlineLike className='post-icons comment-icons mr-2' /> 0
                </div>
            </div>
        </div>
    )
}

export default Comment