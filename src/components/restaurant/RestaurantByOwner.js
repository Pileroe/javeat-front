// RestaurantByOwner.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { currentUser } from '../../App';
import RestaurantForm from './RestaurantForm';

const RestaurantByOwner = () => {
    const [user] = useAtom(currentUser);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        axios.get(`/restaurants/${user.id}`)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    }, [user]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Restaurant Details</h5>
                            {restaurant && <RestaurantForm initialRestaurant={restaurant} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantByOwner;
