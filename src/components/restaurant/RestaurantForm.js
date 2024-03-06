import React, { useState } from 'react';
import axios from 'axios';
import { currentUser } from '../../App';
import { useAtom } from 'jotai';

const RestaurantForm = ({ initialRestaurant }) => {
    const [restaurant, setRestaurant] = useState(initialRestaurant);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenChecked, setIsOpenChecked] = useState(false);
    const [user] = useAtom(currentUser);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "foodTypes") {
            // Converti la stringa di input in un array, dividendo per la virgola
            const arrayValue = value.split(',').map(item => item.trim()); // Rimuove gli spazi bianchi all'inizio e alla fine di ogni elemento
            setRestaurant({ ...restaurant, [name]: arrayValue });
        } else {
            // Per tutti gli altri campi, usa il comportamento predefinito
            setRestaurant({ ...restaurant, [name]: value });
        }
    };

    const useEffect = async (e) => {
        e.preventDefault();
        try {
            const updatedRestaurant = { ...restaurant, id: user.id };
            const response = await axios.get(`/restaurants/${restaurant.id}`, updatedRestaurant);
            console.log('Restaurant updated successfully', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update restaurant', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/ristoranti`, restaurant);
            console.log('Restaurant updated successfully', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update restaurant', error);
        }
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleIsOpenChange = (e) => {
        setIsOpenChecked(e.target.checked);
        setRestaurant({ ...restaurant, isOpen: e.target.checked });
    };

    return (
        <div className="container mt-5">
            <h2>{isEditing ? 'Edit Restaurant' : 'Restaurant Details'}</h2>
            {isEditing ? (
                <form onSubmit={useEffect}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={restaurant.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="openingHour" className="form-label">Opening Hour</label>
                        <input
                            type="text"
                            className="form-control"
                            id="openingHour"
                            name="openingHour"
                            value={restaurant.openingHour}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="closingHour" className="form-label">Closing Hour</label>
                        <input
                            type="text"
                            className="form-control"
                            id="closingHour"
                            name="closingHour"
                            value={restaurant.closingHour}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="foodTypes" className="form-label">Food Types</label>
                        <input
                            type="text"
                            className="form-control"
                            id="foodTypes"
                            name="foodTypes"
                            value={Array.isArray(restaurant.foodTypes) ? restaurant.foodTypes.join(', ') : ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={restaurant.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imgUrl" className="form-label">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imgUrl"
                            name="imgUrl"
                            value={restaurant.imgUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="maxDeliveryDistance" className="form-label">Max Delivery Distance</label>
                        <input
                            type="text"
                            className="form-control"
                            id="maxDeliveryDistance"
                            name="maxDeliveryDistance"
                            value={restaurant.maxDeliveryDistance}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isOpen" className="form-label">Is Open</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isOpen"
                            name="isOpen"
                            checked={isOpenChecked}
                            onChange={handleIsOpenChange}
                        />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary">Update</button>
                </form>
            ) : (
                <div>
                    <div className="mb-3">
                        <strong>Name:</strong> {restaurant.name}
                    </div>
                    <div className="mb-3">
                        <strong>Opening Hour:</strong> {restaurant.openingHour}
                    </div>
                    <div className="mb-3">
                        <strong>Closing Hour:</strong> {restaurant.closingHour}
                    </div>
                    <div className="mb-3">
                        <strong>Food Types:</strong> {restaurant.foodTypes.join(', ')}
                    </div>
                    <div className="mb-3">
                        <strong>Phone:</strong> {restaurant.phone}
                    </div>
                    <div className="mb-3">
                        <strong>Image URL:</strong> {restaurant.imgUrl}
                    </div>
                    <div className="mb-3">
                        <strong>Max Delivery Distance:</strong> {restaurant.maxDeliveryDistance}
                    </div>
                    <div className="mb-3">
                        <strong>Is Open:</strong> {restaurant.isOpen ? 'Yes' : 'No'}
                    </div>
                    <button onClick={handleToggleEdit} className="btn btn-primary">Edit</button>
                </div>
            )}
        </div>
    );


};

export default RestaurantForm;
