import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { useAtom } from 'jotai';
import axios from 'axios';
import { currentUser } from '../../App';


const mockRestaurants = [
    {
        id: 1,
        name: "Mock Restaurant 1",
        img_url: "https://example.com/image1.jpg",
        is_open: true,
        food_types: ["Italian", "Mexican"],
        distance: 5
    },
    {
        id: 2,
        name: "Mock Restaurant 2",
        img_url: "https://example.com/image2.jpg",
        is_open: false,
        food_types: ["Japanese", "Chinese"],
        distance: 8
    },
];

export default function AllRestaurants({ restaurants }) 
{
    const [filterFoodType, setFilterFoodType] = useState('');
    const [filterDistance, setFilterDistance] = useState('');
    const [user,setUser] = useAtom(currentUser);

    
   

    const filteredRestaurants = restaurants && restaurants.length > 0
        ? restaurants.filter(filterByFoodType).filter(filterByDistance)
        : [];

    const filterByFoodType = (restaurant) => {
        if (!filterFoodType) return true;
        return restaurant.foodTypes.includes(filterFoodType);
    };

    const filterByDistance = (restaurant) => {
        if (!filterDistance) return true;
        return restaurant.distance <= parseInt(filterDistance);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Food Type"
                    value={filterFoodType}
                    onChange={(e) => setFilterFoodType(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Distance (km)"
                    value={filterDistance}
                    onChange={(e) => setFilterDistance(e.target.value)}
                />
            </div>
            <div className="container">
                <div className="row">
                    {mockRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="col-md-4 mb-4">
                            <RestaurantCard
                                restaurant={{
                                    ...restaurant,
                                    food_types: restaurant.food_types ? restaurant.food_types : []
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="row">
                {filteredRestaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}