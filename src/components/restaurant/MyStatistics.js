import { useAtom } from "jotai";
import { currentUser } from "../../App";
import { useState, useEffect } from "react";
import axios from "axios";

function MyStatistics() {
    const [user] = useAtom(currentUser);
    const [statistics, setStatistics] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user && user.id) {
            axios.get(`/myorders/statistic/${user.id}`)
            .then(response => {
                setStatistics(response.data);
            })
            .catch(error => {
                setError("Failed to fetch statistics. Please try again later.");
            });
        }
    }, [user]);

    return (
        <div className="container mt-5">
            <h2>Restaurant Statistics</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {statistics.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.weekOfYear}</h5>
                                <p className="card-text">Total Earnings: {item.totalEarnings}</p>
                                <ul className="list-group list-group-flush">
                                    {Object.entries(item.dishesOrdered).map(([dishName, count]) => (
                                        <li className="list-group-item" key={dishName}>
                                            {dishName}: {count}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyStatistics;

