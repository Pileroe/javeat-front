import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { currentUser } from '../../App';

const RestaurantForm = () => {
    const [user] = useAtom(currentUser);
    const [restaurantId, setRestaurantId] = useState(null);
    const [restaurant, setRestaurant] = useState({
        id: '',
        phone: '',
        imgUrl: '',
        name: '',
        openingHour: '',
        closingHour: '',
        positionX: '',
        positionY: '',
        maxDeliveryDistance: '',
        deliveryPricePerUnit: '',
        foodTypes: [],
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user && user.ownerId) {
            setRestaurantId(user.ownerId);
        }
    }, [user]);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await axios.get(`/restaurants/${user.ownerId}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Failed to fetch restaurant data', error);
            }
        };

        if (restaurantId) {
            fetchRestaurantData();
        }
    }, [restaurantId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const handleFoodTypesChange = (e) => {
        const { options } = e.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setRestaurant({ ...restaurant, foodTypes: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/restaurants/${restaurant.id}`, restaurant);
            console.log('Restaurant updated successfully', response.data);
            setIsEditing(false); 
        } catch (error) {
            console.error('Failed to update restaurant', error);
        }
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="container mt-5">
            <h2>{isEditing ? 'Edit Restaurant' : 'Restaurant Details'}</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    {Object.keys(restaurant).map((key) => (
                        <div key={key} className="mb-3">
                            <label htmlFor={key} className="form-label">{key}</label>
                            <input
                                type="text"
                                className="form-control"
                                id={key}
                                name={key}
                                value={restaurant[key]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            ) : (
                <div>
                    {Object.keys(restaurant).map((key) => (
                        <div key={key} className="mb-3">
                            <strong>{key}:</strong> {restaurant[key]}
                        </div>
                    ))}
                    <button onClick={handleToggleEdit} className="btn btn-primary">Edit</button>
                </div>
            )}
        </div>
    );
};

export default RestaurantForm;