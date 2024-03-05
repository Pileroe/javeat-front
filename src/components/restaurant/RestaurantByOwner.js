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
    }, []);


      return(
        <>
            <div className='mx-4'>
                <div className="card h-100 border border-dark rounded">
                    {restaurant && (
                        <Link to={`/restaurants/${restaurant.id}`}>
                            <img
                                src={restaurant.imgUrl}
                                alt="Restaurant"
                                className="card-img-top"
                                style={{
                                    height: "20vh",
                                    width: "100%",
                                    objectFit: "cover", 
                                    objectPosition: "center" 
                                }}
                            />
                        </Link>
                    )}
                    <div className="card-body">
                        {restaurant && (
                            <>
                                <h5 className="card-title">{restaurant.name}</h5>
                                <p className="card-text"><strong>Open:</strong> {restaurant.is_open ? 'Yes' : 'No'}</p>
                                <p className="card-text"><strong>Food Types:</strong> {restaurant.foodTypes.join(', ')}</p>
                                <p className="card-text"><strong>Distance:</strong> {Math.round(distance)} Km</p>
                                <button type="button" class="btn btn-light">Detail Restaurant</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RestaurantByOwner;
