import { Row, Col, Form, Button, Container, InputGroup, FormControl } from "react-bootstrap"
import "../../css/login.css"
import { FaUserCircle, FaKey, FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
    const [isFBHovered, setIsFBHovered] = useState(false)
    const [isGoogleHovered, setIsGoogleHovered] = useState(false)

    return (
        <div className="login-section d-flex justify-content-center align-items-center">
            <Row className="login-container">
                <Col className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <Container className="mt-md-5 mx-md-5 px-md-5 d-flex flex-column">
                        <Form className="mt-5 mb-2 mt-md-0 mb-md-4 d-flex flex-column align-items-center">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text> <FaUserCircle /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Email"
                                    aria-describedby="basic-addon1"
                                    className="remove-box-shadow"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text> <FaKey /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Password"
                                    aria-describedby="basic-addon1"
                                    className="remove-box-shadow"
                                />
                            </InputGroup>
                            <Button className="align-self-end login-btn" variant="primary" type="submit">
                                LOGIN
                            </Button>
                            <Link className="align-self-start register-link" to={"/register"}>Register now</Link>
                        </Form>
                        <div className="d-flex align-items-center mt-1 mb-4">
                            <hr className="line" /> <span>or</span>  <hr className="line" />
                        </div>
                        <div className="oauth-btns mb-4">
                            <Link to={"/"}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text
                                            className="fb-icon-container"
                                            onMouseOver={() => setIsFBHovered(true)}
                                            onMouseOut={() => setIsFBHovered(false)}
                                        > <FaFacebookSquare /> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        className={isFBHovered ? "fb-btn text-center hover-fb" : "fb-btn text-center"}
                                        value={"LOGIN WITH FACEBOOK"}
                                    />
                                </InputGroup>
                            </Link>
                            <Link to={"/"}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text
                                            className="google-icon-container"
                                            onMouseOver={() => setIsGoogleHovered(true)}
                                            onMouseOut={() => setIsGoogleHovered(false)}> <FaGoogle /> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        className={isGoogleHovered ? "google-btn text-center hover-google" : "google-btn text-center"}
                                        value={"LOGIN WITH GOOGLE"}
                                    />
                                </InputGroup>
                            </Link>
                        </div>
                    </Container>
                </Col>
                <Col className="img-bg col-12 col-lg-6 d-none d-lg-block">
                    <img src="./assets/login/cover.jpg" alt="Plant" />
                </Col>
            </Row>
        </div>
    )
}

export default Login