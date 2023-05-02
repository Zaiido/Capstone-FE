import { useState } from "react"
import { Row, Col, Container, Form, InputGroup, FormControl, Button, Alert } from "react-bootstrap"
import { FaUserCircle, FaKey, FaFacebookSquare, FaGoogle } from "react-icons/fa"
import { AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom"
import '../../css/register.css'


const Register = () => {
    const [isFBHovered, setIsFBHovered] = useState(false)
    const [isGoogleHovered, setIsGoogleHovered] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [validEmail, setValidEmail] = useState(true)
    const navigate = useNavigate()

    const isValidEmail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;
        const isValid = emailRegex.test(email);
        setValidEmail(isValid)
        console.log(isValid)
    }

    const handleRegister = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BE_URL}/users/register`,
                {
                    method: 'POST',
                    body: JSON.stringify({ username, email, password }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
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
                <Col className="img-bg col-12 col-lg-6 d-none d-lg-block">
                    <img src="./assets/login/branch.jpg" alt="Plant" />
                </Col>
                <Col className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <Container className="mt-md-5 mx-md-5 px-md-5 d-flex flex-column">
                        {alert && <Alert style={{ fontSize: "12px", marginTop: "10px" }} variant="danger">
                            {alertMessage}
                        </Alert>}
                        <Form className="mt-5 mb-2 mt-md-0 mb-md-4 d-flex flex-column align-items-center">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text> <FaUserCircle /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Username"
                                    className="remove-box-shadow"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text className={validEmail ? "" : "not-valid-email"}> <AiOutlineMail /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Email"
                                    className={validEmail ? "remove-box-shadow" : "remove-box-shadow not-valid-email"}
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        isValidEmail()
                                    }}
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
                                    if (username.length === 0) {
                                        setAlertMessage("Please enter your username!")
                                        setAlert(true)
                                    } else if (email.length === 0) {
                                        setAlertMessage("Please enter your email!")
                                        setAlert(true)
                                    } else if (password.length === 0) {
                                        setAlertMessage("Please choose a password!")
                                        setAlert(true)
                                    } else if (!validEmail) {
                                        setAlertMessage("Please enter a valid email!")
                                        setAlert(true)
                                    }
                                    if (validEmail && password.length !== 0) {
                                        handleRegister()
                                    }
                                }}>
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