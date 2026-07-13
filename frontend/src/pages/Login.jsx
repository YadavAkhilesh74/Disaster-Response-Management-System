import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/form.css";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {

            const data = await loginUser({
                email,
                password,
            });

            login(data.user, data.token);

            toast.success(data.message);

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div
            className="form-page"
        >
            <div className="form-card">

                <h2 className="form-title text-center">

                    Welcome Back

                </h2>

                <p className="form-subtitle text-center">

                    Sign in to continue to Disaster Response

                </p>

                <form onSubmit={handleSubmit}>

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

                        {loading ? "Logging in..." : "Login"}

                    </button>

                </form>
                <div className="auth-footer">

                    Don't have an account?

                    {" "}

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>
        </div>
    );
}

export default Login;