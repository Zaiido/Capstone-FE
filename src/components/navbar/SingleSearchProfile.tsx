import { useNavigate } from "react-router-dom"
import { IUser } from "../../interfaces/IUser"
import { useAppSelector } from "../../redux/hooks"

interface IProps {
    user: IUser,
    showDropdown: React.Dispatch<React.SetStateAction<boolean>>,
    showSearch: React.Dispatch<React.SetStateAction<boolean>>,
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SingleSearchProfile = ({ user, showDropdown, showSearch, setQuery }: IProps) => {
    const navigate = useNavigate()
    const myProfile = useAppSelector(state => state.myProfile.results)

    return (

        <div onClick={() => { navigate(user._id === myProfile?._id ? "/profile" : `/profile/${user._id}`); showDropdown(false); showSearch(false); setQuery("") }} className="d-flex new-chat single-search-user p-2 px-4 align-items-center my-2">
            <div className="img-container">
                <img src={user.avatar} alt="Avatar" />
            </div>
            <div className="username truncate">
                {user.username}
            </div>
        </div>

    )
}

export default SingleSearchProfile