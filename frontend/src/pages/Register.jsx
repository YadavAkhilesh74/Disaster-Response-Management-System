import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/form.css";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {

            const data = await registerUser({
                name,
                email,
                password,
            });

            toast.success(data.message);
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="form-page">
            <div className="form-card">
                <h2 className="form-title text-center">

                    Create Account

                </h2>

                <p className="form-subtitle text-center">

                    Join the Disaster Response Platform

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>


                </form>
                <div className="auth-footer">

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Register;