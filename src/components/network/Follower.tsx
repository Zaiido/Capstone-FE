import Cookies from "js-cookie";
import { IRequest } from "../../interfaces/IRequest"
import { useAppSelector } from "../../redux/hooks";

interface IProps {
    user: IRequest,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const Follower = ({ user, reloadPage, setReloadPage }: IProps) => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const removerFollower = async () => {
        const url = `${process.env.REACT_APP_BE_URL}/users/${myProfile._id}/removeFollower`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    followerId: user._id,
                }),
            });

            if (response.ok) {
                setReloadPage(!reloadPage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="d-flex align-items-center new-chat p-2 my-3">
                <div className="img-container">
                    <img src={user.avatar} alt="Avatar" />
                </div>
                <div className="username">
                    {user.username}
                </div>
                <div className="remove-text ml-auto"
                    onClick={removerFollower}>
                    Remove
                </div>
            </div>
        </>
    )
}

export default Follower