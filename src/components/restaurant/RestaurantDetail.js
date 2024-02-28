import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DishDetail from '../dish/DishDetail';
import Cart from '../cart/Cart';

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
        setCartItems([...cartItems, dish]);
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
                            <p className="card-text">Opening Hour: {restaurant.opening_hour}</p>
                            <p className="card-text">Closing Hour: {restaurant.closing_hour}</p>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Menu</h3>
                            {restaurant.menu && restaurant.menu.dishes && restaurant.menu.dishes.length > 0 ? (
                                restaurant.menu.dishes.map((dish) => (
                                    <div key={dish.id}>
                                        <DishDetail dish={dish} />
                                        <button className="btn btn-primary" onClick={() => addToCart(dish)}>Add to Cart</button>
                                    </div>
                                ))
                            ) : (
                                <p>No dishes available</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Cart</h4>
                            <Cart items={cartItems} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
