import Cookies from "js-cookie"
import { IRequest } from "../../interfaces/IRequest"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchActiveChatAction } from "../../redux/actions"

interface IProps {
    user: IRequest,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const NewChat = ({ user, reloadPage, setReloadPage }: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const dispatch = useAppDispatch()
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");


    const startNewChat = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/chats`,
                {
                    method: "POST",
                    body: JSON.stringify({ group: [myProfile._id, user._id] }),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
                let chat = await response.json()
                await dispatch(fetchActiveChatAction(chat._id, accessToken as string))
                setReloadPage(!reloadPage)
            } else {
                console.log("Error creating a new chat")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="d-flex align-items-center my-1 p-2 new-chat" onClick={startNewChat}>
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
