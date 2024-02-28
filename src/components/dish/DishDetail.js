import React from 'react';

export default function DishDetail({ dish }) {
    return (
        <div>
            <h4>{dish.name}</h4>
            <p>Category: {dish.category}</p>
            <p>Price: ${dish.price}</p>
            <p>Ingredients: {dish.ingredients.join(', ')}</p>
        </div>
    );
}