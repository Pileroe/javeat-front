import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import axios from 'axios';
import { currentUser } from '../../App';

export default function RestaurantCard({ restaurant }) {
    const [user] = useAtom(currentUser);
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const calculateDistance = () => {
            const dx = user.positionX - restaurant.positionX;
            const dy = user.positionY - restaurant.positionY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            setDistance(distance);
        };

        if (user.positionX !== undefined && user.positionY !== undefined) {
            calculateDistance();
        }
    }, [user, restaurant]);

    return (
        <div className='col-md-4 mb-4'>
            <div className="card h-100 border border-dark rounded" style={{ width: '18rem' }}>
                <img src={restaurant.imgUrl} className="card-img-top" alt="Restaurant" />
                <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text"><strong>Open:</strong> {restaurant.is_open ? 'Yes' : 'No'}</p>
                    <p className="card-text"><strong>Food Types:</strong> {restaurant.foodTypes.join(', ')}</p>
                    <p className="card-text"><strong>Distance:</strong> {distance} </p>
                    <Link className="btn btn-dark btn-sm" to={"/restaurants/" + restaurant.id}>DETAILS</Link>
                </div>
            </div>
        </div>
    );
}
