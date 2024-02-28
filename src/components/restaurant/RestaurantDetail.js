import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DishDetail from '../dish/DishDetail';

export default function RestaurantDetail() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        axios.get(`/restaurants/${id}`)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurant details:', error);
            });
    }, [id]);

    const addToCart = (dish) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === dish.id);
        if (existingItemIndex !== -1) {
            const newCartItems = [...cartItems];
            newCartItems[existingItemIndex].quantity += 1;
            setCartItems(newCartItems);
        } else {
            setCartItems([...cartItems, { ...dish, quantity: 1 }]);
        }
    };

    const removeFromCart = (dishId) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === dishId) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }).filter(item => item.quantity > 0);
        setCartItems(updatedCartItems);
    };

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    };

    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-9">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">{restaurant.name}</h2>
                            <img src={restaurant.img_url} className="card-img-top" alt="Restaurant" />
                            <p className="card-text">Phone: {restaurant.phone}</p>
                            <p className="card-text">Opening Hour: {restaurant.openingHour}</p>
                            <p className="card-text">Closing Hour: {restaurant.closingHour}</p>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Menu</h3>
                            {restaurant.menu.map((dish) => (
                                <div key={dish.id} className="mb-3">
                                    <DishDetail dish={dish} />
                                    <button className="btn btn-primary mr-2" onClick={() => addToCart(dish)}>Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Cart</h4>
                            {cartItems.map((item) => (
                                <div key={item.id} className="mb-2">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span>{item.name}</span>
                                        <span>${item.price * item.quantity}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span>Quantity: {item.quantity}</span>
                                        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <p>Total Price: ${getTotalPrice()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


