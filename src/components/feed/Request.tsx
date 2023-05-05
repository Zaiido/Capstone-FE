import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { IRequest } from '../../interfaces/IRequest'
import Cookies from 'js-cookie'
import { useAppSelector } from '../../redux/hooks'

interface IProps {
    user: IRequest,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const Request = (props: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const tokenCookie = Cookies.get("accessToken");

    const ignoreRequest = async (id: string) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users/${myProfile._id}/manageRequest`,
                {
                    method: "POST",
                    body: JSON.stringify({ senderId: id }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenCookie ? tokenCookie : localStorage.getItem("accessToken")}`

                    },
                }
            );
            if (response.ok) {
                props.setReloadPage(!props.reloadPage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const acceptRequest = async (id: string) => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/users/${myProfile._id}/manageRequest`,
                {
                    method: "POST",
                    body: JSON.stringify({ senderId: id, action: "Accept" }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${tokenCookie ? tokenCookie : localStorage.getItem("accessToken")}`
                    },
                }
            );
            if (response.ok) {
                props.setReloadPage(!props.reloadPage);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="d-flex align-items-center my-2">
            <div className="img-container">
                <img src={props.user.avatar} alt="Avatar" />
            </div>
            <div className="username">
                {props.user.username}
            </div>
            <div className="follow-text ml-auto">
                <AiOutlineCheck className='request-icons mr-3' onClick={() => acceptRequest(props.user._id)} />
                <AiOutlineClose className='request-icons ignore-icon' onClick={() => ignoreRequest(props.user._id)} />
            </div>
        </div>
    )
}

export default Request