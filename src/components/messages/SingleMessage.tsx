import { IMessage } from "../../interfaces/IMessage"
import { useAppSelector } from "../../redux/hooks"

interface IProps {
    message: IMessage,
    historyChat: boolean
}

const SingleMessage = ({ message, historyChat }: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    return (
        <>
            {historyChat ?
                myProfile && message?.sender._id !== myProfile._id ?
                    <div className="d-flex mt-2">
                        <div className="img-container">
                            <img src={`https://ui-avatars.com/api/?name=${message.sender.username}`} alt="User Avatar" />
                        </div>
                        <div className="single-message-container d-flex flex-column p-2 align-self-end">
                            <span className="single-message-username"></span>
                            <span>{message?.text}</span>
                            <div className="time ml-auto">{message?.createdAt}</div>
                        </div>
                    </div> :
                    <div className="d-flex ml-auto mt-2">
                        <div className="single-message-container d-flex flex-column p-2 align-self-end">
                            <span>{message?.text}</span>
                            <div className="time ml-auto">{message?.createdAt}</div>
                        </div>
                    </div>
                :
                <>
                    {myProfile && message?.sender && message.sender._id && message.sender._id !== myProfile._id &&
                        <div className="d-flex mt-2">
                            <div className="img-container">
                                <img src={message?.sender?.username && `https://ui-avatars.com/api/?name=${message.sender.username}`} alt="User Avatar" />
                            </div>
                            <div className="single-message-container d-flex flex-column p-2 align-self-end">
                                <span className="single-message-username"></span>
                                <span>{message?.text}</span>
                                <div className="time ml-auto">{message?.createdAt}</div>
                            </div>
                        </div>}
                    {myProfile && message?.sender && message.sender === myProfile._id &&
                        <div className="d-flex ml-auto mt-2">
                            <div className="single-message-container d-flex flex-column p-2 align-self-end">
                                <span>{message?.text}</span>
                                <div className="time ml-auto">{message?.createdAt}</div>
                            </div>
                        </div>}
                </>}
        </>
    )
}

export default SingleMessage