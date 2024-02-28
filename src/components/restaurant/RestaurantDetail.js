import React, { useState } from 'react';
import DishDetail from '../dish/DishDetail';
import Cart from '../cart/Cart';

export default function RestaurantDetail({ restaurant }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (dish) => {
        setCartItems([...cartItems, dish]);
    };

    if (!restaurant) {
        return <p>Restaurant not found</p>;
    }

    return (
        <div>
            <h2>{restaurant.name}</h2>
            <img src={restaurant.img_url} alt="Restaurant" />
            <p>Phone: {restaurant.phone}</p>
            <p>Opening Hour: {restaurant.opening_hour}</p>
            <p>Closing Hour: {restaurant.closing_hour}</p>
            <p>Max Delivery Distance: {restaurant.max_delivery_distance} km</p>
            <p>Delivery Price Per Unit: {restaurant.delivery_price_per_unit}</p>
            <p>Food Types: {restaurant.food_types.join(', ')}</p>
            
            <h3>Menu</h3>
            {restaurant.menu && restaurant.menu.dishes && restaurant.menu.dishes.length > 0 ? (
                restaurant.menu.dishes.map((dish) => (
                    <div key={dish.id}>
                        <DishDetail dish={dish} />
                        <button onClick={() => addToCart(dish)}>Add to Cart</button>
                    </div>
                ))
            ) : (
                <p>No dishes available</p>
            )}

            <Cart items={cartItems} />
        </div>
    );
}