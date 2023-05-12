import Cookies from "js-cookie"
import { IChat } from "../../interfaces/IChat"
import { IRequest } from "../../interfaces/IRequest"
import { fetchActiveChatAction } from "../../redux/actions"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

interface IProps {
    chat: IChat,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const Chat = ({ chat, reloadPage, setReloadPage }: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const dispatch = useAppDispatch()
    const activeChat = useAppSelector(state => state.activeChat.results)
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const getActiveChat = async () => {
        await dispatch(fetchActiveChatAction(chat._id, accessToken as string))
        setReloadPage(!reloadPage)
    }


    return (
        <>
            <div className={chat._id === activeChat._id ? "d-flex align-items-center my-1 p-2 new-chat active-chat" : "d-flex align-items-center my-1 p-2 new-chat"} onClick={getActiveChat}>
                <div className="img-container">
                    {chat.name && myProfile ?
                        <img src="https://img.freepik.com/free-vector/five-kawaii-plants-icons_603843-3355.jpg?w=740&t=st=1683624462~exp=1683625062~hmac=8f5204e666516c7f33a1d407dba56b99521a5f384173a1a6a11efd36a7b60f11" alt="Group Avatar" />
                        : <img src={chat.members.find((user: IRequest) => user._id !== myProfile._id)?.avatar || ''} alt="Avatar" />}
                </div>
                <div className="username">
                    {chat.name && myProfile ? chat.name : chat.members.find((user: IRequest) => user._id !== myProfile._id)?.username || ''}
                </div>
                {/* <div className="online-dot ml-auto">
                </div> */}
            </div>
        </>
    )
}

export default Chat
