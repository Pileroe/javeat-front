import React from 'react';
import { Link } from 'react-router-dom';

function calculateDistance(userPosition, restaurantPosition) {
    const dx = userPosition.positionX - restaurantPosition.positionX;
    const dy = userPosition.positionY - restaurantPosition.positionY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}

export default function RestaurantCard(props) {
    
    const userPosition = { positionX: props.userPositionX, positionY: props.userPositionY };
    const restaurantPosition = { positionX: props.restaurant.positionX, positionY: props.restaurant.positionY };
    const distance = calculateDistance(userPosition, restaurantPosition);

    return (
        <div className='col-md-4 mb-4'>
            <div className="card h-100 border border-dark rounded" style={{ width: '18rem' }}>
                <img src={props.restaurant.img_url} className="card-img-top" alt="Restaurant" />
                <div className="card-body">
                    <h5 className="card-title">{props.restaurant.name}</h5>
                    <p className="card-text"><strong>Open:</strong> {props.restaurant.is_open ? 'Yes' : 'No'}</p>
                    <p className="card-text"><strong>Food Types:</strong> {props.restaurant.foodTypes.join(', ')}</p>
                    <p className="card-text"><strong>Distance:</strong> {distance} km</p>
                    <Link className="btn btn-dark btn-sm" to={"/restaurants/" + props.restaurant.id}>DETAILS</Link>
                </div>
            </div>
        </div>
    );
}