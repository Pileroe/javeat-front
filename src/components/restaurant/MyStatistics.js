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

        <div className="restaurant-form-container pt-5" style={{ backgroundImage: "url(/3.jpg)", backgroundSize: 'cover', color: 'white', padding: '10px', height: '90vh' }}>

            <div className="container mt-5">
                <h2 className="text-black"><strong>Restaurant Statistics</strong></h2>
                <br />
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                    {statistics.map((item, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card text-bg-dark mb-3" style={{}}>
                                <div className="card-body">
                                    <h4 className="card-title"><strong>{item.weekOfYear}</strong></h4> <br />
                                    <p className="card-text"><strong>Total Earnings:</strong> {item.totalEarnings}</p>
                                    <ul className="list-group list-group-flush">
                                        {Object.entries(item.dishesOrdered).map(([dishName, count]) => (
                                            <li className="list-group-item" key={dishName}>
                                                <strong>{dishName}: </strong> {count}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyStatistics;

