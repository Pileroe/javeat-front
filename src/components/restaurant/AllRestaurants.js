import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import { useAtom } from "jotai";
import { currentUser } from "../../App";



export default function AllRestaurants() {
    const [user, setUser] = useAtom(currentUser);
    const [restaurants, setRestaurants] = useState([]);
    const [originalRestaurants, setOriginalRestaurants] = useState([]); //Per memorizzare i dati originali
    const [filters, setFilters] = useState({
        foodTypes: [],
        distance: 1000,
        positionX: user.positionX,
        positionY: user.positionY,
    });

    const filterRefs = {
        distance: useRef(null)
    };

    useEffect(() => {
        axios.get('/allrestaurants')
            .then(response => {
                setOriginalRestaurants(response.data);
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    }, []);

    function handleFilterChange(event) {
        const { name, value, checked } = event.target;

        if (name === 'foodTypes') {
            setFilters(prevFilters => {
                // Crea una copia dell'array corrente dei foodTypes
                const updatedFoodTypes = [...prevFilters.foodTypes];
                if (checked) {
                    // Se il checkbox è stato selezionato, aggiungi il tipo di cibo
                    updatedFoodTypes.push(value);
                } else {
                    // Se il checkbox è stato deselezionato, rimuovi il tipo di cibo
                    const index = updatedFoodTypes.indexOf(value);
                    if (index > -1) {
                        updatedFoodTypes.splice(index, 1);
                    }
                }
                return {
                    ...prevFilters,
                    foodTypes: updatedFoodTypes
                };
            });
        } else if (name === 'distance') {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: parseInt(value, 10)
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: value
            }));
        }
    }

    const handleFilter = () => {
        console.log(filters);
        axios.post('/restaurants', filters)
            .then(response => {
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    }

    const resetFilter = () => {
        setFilters({
            foodTypes: [],
            distance: 1000,
            positionX: user.positionX,
            positionY: user.positionY,
        });
        axios.get('/allrestaurants')
            .then(response => {
                setRestaurants(originalRestaurants);
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
                                            <input className="form-check-input" type="checkbox" id={type} name="foodTypes" value={type} checked={filters.foodTypes.includes(type)} onChange={handleFilterChange} />
                                            <label className="form-check-label" htmlFor={type}>
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="distance" className="form-label">Max Distance (km)</label>
                                <input type="number" className="form-control" id="distance" name="distance" ref={filterRefs.distance} onChange={handleFilterChange} />
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




