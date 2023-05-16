/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import TheNavbar from "../navbar/TheNavbar"
import { AiOutlineCamera, AiOutlineUpload } from 'react-icons/ai'
import { useEffect, useRef, useState } from "react";
import SinglePlant from "./SinglePlant";
import SingleMatch from "./SingleMatch";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGarden } from "../../redux/actions";

const Garden = () => {


    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const myProfile = useAppSelector(state => state.myProfile.results)
    const dispatch = useAppDispatch()
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const [image, setImage] = useState('');
    const [results, setResults] = useState<any[]>([])


    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = "image/*";
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const reader = new FileReader();
        if (files && files.length > 0) {
            setFile(files[0]);
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
        } else {
            setFile(null);
        }
    };


    const identifyPlant = async () => {
        try {
            const formData = new FormData();
            if (file) {
                formData.append("plantImage", file);
            }

            let response = await fetch(`${process.env.REACT_APP_BE_URL}/garden/identify`,
                {
                    method: "POST",
                    body: formData,
                    headers: { "Authorization": `Bearer ${accessToken}` }
                }
            );
            if (response.ok) {
                let { data } = await response.json()
                console.log(data.results.slice(0, 10))
                setResults(data.results.slice(0, 10))
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (myProfile && !Array.isArray(myProfile)) {
            const tokenCookie = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchGarden(myProfile._id, tokenCookie as string));
        }
    }, [myProfile]);


    return (
        <div className="feed-body">
            <TheNavbar />
            <Container className="my-4">
                <Row>
                    <Col className="col-12">
                        <div className="section-container px-4 py-3">
                            <div className="d-flex align-items-center">
                                <OverlayTrigger
                                    key="bottom"
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            Take Photo
                                        </Tooltip>
                                    }
                                >
                                    <AiOutlineCamera className="post-icons garden-icons mx-1" />
                                </OverlayTrigger>
                                <input
                                    type="file"
                                    id="file-upload"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />
                                <AiOutlineUpload onClick={handleIconClick} className="post-icons garden-icons mx-1" />
                                {file && <div className="d-flex align-items-center p-1 ml-5 plant-details">
                                    <div className="plant-img-container mr-1">
                                        <img src={image} alt="Plant" />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div style={{ fontSize: "13px" }}>{file.name}</div>
                                    </div>
                                </div>}
                            </div>
                            <div className="d-flex justify-content-between mt-3 garden-btn-container">
                                <div className="garden-btn w-100 d-flex justify-content-center p-2" onClick={identifyPlant}>Identify</div>
                                <div className="garden-btn w-100 d-flex justify-content-center p-2">Diagnose</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                {results.length > 0 && <Row className="my-5">
                    <Col className="col-12">
                        <div className="section-container px-4 py-3">
                            <h4 className="text-center mb-5">Matches</h4>
                            <Row>
                                {results && results.map((result, i) => <SingleMatch key={i} result={result} />)}
                            </Row>
                        </div>
                    </Col>
                </Row>}
                <div className="my-garden">
                    <h4 className="text-center my-5">My Garden</h4>
                    <Row className="mt-5 mx-0">
                        <SinglePlant />
                        <SinglePlant />
                        <SinglePlant />
                        <SinglePlant />
                        <SinglePlant />
                        <SinglePlant />
                        <SinglePlant />
                        <SinglePlant />
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Garden