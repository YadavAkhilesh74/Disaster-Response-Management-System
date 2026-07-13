import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

import {
    FaGlobeAsia,
    FaSignInAlt,
    FaSignOutAlt,
    FaUserPlus,
    FaInfoCircle,
} from "react-icons/fa";

import { FiHome } from "react-icons/fi";
import { MdReport } from "react-icons/md";
import { FaList } from "react-icons/fa";

import "../../styles/navbar.css";

function Navbar() {

    const { token, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg custom-navbar">

            <div className="container">

                <Link
                    className="logo"
                    to="/"
                >

                    <FaGlobeAsia size={30} />

                    <span>Disaster Response</span>

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >

                    <div className="navbar-nav nav-links">

                        <Link className="nav-link" to="/">
                            <FiHome className="me-2" />
                            Home
                        </Link>

                        <Link className="nav-link" to="/incidents">
                            <FaList className="me-2" />
                            Incidents
                        </Link>

                        <Link className="nav-link" to="/about">
                            <FaInfoCircle className="me-2" />
                            About
                        </Link>

                        {
                            token ? (
                                <>

                                    <Link
                                        className="nav-link"
                                        to="/report"
                                    >
                                        <MdReport className="me-2" />
                                        Report
                                    </Link>

                                    <button
                                        className="btn btn-danger logout-btn"
                                        onClick={handleLogout}
                                    >
                                        <FaSignOutAlt className="me-2" />
                                        Logout
                                    </button>

                                </>
                            ) : (
                                <>

                                    <Link
                                        className="nav-link"
                                        to="/login"
                                    >
                                        <FaSignInAlt className="me-2" />
                                        Login
                                    </Link>

                                    <Link
                                        className="btn btn-primary ms-3"
                                        to="/register"
                                    >
                                        <FaUserPlus className="me-2" />
                                        Register
                                    </Link>

                                </>
                            )
                        }

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;