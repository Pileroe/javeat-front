import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';

export default function AllRestaurants({ restaurants }) {
    const [filterFoodType, setFilterFoodType] = useState('');
    const [filterDistance, setFilterDistance] = useState('');

    const filterByFoodType = (restaurant) => {
        if (!filterFoodType) return true;
        return restaurant.foodTypes.includes(filterFoodType);
    };

    const filterByDistance = (restaurant) => {
        if (!filterDistance) return true;
        return restaurant.distance <= parseInt(filterDistance);
    };

    const filteredRestaurants = restaurants.filter(filterByFoodType).filter(filterByDistance);

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
            <div className="row">
                {filteredRestaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}