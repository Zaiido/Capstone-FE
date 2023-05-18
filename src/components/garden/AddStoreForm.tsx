import Cookies from "js-cookie"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"


interface IProps {
    reloadPage: boolean,
    setReloadPage: React.Dispatch<React.SetStateAction<boolean>>
}

const AddStoreForm = ({ reloadPage, setReloadPage }: IProps) => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState(
        {
            street: "",
            houseNumber: "",
            postcode: "",
            cityAndCountry: ""
        })
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");



    const handleAddButtonClick = async () => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address.houseNumber + " " + address.street + ", " + address.postcode + ", " + address.cityAndCountry)}`);

            if (response.ok) {
                const data = await response.json();

                if (data.length > 0) {
                    const firstResult = data[0];
                    const { lat, lon } = firstResult;
                    createStore(lat, lon)
                } else {
                    console.log("No coordinates found for the provided address.");
                }
            } else {
                console.log("Error occurred while fetching coordinates from the API:", response.statusText);
            }
        } catch (error) {
            console.log("Error occurred while fetching coordinates from the API:", error);
        }
    };

    const createStore = async (lat: string, lon: string) => {
        try {
            const [city, country] = address.cityAndCountry.split(",").map(item => item.trim());
            let response = await fetch(`${process.env.REACT_APP_BE_URL}/stores`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        coordinates: [lat, lon],
                        address: {
                            street: address.street,
                            houseNumber: address.houseNumber,
                            postcode: address.postcode,
                            city,
                            country
                        }
                    }),
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
            if (response.ok) {
                setReloadPage(!reloadPage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form className="d-flex flex-column">
            <Form.Group>
                <Form.Label className="store-map-label">Name:</Form.Label>
                <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" className="address-input" />
            </Form.Group>
            <Form.Group>
                <Form.Label className="store-map-label">Street:</Form.Label>
                <Form.Control value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} type="text" className="address-input" />
            </Form.Group>
            <Form.Group>
                <Form.Label className="store-map-label">House Number:</Form.Label>
                <Form.Control value={address.houseNumber} onChange={(e) => setAddress({ ...address, houseNumber: e.target.value })} type="text" className="address-input" />
            </Form.Group>
            <Form.Group>
                <Form.Label className="store-map-label">Post Code:</Form.Label>
                <Form.Control value={address.postcode} onChange={(e) => setAddress({ ...address, postcode: e.target.value })} type="text" className="address-input" />
            </Form.Group>
            <Form.Group>
                <Form.Label className="store-map-label">City, Country:</Form.Label>
                <Form.Control value={address.cityAndCountry} onChange={(e) => setAddress({ ...address, cityAndCountry: e.target.value })} type="text" className="address-input" />
            </Form.Group>
            <Button className="post-btn mt-4" onClick={handleAddButtonClick}>Add</Button>
        </Form>
    )
}

export default AddStoreForm