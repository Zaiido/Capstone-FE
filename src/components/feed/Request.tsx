import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

const Request = () => {
    return (
        <div className="d-flex align-items-center my-2">
            <div className="img-container">
                <img src="./assets/feed/cactus-avatar.jpg" alt="Avatar" />
            </div>
            <div className="username">
                Username
            </div>
            <div className="follow-text ml-auto">
                <AiOutlineCheck className='request-icons mr-3' />
                <AiOutlineClose className='request-icons ignore-icon' />
            </div>
        </div>
    )
}

export default Request