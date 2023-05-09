import { IRequest } from "../../interfaces/IRequest"

interface IProps {
    user: IRequest,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const NewChat = ({ user, reloadPage, setReloadPage }: IProps) => {

    return (
        <>
            <div className="d-flex align-items-center my-1 p-2 new-chat">
                <div className="img-container">
                    <img src={user.avatar} alt="Avatar" />
                </div>
                <div className="username">
                    {user.username}
                </div>

            </div>
        </>
    )
}

export default NewChat
