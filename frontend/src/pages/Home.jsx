import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Hero from "../components/common/Hero";
import StatCard from "../components/common/StatCard";

import { getIncidentStats } from "../services/incidentService";

import {
    FaClipboardList,
    FaExclamationTriangle,
    FaSpinner,
    FaCheckCircle,
} from "react-icons/fa";

import "../styles/home.css";

function Home() {

    const [stats, setStats] = useState({
        total: 0,
        reported: 0,
        inProgress: 0,
        resolved: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchStats();

    }, []);

    const fetchStats = async () => {

        try {

            const data = await getIncidentStats();

            setStats(data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch statistics."
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <h3>Loading...</h3>

            </div>

        );

    }

    return (

        <>

            <Hero />

            <section className="container mb-5">

                <h2 className="section-title text-center">

                    Live Dashboard

                </h2>

                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">

                        <StatCard
                            title="Total Incidents"
                            value={stats.total}
                            color="primary"
                            icon={<FaClipboardList />}
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <StatCard
                            title="Reported"
                            value={stats.reported}
                            color="warning"
                            icon={<FaExclamationTriangle />}
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <StatCard
                            title="In Progress"
                            value={stats.inProgress}
                            color="info"
                            icon={<FaSpinner />}
                        />

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <StatCard
                            title="Resolved"
                            value={stats.resolved}
                            color="success"
                            icon={<FaCheckCircle />}
                        />

                    </div>

                </div>

            </section>

        </>

    );

}

export default Home;