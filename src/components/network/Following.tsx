import Cookies from "js-cookie";
import { IRequest } from "../../interfaces/IRequest"
import { useAppSelector } from "../../redux/hooks";

interface IProps {
    user: IRequest,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const Following = ({ user, reloadPage, setReloadPage }: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");


    const removeFromFollowing = async (receiverId: string) => {
        const url = `${process.env.REACT_APP_BE_URL}/users/${myProfile._id}/sendRequest`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    receiverId: receiverId,
                }),
            });

            if (response.ok) {
                setReloadPage(!reloadPage)
            }

        } catch (error) {
            console.error('Error sending connection request:', error);
        }
    };


    return (
        <>
            <div className="d-flex new-chat p-2 align-items-center my-3">
                <div className="img-container">
                    <img src={user.avatar} alt="Avatar" />
                </div>
                <div className="username">
                    {user.username}
                </div>
                <div className="remove-text ml-auto"
                    onClick={() => removeFromFollowing(user._id)}>
                    Remove
                </div>
            </div>
        </>
    )
}

export default Following