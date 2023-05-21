/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import TheNavbar from "../navbar/TheNavbar"
import { AiOutlineCamera, AiOutlineUpload } from 'react-icons/ai'
import { useEffect, useRef, useState } from "react";
import SinglePlant from "./SinglePlant";
import SingleMatch from "./SingleMatch";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGardenAction, fetchStoresAction } from "../../redux/actions";
import SingleDiagnose from "./SingleDiagnose";
import StoreMap from "./StoreMap";
import AddStoreForm from "./AddStoreForm";

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
    const [loading, setLoading] = useState(false)


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
            setLoading(true)
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
                setLoading(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const diagnosePlant = async () => {
        try {
            setLoading(true)
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
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const takePicture = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = mediaStream;

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            video.addEventListener('loadedmetadata', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                context?.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], 'captured-image.jpeg', { type: 'image/jpeg' });
                        setFile(file);
                    }
                }, 'image/jpeg');

                const dataURL = canvas.toDataURL('image/jpeg');
                setImage(dataURL);

                video.pause();
                video.srcObject = null;
                mediaStream.getTracks().forEach(track => track.stop());
            });

            video.play();
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (myProfile && !Array.isArray(myProfile)) {
            const tokenCookie = Cookies.get("accessToken") || localStorage.getItem("accessToken");
            dispatch(fetchGardenAction(myProfile._id, tokenCookie as string));
            dispatch(fetchStoresAction(tokenCookie as string))
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
                                    <AiOutlineCamera className="post-icons garden-icons mx-1" onClick={takePicture} />
                                </OverlayTrigger>
                                <input
                                    type="file"
                                    id="file-upload"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />
                                <OverlayTrigger
                                    key="bottom"
                                    placement="bottom"
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            Upload Image
                                        </Tooltip>
                                    }
                                >
                                    <AiOutlineUpload onClick={handleIconClick} className="post-icons garden-icons mx-1" />
                                </OverlayTrigger>

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
                {loading && <Row className="mt-5 pt-5">
                    <Col className="d-flex align-items-center justify-content-center tree-col">
                        <div className="tree-container">
                            <div className="tree">
                                <div className="branch" style={{ '--x': 0 } as React.CSSProperties}>
                                    <span style={{ '--i': 0 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 1 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 2 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 3 } as React.CSSProperties}></span>
                                </div>
                                <div className="branch" style={{ '--x': 1 } as React.CSSProperties}>
                                    <span style={{ '--i': 0 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 1 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 2 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 3 } as React.CSSProperties}></span>
                                </div>
                                <div className="branch" style={{ '--x': 2 } as React.CSSProperties}>
                                    <span style={{ '--i': 0 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 1 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 2 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 3 } as React.CSSProperties}></span>
                                </div>
                                <div className="branch" style={{ '--x': 3 } as React.CSSProperties}>
                                    <span style={{ '--i': 0 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 1 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 2 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 3 } as React.CSSProperties}></span>
                                </div>
                                <div className="stem">
                                    <span style={{ '--i': 0 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 1 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 2 } as React.CSSProperties}></span>
                                    <span style={{ '--i': 3 } as React.CSSProperties}></span>
                                </div>
                                <span className="shadow"></span>
                            </div>
                        </div>
                    </Col>
                </Row>}
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
                        {myGarden && myGarden.slice().reverse().map((plant: any, i: number) => <SinglePlant key={i} plant={plant} reloadPage={reloadPage} setReloadPage={setReloadPage} />)}
                    </Row>
                </div>
                <div className="store-map-container">
                    <Row>
                        <Col className="col-12 col-md-8">
                            <h4 className="text-center mb-5">Plant Houses</h4>
                            <StoreMap initialLocation={[52.5200, 13.4050]} />
                        </Col>
                        <Col className="col-12 mt-5 mt-md-0 col-md-4">
                            <h4 className="text-center">Add a Plant House</h4>
                            <h6 className="text-center mb-3">(if you know any)</h6>
                            <AddStoreForm reloadPage={reloadPage} setReloadPage={setReloadPage} />
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Garden