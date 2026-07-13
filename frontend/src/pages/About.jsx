import "../styles/about.css";

function About() {
    return (
        <div className="container py-5">

            <div className="about-card">

                <h1 className="about-title text-center">
                    About Disaster Response Management System
                </h1>

                <p className="about-subtitle text-center">
                    A full-stack MERN application designed to simplify disaster reporting,
                    incident tracking, and emergency response coordination.
                </p>

                <div className="about-section">

                    <h3>Project Objective</h3>

                    <p>
                        The Disaster Response Management System enables users to report
                        disasters, upload incident images, visualize locations on
                        interactive maps, and help emergency responders monitor
                        ongoing incidents efficiently. The platform aims to improve
                        communication and coordination during emergency situations
                        through a simple and user-friendly interface.
                    </p>

                </div>

                <div className="about-section">

                    <h3>Features</h3>

                    <ul>

                        <li>🔐 Secure JWT Authentication</li>

                        <li>📢 Report disaster incidents with images</li>

                        <li>☁️ Cloudinary image uploads</li>

                        <li>🗺️ Interactive maps using React Leaflet</li>

                        <li>📍 Automatic geocoding of incident locations</li>

                        <li>📊 Live incident statistics dashboard</li>

                        <li>🔍 Search incidents by title</li>

                        <li>📱 Responsive user interface</li>

                    </ul>

                </div>

                <div className="about-section">

                    <h3>Tech Stack</h3>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <div className="tech-card">

                                <h5>Frontend</h5>

                                <ul>

                                    <li>React</li>

                                    <li>React Router</li>

                                    <li>Bootstrap</li>

                                    <li>Axios</li>

                                    <li>React Leaflet</li>

                                    <li>React Toastify</li>

                                </ul>

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <div className="tech-card">

                                <h5>Backend</h5>

                                <ul>

                                    <li>Node.js</li>

                                    <li>Express.js</li>

                                    <li>MongoDB Atlas</li>

                                    <li>Mongoose</li>

                                    <li>JWT Authentication</li>

                                    <li>Cloudinary</li>

                                    <li>Multer</li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

                <p className="about-footer">

                    This project demonstrates full-stack web development using the
                    MERN stack, including secure authentication, RESTful APIs,
                    cloud image storage, interactive maps, and responsive UI
                    design. It was developed as a portfolio project to simulate
                    a real-world disaster response platform.

                </p>

            </div>

        </div>
    );
}

export default About;