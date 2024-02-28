import React from 'react';

export default function Cart({ items }) {
    return (
        <div>
            <h3>Cart</h3>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - {item.price}</li>
                ))}
            </ul>
        </div>
    );
}