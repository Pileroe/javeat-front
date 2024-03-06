import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import { useAtom } from "jotai";
import { currentUser } from "../../App";

export default function AllRestaurants() {
    const [user, setUser] = useAtom(currentUser);
    const [restaurants, setRestaurants] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
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

        axios.get('/foodtypes')
        .then(response => {
            setFoodTypes(response.data);
        })
        .catch(error => {
            console.error('Error fetching foodtypes:', error);
        });

        axios.get('/allrestaurants')
            .then(response => {
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
                const updatedFoodTypes = [...prevFilters.foodTypes];
                if (checked) {
                    updatedFoodTypes.push(value);
                } else {
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
                setRestaurants(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    };

    return (
        <div className="restaurant-form-container pt-5" style={{ background: '#FFBF69', backgroundSize: 'cover', backgroundPosition: 'center', color: '', padding: '20px' }}>
        <div className="mt-4 m-4" >
            <div className="row ">
                <div className="col col-lg-2">
                    <div className="card px-2 py-3">
                        <div className="card-body">
                            <h5 className="card-title">Filter</h5>
                            <div className="mb-3">
                                <label className="form-label">Food Types</label>
                                <div>
                                    {foodTypes.map((type, index) => (

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
                            <div className='d-flex '>
                                <button className="btn me-2"style={{backgroundColor: "#2EC4B6"}} onClick={handleFilter}>Apply</button>
                                <button className="btn" style={{backgroundColor: "#2EC4B6"}} onClick={resetFilter}>Reset</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col col-lg-10 px-5">
                <div className="mx-4 mb-4" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontWeight: 'bold' }}>I più amati della tua zona</h1>
                </div>
                    <div className="row">
                        <div className='conteiner-fluid mb-5 col-4' >
                            <img src="/static/2.jpg" className="img-thumbnail  rounded-5" />
                        </div>
                        <div className='conteiner-fluid mb-5 col-4' >

                            <img src="/static/1.jpg" className="img-thumbnail  rounded-5  " />

                        </div>
                        <div className='conteiner-fluid mb-5 col-4' >

                            <img src="/static/3.jpg" className="img-thumbnail  rounded-5" />
                        </div>
                    </div>

                    <div className="row px-1">
                        {restaurants.map(restaurant => (
                            <div className="col col-md-6 col-lg-3 px-4 pb-3" key={restaurant.id}>
                                <RestaurantCard restaurant={restaurant} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}




