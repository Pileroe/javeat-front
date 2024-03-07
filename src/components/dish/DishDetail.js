import React from 'react';

export default function DishDetail({ dish }) {
    return (
            <div className="card-body">
                <h4 className="card-title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{dish.name}</h4>
                <img src={"/static/"+dish.imgUrl} className="card-img-top w-100 pb-2" style={{ objectFit: 'cover', height: '200px' }} alt="..." />
                <p className="card-text"><strong>Category:</strong> {dish.category}</p>
                <p className="card-text"><strong>Price:</strong> ${dish.price}</p>
                {/* <p className="card-text"><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p> */}
            </div>
        
    );
}