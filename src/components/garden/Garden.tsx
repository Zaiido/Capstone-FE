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
import SingleDiagnose from "./SingleDiagnose";

const Garden = () => {


    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const myProfile = useAppSelector(state => state.myProfile.results)
    const myGarden = useAppSelector(state => state.garden.results)
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const dispatch = useAppDispatch()

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("")
    const [reloadPage, setReloadPage] = useState(false)
    const [results, setResults] = useState<any[]>([])
    const [diagnoseResults, setDiagnoseResults] = useState<any[]>([])


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
                let { data, imageUrl } = await response.json()
                setResults(data.results.slice(0, 10))
                setUrl(imageUrl)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const diagnosePlant = async () => {
        try {
            const options = {
                api_key: process.env.REACT_APP_DIAGNOSE_API_KEY,
                images: [image],
                modifiers: ["crops_fast", "similar_images"],
                language: "en",
                disease_details: ["cause",
                    "common_names",
                    "classification",
                    "description",
                    "treatment",
                    "url"],
            };
            let response = await fetch(`${process.env.REACT_APP_DIAGNOSE_API_URL}`,
                {
                    method: "POST",
                    body: JSON.stringify(options),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
                let data = await response.json()
                setDiagnoseResults(data.health_assessment.diseases.slice(0, 4))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (myProfile && !Array.isArray(myProfile)) {
            const tokenCookie = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchGarden(myProfile._id, tokenCookie as string));
        }
    }, [myProfile, reloadPage]);


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
                                <div className="garden-btn w-100 d-flex justify-content-center p-2" onClick={diagnosePlant}>Diagnose</div>
                            </div>
                        </div>
                    </Col>
                </Row>
                {results.length > 0 && <Row className="my-5">
                    <Col className="col-12">
                        <div className="section-container px-4 py-3">
                            <h4 className="text-center mb-5">Matches</h4>
                            <Row>
                                {results && results.map((result, i) => <SingleMatch key={i} result={result} imageUrl={url} reloadPage={reloadPage} setReloadPage={setReloadPage} />)}
                            </Row>
                        </div>
                    </Col>
                </Row>}
                {diagnoseResults.length > 0 && <Row className="my-5">
                    <Col className="col-12">
                        <div className="section-container px-4 py-3">
                            <h4 className="text-center mb-5">Matches</h4>
                            <Row>
                                {diagnoseResults && diagnoseResults.map((result, i) => <SingleDiagnose key={i} result={result} />)}
                                <Col className="col-12">
                                    <h4 className="advice">Treatment</h4>
                                    <p className="my-2 advice">Biological: </p>
                                    {diagnoseResults[0].disease_details.treatment.biological?.map((advice: any, i: any) =>
                                        <li key={i}>{advice}</li>)}
                                    <p className="my-2 advice">Chemical: </p> {diagnoseResults[0].disease_details.treatment.chemical?.map((advice: any, i: any) =>
                                        <li key={i}>{advice}</li>)}
                                    <p className="my-2 advice">Prevention: </p> {diagnoseResults[0].disease_details.treatment.prevention?.map((advice: any, i: any) =>
                                        <li key={i}>{advice}</li>)}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>}
                <div className="my-garden">
                    <h4 className="text-center my-5">My Garden</h4>
                    <Row className="mt-5 mx-0">
                        {myGarden && myGarden.map((plant: any) => <SinglePlant plant={plant} reloadPage={reloadPage} setReloadPage={setReloadPage} />)}
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Garden