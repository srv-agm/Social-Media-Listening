import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.heat";

const HeatmapWithPopup: React.FC = () => {
    const heatmapData = [
        { lat: 34.0522, lng: -118.2437, intensity: 0.5, info: "Sales: $2009" },
        { lat: 40.7128, lng: -74.006, intensity: 0.8, info: "Sales: $1667" },
        { lat: 41.8781, lng: -87.6298, intensity: 0.6, info: "Sales: $1800" },
        { lat: 29.7604, lng: -95.3698, intensity: 0.7, info: "Sales: $1750" },
        { lat: 33.4484, lng: -112.074, intensity: 0.4, info: "Sales: $1500" },
    ];

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <MapContainer
                center={[37.0902, -95.7129]}
                zoom={4}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {heatmapData.map((data, index) => (
                    <Marker key={index} position={[data.lat, data.lng]}>
                        <Popup>
                            <div>
                                <h4>Location Info</h4>
                                <p>{data.info}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default HeatmapWithPopup;
