function StatCard({

    title,

    value,

    color,

    icon,

}) {

    return (

        <div className="card stat-card h-100">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <p className="stat-title">

                            {title}

                        </p>

                        <h2
                            className={`stat-value text-${color}`}
                        >

                            {value}

                        </h2>

                    </div>

                    <div className="stat-icon">

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StatCard;