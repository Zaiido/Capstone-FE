import { useState } from "react"
import { Navbar, Container, Form, FormControl, Button, Nav, NavDropdown } from "react-bootstrap"
import { AiOutlineSearch } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { CLEAR_ACTIVE_CHAT, CLEAR_ALL_CHATS, CLEAR_ALL_POSTS, CLEAR_ALL_PROFILES, CLEAR_FOLLOWERS, CLEAR_FOLLOWING, CLEAR_GARDEN, CLEAR_LIVE_CHAT, CLEAR_MY_PROFILE, CLEAR_RECEIVED_REQUESTS, CLEAR_SENT_REQUESTS } from "../../redux/actions"

const TheNavbar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()

    const myProfile = useAppSelector(state => state.myProfile.results)

    const logOut = () => {
        localStorage.removeItem("accessToken")
        Cookies.remove("accessToken")
        dispatch({ type: CLEAR_MY_PROFILE })
        dispatch({ type: CLEAR_ALL_PROFILES })
        dispatch({ type: CLEAR_RECEIVED_REQUESTS })
        dispatch({ type: CLEAR_SENT_REQUESTS })
        dispatch({ type: CLEAR_FOLLOWING })
        dispatch({ type: CLEAR_ALL_POSTS })
        dispatch({ type: CLEAR_FOLLOWERS })
        dispatch({ type: CLEAR_ALL_CHATS })
        dispatch({ type: CLEAR_ACTIVE_CHAT })
        dispatch({ type: CLEAR_LIVE_CHAT })
        dispatch({ type: CLEAR_GARDEN })
        navigate("/login")
    }

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#">
                    <div className="profile d-flex align-items-center text-white">
                        <div className="img-container mr-2">
                            <img src={myProfile && myProfile.avatar} alt="Profile" />
                        </div>
                        <NavDropdown className="username" title={myProfile && `Hi, ${myProfile.username}`} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto mr-2">
                        <Nav.Link className={location.pathname === "/feed" ? "active" : ""} href="/feed">Home</Nav.Link>
                        <Nav.Link className={location.pathname === "/network" ? "active" : ""} href="/network">Network</Nav.Link>
                        <Nav.Link className={location.pathname === "/messages" ? "active" : ""} href="/messages">Messages</Nav.Link>
                        <Nav.Link className={location.pathname === "/garden" ? "active" : ""} href="/garden">Garden</Nav.Link>

                    </Nav>
                    <Form inline>
                        {showSearchBar && <FormControl
                            value={query}
                            onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" className="mr-sm-2 search-bar" />}
                        <Button className="search-btn"
                            onClick={() => {
                                if (showSearchBar) {
                                    console.log("Search")
                                } else {
                                    setShowSearchBar(true)
                                }
                            }}><AiOutlineSearch /></Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TheNavbar