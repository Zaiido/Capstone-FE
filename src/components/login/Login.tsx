import { Row, Col, Form, Button, Container, InputGroup, FormControl, Alert } from "react-bootstrap"
import "../../css/login.css"
import { FaKey, FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
    const [isFBHovered, setIsFBHovered] = useState(false)
    const [isGoogleHovered, setIsGoogleHovered] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const navigate = useNavigate()


    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`,
                {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
                const { accessToken } = await response.json()
                localStorage.setItem("accessToken", accessToken)
                navigate("/feed")
            } else {
                const errorMessage = await response.json()
                setAlertMessage(errorMessage.message)
                setAlert(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-section d-flex justify-content-center align-items-center">
            <Row className="login-container">
                <Col className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <Container className="mt-md-5 mx-md-5 px-md-5 d-flex flex-column">
                        {alert && <Alert style={{ fontSize: "12px", marginTop: "10px" }} variant="danger">
                            {alertMessage}
                        </Alert>}
                        <Form className="mt-5 mb-2 mt-md-0 mb-md-4 d-flex flex-column align-items-center">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text> <AiOutlineMail /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Email"
                                    className="remove-box-shadow"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text> <FaKey /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Password"
                                    className="remove-box-shadow"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <Button className="align-self-end login-btn" variant="primary" type="submit"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleLogin()
                                }}>
                                LOGIN
                            </Button>
                            <Link className="align-self-start register-link" to={"/register"}>Register now</Link>
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
                                        value={"LOGIN WITH FACEBOOK"}
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
                                        value={"LOGIN WITH GOOGLE"}
                                        type="submit"
                                    />
                                </InputGroup>
                            </Link>
                        </div>
                    </Container>
                </Col>
                <Col className="img-bg col-12 col-lg-6 d-none d-lg-block">
                    <img src="./assets/login/branch.jpg" alt="Plant" />
                </Col>
            </Row>
        </div>
    )
}

export default Login