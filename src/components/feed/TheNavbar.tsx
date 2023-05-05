import { useState } from "react"
import { Navbar, Container, Form, FormControl, Button, Nav, NavDropdown } from "react-bootstrap"
import { AiOutlineSearch } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { CLEAR_ALL_PROFILES, CLEAR_FOLLOWING, CLEAR_MY_PROFILE, CLEAR_RECEIVED_REQUESTS, CLEAR_SENT_REQUESTS } from "../../redux/actions"

const TheNavbar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const myProfile = useAppSelector(state => state.myProfile.results)

    const logOut = () => {
        localStorage.removeItem("accessToken")
        Cookies.remove("accessToken")
        dispatch({ type: CLEAR_MY_PROFILE })
        dispatch({ type: CLEAR_ALL_PROFILES })
        dispatch({ type: CLEAR_RECEIVED_REQUESTS })
        dispatch({ type: CLEAR_SENT_REQUESTS })
        dispatch({ type: CLEAR_FOLLOWING })
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
                        <Nav.Link href="/feed">Home</Nav.Link>
                        <Nav.Link href="#network">Network</Nav.Link>
                        <Nav.Link href="#messages">Messages</Nav.Link>
                        <Nav.Link href="#garden">Garden</Nav.Link>

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