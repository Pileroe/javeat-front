import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { currentUser } from "../../App";
import { useEffect, useState } from "react";
import axios from "axios";

const RestaurantByOwner = () =>{

    const [user] = useAtom(currentUser);
    const [distance, setDistance] = useState(null);
    const [restaurant,setRestaurant]= useState(null);

    useEffect(() => {
        axios.get(`/restaurants/${user.id}`)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
            });
    }, []);


      return(
        <>
            
        </>
    );
}
export default RestaurantByOwner;