import { useState } from "react"
import { Row, Col, Container, Form, InputGroup, FormControl, Button } from "react-bootstrap"
import { FaUserCircle, FaKey, FaFacebookSquare, FaGoogle } from "react-icons/fa"
import { AiOutlineMail } from 'react-icons/ai'
import { Link } from "react-router-dom"
import '../../css/register.css'

const Register = () => {
    const [isFBHovered, setIsFBHovered] = useState(false)
    const [isGoogleHovered, setIsGoogleHovered] = useState(false)


    return (
        <div className="login-section d-flex justify-content-center align-items-center">
            <Row className="login-container">
                <Col className="img-bg col-12 col-lg-6 d-none d-lg-block">
                    <img src="./assets/login/cover.jpg" alt="Plant" />
                </Col>
                <Col className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <Container className="mt-md-5 mx-md-5 px-md-5 d-flex flex-column">
                        <Form className="mt-5 mb-2 mt-md-0 mb-md-4 d-flex flex-column align-items-center">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text> <FaUserCircle /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Username"
                                    className="remove-box-shadow"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text> <AiOutlineMail /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Email"
                                    className="remove-box-shadow"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text> <FaKey /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Password"
                                    className="remove-box-shadow"
                                />
                            </InputGroup>
                            <Button className="align-self-end login-btn" variant="primary" type="submit">
                                REGISTER
                            </Button>
                            <Link className="align-self-start mt-2 login-link" to={"/login"}>Already a member? Login instead</Link>
                        </Form>
                        <div className="d-flex align-items-center mt-1 mb-4">
                            <hr className="line" /> <span>or</span>  <hr className="line" />
                        </div>
                        <div className="oauth-btns mb-4">
                            <Link to={`${process.env.REACT_APP_BE_URL}/users/facebookLogin`}>
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
                                        value={"REGISTER WITH FACEBOOK"}
                                        type="submit"
                                    />
                                </InputGroup>
                            </Link>
                            <Link to={`${process.env.REACT_APP_BE_URL}/users/googleLogin`}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text
                                            className="google-icon-container"
                                            onMouseOver={() => setIsGoogleHovered(true)}
                                            onMouseOut={() => setIsGoogleHovered(false)}> <FaGoogle /> </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        className={isGoogleHovered ? "google-btn text-center hover-google" : "google-btn text-center"}
                                        value={"REGISTER WITH GOOGLE"}
                                        type="submit"
                                    />
                                </InputGroup>
                            </Link>
                        </div>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

export default Register