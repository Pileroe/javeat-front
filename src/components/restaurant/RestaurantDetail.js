import React from 'react';

export default function RestaurantDetail({ restaurant }) {
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
                    <DishDetail key={dish.id} dish={dish} />
                ))
            ) : (
                <p>No dishes available</p>
            )}
        </div>
    );
}