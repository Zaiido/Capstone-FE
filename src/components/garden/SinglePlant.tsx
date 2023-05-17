import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { Col, Card, DropdownButton, Dropdown, Form } from "react-bootstrap"
import { AiOutlineEllipsis, AiOutlineUpload, AiOutlineCheckCircle } from "react-icons/ai"

interface IProps {
    plant: any,
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const SinglePlant = ({ plant, reloadPage, setReloadPage }: IProps) => {
    const dateString = plant.createdAt;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    const [edit, setEdit] = useState(false)
    const [nameToEdit, setNameToEdit] = useState(plant.name)
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = "image/*";
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        } else {
            setFile(null);
        }
    };


    const editPlantImage = async () => {
        try {
            const formData = new FormData();
            if (file) {
                formData.append("editPlantImage", file);
            }
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/garden/editImage`,
                {
                    method: "POST",
                    body: formData,
                    headers: { "Authorization": `Bearer ${accessToken}` }
                }
            );
            if (response.ok) {
                let { imageUrl } = await response.json()
                return imageUrl

            }
        } catch (error) {
            console.log(error)
        }
    }


    const editPlant = async () => {
        try {
            let image: string;
            let body: any
            if (file) {
                image = await editPlantImage()
                body = JSON.stringify({ image: image, name: nameToEdit })
            } else {
                body = JSON.stringify({ name: nameToEdit })
            }

            let response = await fetch(`${process.env.REACT_APP_BE_URL}/garden/${plant._id}`,
                {
                    method: "PUT",
                    body,
                    headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" }
                })
            if (response.ok) {
                setReloadPage(!reloadPage)
            }

        } catch (error) {
            console.log(error)
        }
    }


    const deletePlant = async () => {
        try {
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/garden/${plant._id}`,
                {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${accessToken}` }
                })
            if (response.ok) {
                setReloadPage(!reloadPage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col className="col-12 col-md-4 col-lg-3 px-0">
            <Card className="single-plant-card">
                <Card.Img variant="top" src={plant.image} />
                <Card.Body>
                    {edit ?
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control className="post-textarea" value={nameToEdit} onChange={(e) => setNameToEdit(e.target.value)} as="textarea" rows={2} />
                        </Form.Group>
                        : <Card.Title>{plant.name}</Card.Title>}
                    <Card.Text style={{ fontSize: "13px" }}>
                        {formattedDate}
                    </Card.Text>
                </Card.Body>
                <DropdownButton
                    className="post-actions-btn actions garden-actions"
                    key='down'
                    id='dropdown-button-drop-down'
                    drop='down'
                    variant="secondary"
                    title={<AiOutlineEllipsis className="post-icons garden-icons" />}
                >
                    <Dropdown.Item eventKey="1" onClick={() => setEdit(true)}>Edit</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={deletePlant}>Delete</Dropdown.Item>
                </DropdownButton>
                {edit &&
                    <>
                        <div className="edit-icon-container">
                            <input
                                type="file"
                                id="file-upload"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                            <AiOutlineUpload className="post-icons garden-icons" onClick={handleIconClick} />
                        </div>
                        <AiOutlineCheckCircle className="post-icons garden-icons edit-icon mr-2 mb-2" onClick={() => { editPlant(); setEdit(false); }} />
                    </>}
            </Card>
        </Col>)
}

export default SinglePlant