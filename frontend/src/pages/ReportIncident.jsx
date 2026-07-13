import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createIncident } from "../services/incidentService";

function ReportIncident() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [severity, setSeverity] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("type", type);
            formData.append("severity", severity);
            formData.append("location", location);

            if (image) {
                formData.append("images", image);
            }

            const data = await createIncident(formData);

            toast.success(data.message);

            setTitle("");
            setDescription("");
            setType("");
            setSeverity("");
            setLocation("");
            setImage(null);

            navigate("/incidents");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to report incident"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

    <div className="container py-5">

        <div className="report-card">

            <h2 className="report-title text-center">

                🚨 Report New Incident

            </h2>

            <p className="report-subtitle text-center">

                Help emergency responders by submitting accurate disaster information.

            </p>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">

                    <label className="form-label">

                        Incident Title

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Major Fire Near Railway Station"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                    />

                </div>

                <div className="mb-4">

                    <label className="form-label">

                        Description

                    </label>

                    <textarea
                        rows="5"
                        className="form-control"
                        placeholder="Describe what happened..."
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        required
                    />

                </div>

                <div className="row">

                    <div className="col-md-6 mb-4">

                        <label className="form-label">

                            Disaster Type

                        </label>

                        <select
                            className="form-select"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                            required
                        >

                            <option value="">Choose Type</option>

                            <option value="flood">Flood</option>

                            <option value="fire">Fire</option>

                            <option value="earthquake">Earthquake</option>

                            <option value="cyclone">Cyclone</option>

                            <option value="landslide">Landslide</option>

                            <option value="medical">Medical</option>

                        </select>

                    </div>

                    <div className="col-md-6 mb-4">

                        <label className="form-label">

                            Severity

                        </label>

                        <select
                            className="form-select"
                            value={severity}
                            onChange={(e)=>setSeverity(e.target.value)}
                        >

                            <option value="">

                                Choose Severity

                            </option>

                            <option value="minor">

                                Minor

                            </option>

                            <option value="moderate">

                                Moderate

                            </option>

                            <option value="severe">

                                Severe

                            </option>

                        </select>

                    </div>

                </div>

                <div className="mb-4">

                    <label className="form-label">

                        Location

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Varanasi, Uttar Pradesh"
                        value={location}
                        onChange={(e)=>setLocation(e.target.value)}
                        required
                    />

                </div>

                <div className="mb-4">

                    <label className="form-label">

                        Upload Disaster Image

                    </label>

                    <div className="upload-box">

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e)=>setImage(e.target.files[0])}
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="btn btn-danger submit-btn"
                    disabled={loading}
                >

                    {

                        loading

                        ?

                        "Submitting..."

                        :

                        " Report Incident"

                    }

                </button>

            </form>

        </div>

    </div>

);

}

export default ReportIncident;