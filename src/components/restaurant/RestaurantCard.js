import React from 'react';
import { Link } from 'react-router-dom';

export default function RestaurantCard(props) {
    return (
        <div className='col-md-4 mb-4'>
            <div className="card h-100 border border-dark rounded" style={{ width: '18rem' }}>
                <img src={props.restaurant.img_url} className="card-img-top" alt="Restaurant" />
                <div className="card-body">
                    <h5 className="card-title">{props.restaurant.name}</h5>
                    <p className="card-text"><strong>Open:</strong> {props.restaurant.is_open ? 'Yes' : 'No'}</p>
                    <p className="card-text"><strong>Food Types:</strong> {props.restaurant.foodTypes.join(', ')}</p>
                    <p className="card-text"><strong>Distance:</strong> {props.restaurant.distance} km</p>
                    <Link className="btn btn-dark btn-sm" to={"/restaurants/" + props.restaurant.id}>DETAILS</Link>
                </div>
            </div>
        </div>
    );
}
