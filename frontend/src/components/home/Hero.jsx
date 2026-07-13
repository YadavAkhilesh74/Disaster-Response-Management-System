import { Link } from "react-router-dom";

import {
    MdReport,
    MdLocationOn,
} from "react-icons/md";

import "../styles/home.css";

function Hero(){

    return(

        <section className="hero">

            <div className="container">

                <div className="hero-content">

                    <span className="hero-badge">

                        Emergency Management Platform

                    </span>

                    <h1 className="hero-title">

                        Disaster Response
                        <br/>

                        Management System

                    </h1>

                    <p className="hero-subtitle">

                        Report disasters, monitor incidents,
                        visualize locations on interactive maps
                        and coordinate emergency response
                        efficiently.

                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/report"
                            className="btn btn-primary btn-lg"
                        >

                            <MdReport
                                className="me-2"
                            />

                            Report Incident

                        </Link>

                        <Link
                            to="/incidents"
                            className="btn btn-outline-primary btn-lg"
                        >

                            <MdLocationOn
                                className="me-2"
                            />

                            View Incidents

                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Hero;