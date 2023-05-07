/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Container, Row } from "react-bootstrap"
import TheNavbar from "../navbar/TheNavbar"
import '../../css/network.css'
import Following from "./Following"
import Follower from "./Follower"
import Request from "../feed/Request"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { IRequest } from "../../interfaces/IRequest"
import Cookies from "js-cookie"
import { fetchAllProfilesAction, fetchFollowersAction, fetchFollowingAction, fetchMyProfileAction, fetchReceivedRequestsAction } from "../../redux/actions"
import { IUser } from "../../interfaces/IUser"
import Suggestion from "../feed/Suggestion"

const Network = () => {
    const myProfile = useAppSelector(state => state.myProfile.results)
    const receivedRequests = useAppSelector(state => state.receivedRequests.results)
    const allProfiles = useAppSelector(state => state.allProfiles.results)
    const following = useAppSelector(state => state.following.results)
    const followers = useAppSelector(state => state.followers.results)

    const [reloadPage, setReloadPage] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {

        const tokenCookie = Cookies.get("accessToken");
        if (tokenCookie) {
            dispatch(fetchMyProfileAction(tokenCookie));
            dispatch(fetchAllProfilesAction(tokenCookie));
        } else {
            const accessToken = localStorage.getItem("accessToken");
            dispatch(fetchMyProfileAction(accessToken as string));
            dispatch(fetchAllProfilesAction(accessToken as string));
        }
    }, [reloadPage]);

    useEffect(() => {
        if (myProfile && !Array.isArray(myProfile)) {
            const tokenCookie = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchReceivedRequestsAction(myProfile._id, tokenCookie as string));
            dispatch(fetchFollowingAction(myProfile._id, tokenCookie as string));
            dispatch(fetchFollowersAction(myProfile._id, tokenCookie as string));
        }

    }, [myProfile, reloadPage]);

    return (
        <div className="feed-body">
            <TheNavbar />
            <Container className="my-4">
                <Row>
                    <Col className="col-12 col-md-6">
                        <Row>
                            <Col className="col-12">
                                <div className="section-container mb-3 p-4">
                                    <div>
                                        <span className="mr-3">People you follow</span>
                                        <span className="network-number">{following && following.length}</span>
                                    </div>
                                    <div className="network-container">
                                        {following && following.map((user: IRequest) => <Following key={user._id} reloadPage={reloadPage} setReloadPage={setReloadPage} user={user} />)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12">
                                <div className="section-container mb-3 p-4">
                                    <div>
                                        <span className="mr-3">People that follow you</span>
                                        <span className="network-number">{followers && followers.length}</span>
                                    </div>
                                    <div className="network-container">
                                        {followers && followers.map((user: IRequest) => <Follower key={user._id} user={user} reloadPage={reloadPage} setReloadPage={setReloadPage} />)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <Row>
                            <Col className="col-12">
                                <div className="section-container mb-3 p-4">
                                    <div>
                                        <span className="mr-3">Follow Requests</span>
                                        <span className="network-number">{receivedRequests && receivedRequests.length}</span>
                                    </div>
                                    <div className="network-container">
                                        {receivedRequests && receivedRequests.map((user: IRequest, i: number) => <Request user={user} key={i} setReloadPage={setReloadPage} reloadPage={reloadPage} />)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12">
                                <div className="section-container mb-3 p-4">
                                    <div>
                                        <span className="mr-3">Suggestions</span>
                                    </div>
                                    <div className="network-container">
                                        {allProfiles && myProfile && following && allProfiles.filter((profile: IUser) => profile._id !== myProfile._id && !following.some((user: IRequest) => user._id === profile._id)).slice(0, 4).map((profile: IUser) => <Suggestion key={profile._id} profile={profile} reloadPage={reloadPage} setReloadPage={setReloadPage} />)}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Network