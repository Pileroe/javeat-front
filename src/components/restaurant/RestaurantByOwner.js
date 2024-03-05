import React from 'react';
import { useAtom } from 'jotai';
import { currentUser } from '../../App'; // Update this import path to where your atoms are defined
import RestaurantForm from './RestaurantForm'; // Ensure this import path matches where your RestaurantForm is defined

const RestaurantByOwner = () => {
    const [user, setUser] = useAtom(currentUser); // This line assumes you have a currentUser atom

    return (
        <div className="container">
            <div className="row">
                <div className="col-6"> {/* This sets the column to take up half of the container's width */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Restaurant Details</h5>
                            {/* Include the RestaurantForm component here */}
                            <RestaurantForm />
                        </div>
                    </div>
                </div>
                {/* If you need another column on the right, add another div.col-6 here */}
            </div>
        </div>
    );
}

export default RestaurantByOwner;