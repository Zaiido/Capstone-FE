import { Col } from "react-bootstrap"
import { AiFillPlusCircle } from "react-icons/ai"
import { useAppSelector } from "../../redux/hooks";
import Cookies from "js-cookie";

interface IProps {
    result: any,
    imageUrl: string,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const SingleMatch = ({ result, imageUrl, reloadPage, setReloadPage }: IProps) => {
    const randomIndex = Math.floor(Math.random() * result.images.length);
    const myProfile = useAppSelector(state => state.myProfile.results)
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const addToGarden = async (name: string) => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/garden`,
                {
                    method: "POST",
                    body: JSON.stringify({ name, image: imageUrl, "owner": myProfile._id }),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
                setReloadPage(!reloadPage)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col className="col-12 col-md-6 my-2">
            <div className="d-flex align-items-center p-1 plant-details-2">
                <div className="plant-img-container mr-1">
                    <img src={result.images[randomIndex].url.s} alt="Plant" />
                </div>
                <div className="d-flex flex-column">
                    <div>{result.species.scientificNameWithoutAuthor}</div>
                    <div style={{ fontSize: "13px" }}>Score: {result.score}</div>
                </div>
                <AiFillPlusCircle className="ml-auto mr-2 post-icons" onClick={() => addToGarden(result.species.scientificNameWithoutAuthor)} />
            </div>
        </Col>
    )
}

export default SingleMatch