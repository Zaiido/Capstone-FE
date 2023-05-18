import React, { useEffect, useRef } from "react";
import L from "leaflet";
import markerIcon from "./seeds.png";

import "leaflet/dist/leaflet.css";
import { useAppSelector } from "../../redux/hooks";

interface StoreMapProps {
    initialLocation: L.LatLngExpression;
}

const StoreMap: React.FC<StoreMapProps> = ({ initialLocation }) => {

    const mapRef = useRef<L.Map | null>(null);
    const stores = useAppSelector(state => state.stores.results)

    useEffect(() => {
        const map = L.map("map").setView(initialLocation, 13);
        mapRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Map data &copy; OpenStreetMap contributors",
        }).addTo(map);


        const customIcon = L.icon({
            iconUrl: markerIcon,
            iconSize: [30, 32],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
        });


        stores.forEach((store: any) => {
            const { name, coordinates, address } = store;

            if (coordinates && coordinates.length === 2) {
                const [lat, lon] = coordinates;

                const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

                marker.on('mouseover', () => {
                    marker.bindPopup(`<b>${name}</b><br>${address.street} ${address.houseNumber}<br>${address.postcode}<br>${address.city}<br>${address.country}`).openPopup();
                });

                marker.on('mouseout', () => {
                    marker.closePopup();
                });
            }
        });


        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [initialLocation, stores]);


    return (<div id="map" style={{ height: "500px" }}></div>);
};

export default StoreMap;
