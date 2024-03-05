import React, { useState } from 'react';

const RestaurantForm = () => {
    const [restaurant, setRestaurant] = useState({
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(restaurant);
        // Submit logic here
    };

    return (
        <div className="container mt-5">
            <h2>Restaurant Form</h2>
            <form onSubmit={handleSubmit}>
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
                {/* Add more input fields for other properties here */}
                <div className="mb-3">
                    <label htmlFor="foodTypes" className="form-label">Food Types</label>
                    <select multiple className="form-control" id="foodTypes" name="foodTypes" onChange={handleFoodTypesChange}>
                        {/* Populate options based on your needs */}
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Indian">Indian</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default RestaurantForm;
