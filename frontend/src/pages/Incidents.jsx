import { useEffect, useState } from "react";
import { getAllIncidents } from "../services/incidentService";
import { Link } from "react-router-dom";
import "../styles/incident.css"

function Incidents() {

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  useEffect(() => {

    fetchIncidents();

  }, []);

  const fetchIncidents = async () => {

    try {

      const data = await getAllIncidents();

      setIncidents(data.incidents);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );

  }

  const filteredIncidents = incidents.filter((incident) =>
    incident.title.toLowerCase().includes(search.toLocaleLowerCase())
  );
  if (!loading && incidents.length === 0) {

    return (

      <div className="container mt-5 text-center">

        <h3>No incidents found.</h3>

      </div>

    );

  }
  return (
    

    <div className="container mt-5">

      <h2 className="mb-4">
        Reported Incidents
      </h2>
      <div className="mb-4">

        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>
      <div className="row">

        {
          filteredIncidents.map((incident) => (

            <div
              className="col-md-4 mb-4"
              key={incident._id}
            >

              <Link
                to={`/incidents/${incident._id}`}
                className="text-decoration-none text-dark"
              >

                <div className="card shadow h-100">

                  {
                    incident.images?.length > 0 && (

                      <img
                        src={incident.images[0]}
                        className="card-img-top"
                        style={{
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />

                    )
                  }

                  <div className="card-body">

                    <h5>
                      {incident.title}
                    </h5>

                    <p>
                      {incident.description.substring(0, 80)}...
                    </p>

                    <p>

                      <strong>
                        Type:
                      </strong>

                      {" "}
                      {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)}

                    </p>

                    <p>

                      <strong>
                        Severity:
                      </strong>

                      {" "}
                      <span
                        className={`badge ${incident.severity === "severe"
                          ? "bg-danger"
                          : incident.severity === "moderate"
                            ? "bg-warning text-dark"
                            : "bg-success"
                          }`}
                      >{incident.severity}</span>
                      

                    </p>

                    <p>

                      <strong>
                        Location:
                      </strong>

                      {" "}
                      {incident.location}

                    </p>
                    <p className="text-muted">

                      Reported on

                      {" "}

                      {new Date(incident.createdAt).toLocaleString()}

                    </p>

                  </div>

                </div>
              </Link>
            </div>

          ))
        }

      </div>

    </div>

  );

}

export default Incidents;