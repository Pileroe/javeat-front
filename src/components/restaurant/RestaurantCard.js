import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { currentUser } from '../../App';

export default function RestaurantCard({ restaurant }) {
    const [user] = useAtom(currentUser);
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        const calculateDistance = () => {
            const dx = user.positionX - restaurant.positionX;
            const dy = user.positionY - restaurant.positionY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            setDistance(distance);
        };

        if (user.positionX !== undefined && user.positionY !== undefined) {
            calculateDistance();
        }
    }, [user, restaurant]);

    return (
        <div className='mx-0'>
            <div className="card h-100 border border-dark rounded  border border-0">
                <Link to={`/restaurants/${restaurant.id}`}>
                    <img
                        src={"/static/" + restaurant.imgUrl}
                        alt="Restaurant"
                        className="card-img-top"
                        style={{
                            height: "20vh",
                            width: "100%",
                            objectFit: "cover",
                            objectPosition: "center"
                        }}
                    />
                </Link>
                <div className="card-body" style={{ background: '#d9d9d9' }}>
                    <h3 className="card-title" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><strong>{restaurant.name}</strong></h3>
                    {/* non restituire che non sono aperti */}
                    <p className="card-text"><strong>Open:</strong> {restaurant.is_open ? 'Yes' : 'No'}</p>
                    <p className="card-text" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        <strong>Food Types:</strong> {restaurant.foodTypes.join(', ')}
                    </p>
                    <p className="card-text"><strong>Distance:</strong> {Math.round(distance)} Km</p>
                </div>
            </div>
        </div>
    );
}
