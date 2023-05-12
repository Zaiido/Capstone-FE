import { IMessage } from "../../interfaces/IMessage"
import { useAppSelector } from "../../redux/hooks"

interface IProps {
    message: IMessage,
    // reloadPage: boolean,
    // setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const SingleMessage = ({ message }: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    return (
        <>
            {myProfile && message.sender._id !== myProfile._id ?
                <div className="d-flex">
                    <div className="img-container">
                        <img src={message.sender.avatar} alt="User Avatar" />
                    </div>
                    <div className="single-message-container d-flex flex-column p-2 align-self-end">
                        <span className="single-message-username"></span>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. tenetur commodi fugit! Magnam!</span>
                        <div className="time ml-auto">20:56</div>
                    </div>
                </div> :
                <div className="d-flex ml-auto mt-2">
                    <div className="single-message-container d-flex flex-column p-2 align-self-end">
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. tenetur commodi fugit! Magnam!</span>
                        <div className="time ml-auto">20:57</div>
                    </div>
                </div>}
        </>
    )
}

export default SingleMessage