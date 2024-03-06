import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { currentUser } from '../../App';
import RestaurantForm from './RestaurantForm';
import DishForm from './DishForm';
import MyDishes from './MyDishes';

const RestaurantByOwner = () => {
    const [user] = useAtom(currentUser);
    const [restaurant, setRestaurant] = useState(null);
    const [flicker,setFlicker]= useState(false);

    useEffect(() => {
        axios.get(`/restaurantowner/${user.id}`)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    }, [user]);

    function invertFlicker(){
        setFlicker(!flicker);
    }

    return (
        <div className="restaurant-form-container pt-5" style={{ backgroundImage: "url('https://cdn.discordapp.com/attachments/1211972312690069504/1212361688813150329/Progetto_senza_titolo-6.png?ex=65f18ecf&is=65df19cf&hm=57230290f233eb9bd2f3fc210141625e60bd328bdca423ff5a35a193de0e7acc&')", backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '20px' }}>

        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            {restaurant && <RestaurantForm initialRestaurant={restaurant} />}
                        </div>
                    </div>
                    <div className="card mt-5">
                        {restaurant && <DishForm invertFlicker={invertFlicker}/>}
                    </div>
                </div>
                
                <div className="col-6">
                    <div className="card">
                        {restaurant && <MyDishes restaurant={restaurant} flicker={flicker} />}
                    </div>
                </div>
            </div>
        </div>
        </div>

    );
};

export default RestaurantByOwner;