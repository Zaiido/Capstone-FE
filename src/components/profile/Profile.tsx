/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import TheNavbar from "../navbar/TheNavbar"
import '../../css/profile.css'
import { BiLeaf } from 'react-icons/bi'
import { BsVectorPen } from 'react-icons/bs'
import { FcLowBattery, FcMiddleBattery, FcHighBattery, FcFullBattery } from 'react-icons/fc'
import { AiFillTrophy, AiOutlineUpload } from 'react-icons/ai'
import { useEffect, useRef, useState } from "react"
import SingleProfilePost from "./SingleProfilePost"
import Cookies from "js-cookie"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { IPost } from "../../interfaces/IPost"
import { fetchGardenAction, fetchMyProfileAction } from "../../redux/actions"

const Profile = () => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const myGarden = useAppSelector(state => state.garden.results)
    const allPosts = useAppSelector(state => state.allPosts.results)
    const dispatch = useAppDispatch()

    const [edit, setEdit] = useState(false)
    const [username, setUsername] = useState(myProfile?.username)
    const [bio, setBio] = useState(myProfile?.bio)
    const [reloadPage, setReloadPage] = useState(false)
    const [deadPlantsNumber, setDeadPlantsNumber] = useState("")
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = "image/*";
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        } else {
            setFile(null);
        }
    };

    const getDeadPlantsNumber = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/garden/deadPlants/${myProfile._id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
            if (response.ok) {
                let { deadPlants } = await response.json()
                setDeadPlantsNumber(deadPlants)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editProfileImage = async () => {
        try {
            const formData = new FormData();
            if (file) {
                formData.append("avatar", file)
            }
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me/avatar`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
            if (response.ok) {
                setReloadPage(!reloadPage)
                setFile(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const editProfileInfo = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`,
                {
                    method: "PUT",
                    body: JSON.stringify({ username, bio }),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
                if (file) {
                    await editProfileImage()
                }
                setReloadPage(!reloadPage)
                setEdit(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
        dispatch(fetchMyProfileAction(accessToken as string))
    }
        , [reloadPage]);

    useEffect(() => {
        if (myProfile && !Array.isArray(myProfile)) {
            const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchGardenAction(myProfile._id, accessToken as string));
            getDeadPlantsNumber()
        }
    }, [myProfile, reloadPage]);

    return (
        <>
            <div className="feed-body">
                <TheNavbar />
                <Container className="my-4">
                    <Row>
                        <Col className="col-12">
                            <div className="section-container mb-3 p-4">
                                <Row>
                                    <Col className="col-12 col-md-3 profile-img-col">
                                        <div className="profile-img-container">
                                            <img src={myProfile?.avatar} alt="User Avatar" />
                                            {edit && <div className="edit-icon-container">
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    ref={fileInputRef}
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileUpload}
                                                />
                                                <AiOutlineUpload className="post-icons garden-icons" onClick={handleIconClick} />
                                            </div>}
                                        </div>
                                    </Col>
                                    <Col className="col-12 col-md-6 d-flex flex-column">
                                        <div className="d-flex flex-column my-1 profile-details">
                                            {edit ?
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control className="post-textarea" value={username} onChange={(e) => setUsername(e.target.value)} as="textarea" rows={1} />
                                                </Form.Group>

                                                :
                                                <div className="profile-username my-2">{myProfile?.username}</div>}
                                            {edit ?
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Control className="post-textarea" value={bio} onChange={(e) => setBio(e.target.value)} as="textarea" placeholder={bio ? bio : "Bio"} rows={2} />
                                                </Form.Group>
                                                : <div className="profile-bio">{myProfile?.bio}</div>}
                                            {file && <div className="ml-2" style={{ fontSize: "13px" }}>{file.name}</div>}

                                            <div className="plant-number mt-md-auto mt-3 d-flex">
                                                <div className="d-flex align-items-center justify-content-center"> <BiLeaf className="mr-2 post-icons garden-icons" /> <span>{myGarden?.length}</span></div>
                                                <div className="d-flex align-items-center justify-content-center"> <BsVectorPen className="mr-2 ml-3 post-icons garden-icons" /> <span>{allPosts?.filter((post: IPost) => post.user._id === myProfile?._id).length}</span></div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-12 col-md-3 d-flex flex-column">
                                        <div className="d-flex flex-column justify-content-center my-1 profile-details">
                                            {myGarden?.length <= 10 && <div className="d-flex align-items-center my-2"><FcLowBattery className="level" /> Beginner Gardener</div>}
                                            {myGarden?.length > 10 && myGarden?.length <= 50 && <div className="d-flex align-items-center"><FcMiddleBattery className="level" /> Intermediate Gardener</div>}
                                            {myGarden?.length > 50 && myGarden?.length <= 100 && <div className="d-flex align-items-center"><FcHighBattery className="level" /> Advanced Gardener</div>}
                                            {myGarden?.length > 100 && <div className="d-flex align-items-center"><FcFullBattery className="level-expert" /> Expert Gardener</div>}
                                            {deadPlantsNumber < myGarden?.length && <div className="d-flex align-items-center my-2"><AiFillTrophy className="trophy" /> Plantastic Gardener</div>}
                                            {!edit && <Button className="post-btn mt-auto" onClick={() => setEdit(true)}>Edit Profile</Button>}
                                            {edit && <Button className="post-btn mt-auto edit-btn" onClick={() => { editProfileInfo() }}>Save</Button>}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row className="profile-posts mx-0">
                        {allPosts?.filter((post: IPost) => post.user._id === myProfile?._id).reverse().map((post: IPost) => <SingleProfilePost key={post._id} post={post} />)}
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Profile