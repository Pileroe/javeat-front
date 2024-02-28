import React from 'react';

export default function Cart({ items }) {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Cart</h4>
                <ul className="list-group">
                    {items.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{item.name}</span>
                            <span className="badge badge-primary badge-pill">${item.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}