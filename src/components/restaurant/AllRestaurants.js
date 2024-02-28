import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';

export default function AllRestaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [filters, setFilters] = useState({
        foodType: '',
        maxDistance: ''
    });
    const filterRefs = {
        foodType: useRef(null),
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
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleFilter = () => {
        setRestaurants(prevRestaurants => [...prevRestaurants]);
    };

    const isShowable = (restaurant) => {
        const { foodType, maxDistance } = filters;

        if (!foodType && !maxDistance) {
            return true;
        }

        if (foodType && !restaurant.food_types.includes(foodType)) {
            return false;
        }

        if (maxDistance && restaurant.distance > parseInt(maxDistance)) {
            return false;
        }

        return true;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Filter</h5>
                            <div className="mb-3">
                                <label htmlFor="foodType" className="form-label">Food Type</label>
                                <input type="text" className="form-control" id="foodType" name="foodType" ref={filterRefs.foodType} onChange={handleFilterChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maxDistance" className="form-label">Max Distance (km)</label>
                                <input type="number" className="form-control" id="maxDistance" name="maxDistance" ref={filterRefs.maxDistance} onChange={handleFilterChange} />
                            </div>
                            <button className="btn btn-primary" onClick={handleFilter}>Apply Filter</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    
                    <div className="row">
                        {restaurants.filter(isShowable).map(restaurant => (
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


