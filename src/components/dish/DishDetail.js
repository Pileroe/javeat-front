import React from 'react';

export default function DishDetail({ dish }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h4 className="card-title">{dish.name}</h4>
                <p className="card-text"><strong>Category:</strong> {dish.category}</p>
                <p className="card-text"><strong>Price:</strong> ${dish.price}</p>
                <p className="card-text"><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p>
            </div>
        </div>
    );
}