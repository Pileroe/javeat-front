import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importa useParams per ottenere i parametri dall'URL
import DishDetail from '../dish/DishDetail';
import Cart from '../cart/Cart';

export default function RestaurantDetail() {
    const { id } = useParams(); // Ottieni l'ID del ristorante dall'URL
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
        <div>
            <h2>{restaurant.name}</h2>
            <img src={restaurant.img_url} alt="Restaurant" />
            <p>Phone: {restaurant.phone}</p>
            <p>Opening Hour: {restaurant.opening_hour}</p>
            <p>Closing Hour: {restaurant.closing_hour}</p>
            {/* <p>Max Delivery Distance: {restaurant.max_delivery_distance} km</p>
            <p>Delivery Price Per Unit: {restaurant.delivery_price_per_unit}</p> */}
            {/* <p>Food Types: {restaurant.food_types.join(', ')}</p> */}
            
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
