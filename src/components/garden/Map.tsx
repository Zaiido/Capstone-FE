export { }

// import { useEffect } from 'react';
// import { Loader } from "@googlemaps/js-api-loader"

// const Map = () => {

//     const demo = async () => {
//         const loader = new Loader({
//             apiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
//             version: "weekly",
//             libraries: ['places']
//         });

//         window.onload = async () => {
//             const google = await loader.load();
//             const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
//                 center: { lat: 52.5200, lng: 13.4050 },
//                 zoom: 8,
//             });
//         };
//     }

//     useEffect(() => {
//         demo();
//     }, [])

//     return <div id="map" style={{ height: "300px", width: "500px" }}></div>;
// };

// export default Map;
