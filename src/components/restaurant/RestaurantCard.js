import React from 'react';
import { Link } from 'react-router-dom';

export default function RestaurantCard(props) {
    return (
        <div className='col col-md-3'>
            <div className='container'>
                <div className="card shadow mb-4" style={{ backgroundColor: "#FFFFEC" }}>
                    <img src={props.restaurant.imgUrl} className="card-img-top" alt="Restaurant Image" style={{ width: "100%", height: "100%" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.restaurant.name}</h5>
                        <p className="card-text">Open: {props.restaurant.isOpen ? 'Yes' : 'No'}</p>
                        <p className="card-text">Food Types: {props.restaurant.foodTypes.join(', ')}</p>
                        <p className="card-text">Distance: {props.restaurant.distance} km</p>
                        <Link className="btn btn-dark text-white btn-outline-secondary align-middle mt-2 border-0  mx-4 py-2 " to={"/restaurants/" + props.restaurant.id}>DETAILS</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}