import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { currentOrder, currentU } from '../../App';
import DishDetail from '../dish/DishDetail';

export default function Restaurant({ restaurant, invertFliker }) {
    const [order, setOrder] = useAtom(currentOrder);
    const [user] = useAtom(currentU);
    const [cartItems, setCartItems] = useState(new Map());

    useEffect(() => {
        setOrder({ ...order, idRestaurant: restaurant.id, idUser: user.id });
    }, [order, restaurant.id, setOrder, user.id]);

    const addToCart = (dish) => {
        const updatedCartItems = new Map(cartItems);
        const quantity = updatedCartItems.get(dish.id) || 0;
        updatedCartItems.set(dish.id, quantity + 1);
        setCartItems(updatedCartItems);
    };

    const removeFromCart = (dishId) => {
        const updatedCartItems = new Map(cartItems);
        if (updatedCartItems.get(dishId) > 1) {
            updatedCartItems.set(dishId, updatedCartItems.get(dishId) - 1);
        } else {
            updatedCartItems.delete(dishId);
        }
        setCartItems(updatedCartItems);
    };

    const getTotalPrice = () => {
        return [...cartItems].reduce((total, [dishId, quantity]) => {
            const dish = restaurant.menu.find(dish => dish.id === dishId);
            return dish ? total + dish.price * quantity : total;
        }, 0);
    };

    const proceedToCheckout = () => {
        setOrder({ ...order, dishes: cartItems });
        invertFliker('PageOrder');
    };

    return (
        <div className="mx-5 mt-5">
            <div className="row">
                <div className='col-md-2'>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title">Menu</h3>
                            {restaurant.menu.map((dish) => (
                                <div key={dish.id} className="mb-3">
                                    <DishDetail dish={dish} />
                                    {user && Object.keys(user).length > 0 && (<button className="btn btn-primary mr-2" onClick={() => addToCart(dish)}>Add to Cart</button>)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card mb-4 shadow-sm"> {/* Added shadow-sm for a subtle shadow */}
                        {/* Image set to cover the entire top area */}
                        <img src={`/static/${restaurant.imgUrl}`} className="card-img-top" alt="Restaurant" style={{ width: "100%", objectFit: "cover", maxHeight: "40vh" }} />
                        <div className="card-body">
                            <h2 className="card-title">{restaurant.name}</h2>
                            <p className="card-text">Phone: {restaurant.phone}</p>
                            <p className="card-text">Opening Hour: {restaurant.openingHour}</p>
                            <p className="card-text">Closing Hour: {restaurant.closingHour}</p>
                        </div>
                    </div>
                </div>
                {user && Object.keys(user).length > 0 &&
                    (
                        <div className="col-md-3">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h4 className="card-title">Cart</h4>
                                    {[...cartItems].map(([dishId, quantity]) => {
                                        const dish = restaurant.menu.find(dish => dish.id === dishId);
                                        return dish && (
                                            <div key={dishId} className="mb-2">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span>{dish.name}</span>
                                                    <span>${dish.price * quantity}</span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Quantity: {quantity}</span>
                                                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(dishId)}>Remove</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <hr />
                                    <p>Total Price: ${getTotalPrice()}</p>
                                    {cartItems.size > 0 && (
                                        <button className="btn btn-success btn-block" onClick={proceedToCheckout}>Proceed to Checkout</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        </div>
    );
}
