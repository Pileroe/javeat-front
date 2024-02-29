import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';

export default function AllRestaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [filters, setFilters] = useState({
        foodTypes: [],
        maxDistance: ''
    });

    const filterRefs = {
        maxDistance: useRef(null)
    };

    useEffect(() => {
        axios.get('/allrestaurants')
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "foodType") {
            const updatedFoodTypes = filters.foodTypes.includes(value) ? filters.foodTypes.filter(type => type !== value) : [...filters.foodTypes, value];
            setFilters(prevFilters => ({
                ...prevFilters,
                foodTypes: updatedFoodTypes
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: value
            }));
        }
    };

    const handleFilter = () => {
        const filteredRestaurants = restaurants.filter(restaurant => {
            const selectedFoodTypes = filters.foodTypes;
            const maxDistance = parseInt(filters.maxDistance);
            const isFoodTypeMatch = selectedFoodTypes.length === 0 || selectedFoodTypes.some(type => restaurant.foodTypes.includes(type));
            const isWithinDistance = !maxDistance || restaurant.distance <= maxDistance;
            return isFoodTypeMatch && isWithinDistance;
        });
        setRestaurants(filteredRestaurants);
    };

    const resetFilter = () => {
        setFilters({
            foodTypes: [],
            maxDistance: ''
        });
        axios.get('/allrestaurants')
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Filter</h5>
                            <div className="mb-3">
                                <label className="form-label">Food Types</label>
                                <div>
                                    {['pizza', 'Hamburger', 'Sushi', 'Barbecue', 'Vegetarian'].map((type, index) => (
                                        <div key={index} className="form-check">
                                            <input className="form-check-input" type="checkbox" id={type} name="foodType" value={type} checked={filters.foodTypes.includes(type)} onChange={handleFilterChange} />
                                            <label className="form-check-label" htmlFor={type}>
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maxDistance" className="form-label">Max Distance (km)</label>
                                <input type="number" className="form-control" id="maxDistance" name="maxDistance" ref={filterRefs.maxDistance} onChange={handleFilterChange} />
                            </div>
                            <button className="btn btn-primary me-2" onClick={handleFilter}>Apply Filter</button>
                            <button className="btn btn-secondary" onClick={resetFilter}>Reset Filter</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {restaurants.map(restaurant => (
                            <div className="col-md-4 mb-4" key={restaurant.id}>
                                <RestaurantCard restaurant={restaurant} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}




