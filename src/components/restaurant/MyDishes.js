import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyDishes = (props) => {
    const [dishes, setDishes] = useState([]);

    useEffect(
        () => {
            axios.get(`/dishes/${props.restaurant.id}`)
                .then((response) => {
                    setDishes(response.data);
                }).catch((error) => {

                    console.error('Error fetching dishes:', error);

                });
        },
        [props.flicker]
    );

    // src="/static/burger.jpg"
    return (
        <div className="container-fluid">
            <div className="row">
                {dishes.map((dish) => (
                    <div key={dish.id} className="col-md-6 mb-4">
                        <div className="card flex-column d-flex">
                            <img src="/static/burger.jpg" className="card-img-top w-100" style={{ objectFit: 'cover', height: '200px' }} alt="..." />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-truncate custom-font">{dish.name}</h5>
                                <p className="card-text custom-font">{dish.description}</p>
                                <p className="card-text custom-font"><small className="text-muted">{dish.category}</small></p>
                                <p className="card-text custom-font">Price: ${dish.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>





    );
};

export default MyDishes;
