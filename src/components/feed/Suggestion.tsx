import { IUser } from "../../interfaces/IUser"
import { useAppSelector } from "../../redux/hooks"
import Cookies from "js-cookie"

interface IProps {
    profile: IUser,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}
const Suggestion = (props: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const tokenCookie = Cookies.get("accessToken");


    const sendFollowRequest = async (receiverId: string) => {
        const url = `${process.env.REACT_APP_BE_URL}/users/${myProfile._id}/sendRequest`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${tokenCookie ? tokenCookie : localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    receiverId: receiverId,
                }),
            });

            if (response.ok) {
                props.setReloadPage(!props.reloadPage)
            }

        } catch (error) {
            console.error('Error sending connection request:', error);
        }
    };

    return (
        <div className="d-flex new-chat p-2 align-items-center my-2">
            <div className="img-container">
                <img src={props.profile.avatar} alt="Avatar" />
            </div>
            <div className="username">
                {props.profile.username}
            </div>
            <div className="follow-text ml-auto" onClick={() => sendFollowRequest(props.profile._id)}>
                {myProfile?.sentRequests?.pending.includes(props.profile._id) ?
                    "Cancel" : "Follow"}
            </div>
        </div>
    )
}

export default Suggestion