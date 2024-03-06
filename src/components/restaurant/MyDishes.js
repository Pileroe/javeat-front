import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { currentUser } from '../../App';
import Restaurant from './Restaurant';
import { useParams } from 'react-router-dom';

const MyDishes = () => {
    const [dishes, setDishes] = useState([]);
    const {id}=useParams();
   
    useEffect(
        ()=>{
            axios.get(`/dishes/${id}`)
            .then((response)=>{
                setDishes(response.data);
            }).catch((error)=>{

                console.error('Error fetching dishes:', error);

            });
        },
        []
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
