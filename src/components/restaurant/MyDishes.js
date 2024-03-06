import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyDishes = (props) => {
    const [dishes, setDishes] = useState([]);
    
    useEffect(
        ()=>{
            axios.get(`/dishes/${props.restaurant.id}`)
            .then((response)=>{
                setDishes(response.data);
            }).catch((error)=>{

                console.error('Error fetching dishes:', error);

            });
        },
        [props.flicker]
    );
    return (
        <div>
            {dishes.map((dish) => (
                <div key={dish.id} className="dish-card">
                    <h4>{dish.name}</h4>
                    <p>{dish.description}</p>
                    <p>{dish.category}</p>
                    <p>Price: ${dish.price}</p>
                </div>
            ))}
        </div>
    );
};

export default MyDishes;
