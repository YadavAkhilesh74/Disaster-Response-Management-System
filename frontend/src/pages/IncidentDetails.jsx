import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {MapContainer,TileLayer, Marker, Popup } from "react-leaflet";
import { getIncidentById } from "../services/incidentService";

function IncidentDetails() {

    const { id } = useParams();

    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchIncident();

    }, []);

    const fetchIncident = async () => {

        try {

            const data = await getIncidentById(id);

            setIncident(data.incident);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "reported":
                return "bg-warning";

            case "in-progress":
                return "bg-info";

            case "resolved":
                return "bg-success";

            default:
                return "bg-secondary";

        }

    };

    if (loading) {

        return (
            <div className="container mt-5">
                <h3>Loading...</h3>
            </div>
        );

    }

    if (!incident) {

        return (
            <div className="container mt-5">
                <h3>Incident not found.</h3>
            </div>
        );

    }

    return (

        <div className="container mt-5">

            <div className="card shadow">

                {

                    incident.images.length > 0 && (

                        <img
                            src={incident.images[0]}
                            alt={incident.title}
                            className="card-img-top"
                            style={{
                                height: "400px",
                                objectFit: "cover",
                            }}
                        />

                    )

                }

                <div className="card-body">

                    <h2>{incident.title}</h2>

                    <hr />


                    <p>

                        <strong>Type:</strong>

                        {" "}

                        {incident.type}

                    </p>

                    <p>

                        <strong>Severity:</strong>

                        {" "}

                        <span
                            className={`badge ${incident.severity === "severe"
                                ? "bg-danger"
                                : incident.severity === "moderate"
                                    ? "bg-warning text-dark"
                                    : "bg-success"
                                }`}
                        >
                            {incident.severity}
                        </span>

                    </p>

                    <p>

                        <strong>Status:</strong>

                        {" "}

                        <span className={`badge ${getStatusBadge(incident.status)}`}>
                            {incident.status}
                        </span>

                    </p>

                    <p>

                        <strong>Location:</strong>

                        {" "}

                        {incident.location}

                    </p>
                    {
                        incident.coordinates?.latitude &&
                        incident.coordinates?.longitude && (

                            <div className="mt-4">

                                <h4>Location on Map</h4>

                                <MapContainer
                                    center={[
                                        incident.coordinates.latitude,
                                        incident.coordinates.longitude,
                                    ]}
                                    zoom={13}
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                    }}
                                >

                                    <TileLayer
                                        attribution='&copy; OpenStreetMap contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <Marker
                                        position={[
                                            incident.coordinates.latitude,
                                            incident.coordinates.longitude,
                                        ]}
                                    >

                                        <Popup>
                                            {incident.title}
                                        </Popup>

                                    </Marker>

                                </MapContainer>

                            </div>

                        )
                    }

                    <p>

                        <strong>Description:</strong>

                    </p>

                    <p>

                        {incident.description}

                    </p>
                    <p>

                        <strong>Reported By:</strong>

                        {" "}

                        {incident.reportedBy?.name}

                    </p>

                    {new Date(incident.createdAt).toLocaleString()}


                </div>

            </div>

        </div>

    );

}

export default IncidentDetails;