import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CheckOut from '../Pagamento/CheckOut';
import Restaurant from './Restaurant';

export default function RestaurantDetail() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [fliker, setFliker] = useState('Restaurant');

    useEffect(() => {
        axios.get(`/restaurants/${id}`)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurant details:', error);
            });
    }, [id]);

    function invertFliker(page){
        setFliker(page);
    }


    if (!restaurant) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ backgroundImage: "url(/1back.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '20px', height:"90vh", overflowY: 'auto'  }}>
            {fliker=='Restaurant' &&<Restaurant restaurant={restaurant} invertFliker={invertFliker}/>}
            {fliker=='Checkout' && <CheckOut restaurant={restaurant}/>}
        </div>
    );


}




