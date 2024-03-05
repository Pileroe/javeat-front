import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { currentUser } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantForm from "./RestaurantForm";

const RestaurantByOwner = () =>{

    const [user] = useAtom(currentUser);
    const [distance, setDistance] = useState(null);
    const [restaurant,setRestaurant]= useState(null);

    useEffect(() => {
        axios.get(`/restaurants/${user.id}`)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-6"> {/* This sets the column to take up half of the container's width */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Restaurant Details</h5>
                            {/* Include the RestaurantForm component here */}
                            <RestaurantForm />
                        </div>
                    </div>
                </div>
                {/* If you need another column on the right, add another div.col-6 here */}
            </div>
        </div>
    );
}

export default RestaurantByOwner;