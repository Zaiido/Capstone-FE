import { useState } from "react"
import { Navbar, Container, Form, FormControl, Button, Nav, NavDropdown } from "react-bootstrap"
import { AiOutlineSearch } from 'react-icons/ai'

const TheNavbar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [query, setQuery] = useState("")
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#">
                    <div className="profile d-flex align-items-center text-white">
                        <div className="img-container mr-2">
                            <img src="https://img.freepik.com/free-vector/cute-cactus-concept-illustration_114360-9318.jpg?w=740&t=st=1682855386~exp=1682855986~hmac=8dccfd2fc82e437805dc87a7faf832f7ca0e90ad56983c0cd88502df2db176b6" alt="Profile" />
                        </div>
                        <NavDropdown className="username" title="Hi, Username" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto mr-2">
                        <Nav.Link href="#home">Home</Nav.Link>
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