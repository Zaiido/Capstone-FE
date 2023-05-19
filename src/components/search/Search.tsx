/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Row, Col, Button } from "react-bootstrap"
import { AiFillTrophy } from "react-icons/ai"
import { FcLowBattery, FcMiddleBattery, FcHighBattery, FcFullBattery } from "react-icons/fc"
import { BsHourglassSplit } from 'react-icons/bs'
import { BiLeaf } from "react-icons/bi"
import { BsVectorPen } from "react-icons/bs"
import { IPost } from "../../interfaces/IPost"
import TheNavbar from "../navbar/TheNavbar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { IUser } from "../../interfaces/IUser"
import Cookies from "js-cookie"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchFollowingAction, fetchSentRequestsAction } from "../../redux/actions"
import { IRequest } from "../../interfaces/IRequest"
import SingleProfilePost from "../profile/SingleProfilePost"
import UserGarden from "./UserGarden"

const Search = () => {
    const params = useParams()
    const dispatch = useAppDispatch()

    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const following = useAppSelector(state => state.following.results)
    const sentRequests = useAppSelector(state => state.sentRequests.results)
    const myProfile = useAppSelector(state => state.myProfile.results)
    const allPosts = useAppSelector(state => state.allPosts.results)



    const [profile, setProfile] = useState<IUser>()
    const [garden, setGarden] = useState<any[]>([])
    const [deadPlantsNumber, setDeadPlantsNumber] = useState(0)
    const [reloadPage, setReloadPage] = useState(false)
    const [showPosts, setShowPosts] = useState(true)
    const [showGarden, setShowGarden] = useState(false)


    const getProfile = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/users/${params.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                })
            if (response.ok) {
                let user = await response.json()
                setProfile(user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const followUnfollow = async () => {
        console.log(profile?._id)
        const url = `${process.env.REACT_APP_BE_URL}/users/${myProfile._id}/sendRequest`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    receiverId: profile?._id,
                }),
            });

            if (response.ok) {
                setReloadPage(!reloadPage)
            }

        } catch (error) {
            console.error('Error sending connection request:', error);
        }
    };


    const getGarden = async () => {
        try {
            let response = await fetch(
                `${process.env.REACT_APP_BE_URL}/garden/${profile?._id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            );
            if (response.ok) {
                let userGarden = await response.json();
                setGarden(userGarden)
            } else {
                console.log("Error");
            }
        } catch (error) {
            console.log(error);

        };
    }

    const getDeadPlantsNumber = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/garden/deadPlants/${profile?._id}`,
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

    useEffect(() => {
        getProfile()
        if (myProfile && !Array.isArray(myProfile)) {
            const tokenCookie = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchFollowingAction(myProfile._id, tokenCookie as string));
            dispatch(fetchSentRequestsAction(myProfile._id, tokenCookie as string))
        }

    }, [params.id, reloadPage])


    useEffect(() => {
        if (profile) {
            getGarden()
            getDeadPlantsNumber()
        }

    }, [profile])


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
                                            <img src={profile && profile.avatar} alt="User Avatar" />
                                        </div>
                                    </Col>
                                    <Col className="col-12 col-md-6 d-flex flex-column">
                                        <div className="d-flex flex-column my-1 profile-details">

                                            <div className="profile-username my-2">{profile && profile.username}</div>

                                            <div className="profile-bio">{profile && profile.bio}</div>

                                            <div className="plant-number mt-md-auto mt-3 d-flex">
                                                <div className="d-flex align-items-center justify-content-center"> <BiLeaf className="mr-2 post-icons garden-icons" /> <span>{garden?.length}</span></div>
                                                <div className="d-flex align-items-center justify-content-center"> <BsVectorPen className="mr-2 ml-3 post-icons garden-icons" /> <span>{allPosts?.filter((post: IPost) => post.user._id === profile?._id).length}</span></div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-12 col-md-3 d-flex flex-column">
                                        <div className="d-flex flex-column justify-content-center my-1 profile-details">
                                            {garden?.length > 0 && garden?.length <= 10 && <div className="d-flex align-items-center my-2"><FcLowBattery className="level" /> Beginner Gardener</div>}
                                            {garden?.length > 10 && garden?.length <= 50 && <div className="d-flex align-items-center"><FcMiddleBattery className="level" /> Intermediate Gardener</div>}
                                            {garden?.length > 50 && garden?.length <= 100 && <div className="d-flex align-items-center"><FcHighBattery className="level" /> Advanced Gardener</div>}
                                            {garden?.length > 100 && <div className="d-flex align-items-center"><FcFullBattery className="level-expert" /> Expert Gardener</div>}
                                            {deadPlantsNumber < garden?.length && <div className="d-flex align-items-center my-2"><AiFillTrophy className="trophy" /> Plantastic Gardener</div>}
                                            {following && following.some((user: IUser) => user._id === profile?._id) ?
                                                <Button className="post-btn unfollow-btn mt-auto" onClick={followUnfollow}>Unfollow</Button> :
                                                sentRequests?.some((user: IRequest) => user._id === profile?._id) ?
                                                    <Button className="post-btn pending-btn mt-auto d-flex align-items-center justify-content-center" onClick={followUnfollow}> <BsHourglassSplit className="mr-1" /> Pending</Button> :
                                                    <Button className="post-btn mt-auto" onClick={followUnfollow}>Follow</Button>}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    {following && following.some((user: IUser) => user._id === profile?._id) &&
                        <>
                            <Row className="profile-posts">
                                <Col className="col-12 col-md-6 text-center text-md-right" onClick={() => { setShowPosts(true); setShowGarden(false) }}><span className={showPosts ? "bottom-border" : ""}>Posts</span></Col>
                                <Col className="col-12 col-md-6 text-center text-md-left" onClick={() => { setShowPosts(false); setShowGarden(true) }}><span className={showGarden ? "bottom-border" : ""}>Garden</span></Col>
                            </Row>
                            {showPosts && <Row className="mx-0 mt-5">
                                {allPosts?.filter((post: IPost) => post.user._id === profile?._id).reverse().map((post: IPost) => <SingleProfilePost key={post._id} post={post} otherProfile={true} />)}
                            </Row>}
                            {showGarden && <Row className="mx-0 mt-5">
                                {garden && garden.map((plant: any, i: number) => <UserGarden key={i} plant={plant} />)}
                            </Row>}
                        </>}
                </Container>
            </div>
        </>)
}

export default Search