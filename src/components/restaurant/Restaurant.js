import React, { useState, useEffect, useRef } from 'react';
import { currentOrder, currentU } from '../../App';
import { useAtom } from 'jotai';
import DishDetail from '../dish/DishDetail';

export default function Restaurant({ restaurant, invertFliker }) {

    const [order, setOrder] = useAtom(currentOrder);
    const [user] = useAtom(currentU);
    const [cartItems, setCartItems] = useState(new Map());
    const isUserNotEmpty = Object.keys(user).length > 0;
    // const isOwner = isUserNotEmpty && user.owner;

    useEffect(() => {
        setOrder({ ...order, idRestaurant: restaurant.id, idUser: user.id });
    }, []);


    const addToCart = (dish) => {
        const updatedCartItems = new Map(cartItems);
        const quantity = updatedCartItems.get(dish.id) || 0;
        updatedCartItems.set(dish.id, quantity + 1);
        setCartItems(updatedCartItems);
    };

    const removeFromCart = (dishId) => {
        const updatedCartItems = new Map(cartItems);
        const quantity = updatedCartItems.get(dishId) || 0;
        if (quantity > 1) {
            updatedCartItems.set(dishId, quantity - 1);
        } else {
            updatedCartItems.delete(dishId);
        }
        setCartItems(updatedCartItems);
    };

    const getTotalPrice = () => {
        let totalPrice = 0;
        for (let [dishId, quantity] of cartItems) {
            const dish = restaurant.menu.find(dish => dish.id === dishId);
            if (dish) {
                totalPrice += dish.price * quantity;
            }
        }
        return totalPrice;
    };

    const proceedToCheckout = () => {
        setOrder({ ...order, dishes: cartItems });
        invertFliker('PageOrder');
    };

    return (
        <div className="container mt-5 ">
            <div className="row">
                <div className="col-md-9">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">{restaurant.name}</h2>
                            <img src={restaurant.imgUrl} className="card-img-top" alt="Restaurant" style={{ height: "30vh", width: "auto" }} />
                            <p className="card-text">Phone: {restaurant.phone}</p>
                            <p className="card-text">Opening Hour: {restaurant.openingHour}</p>
                            <p className="card-text">Closing Hour: {restaurant.closingHour}</p>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h3 className="card-title">Menu</h3>
                            {restaurant.menu.map((dish) => (
                                <div key={dish.id} className="mb-3">
                                    <DishDetail dish={dish} />
                                    {isUserNotEmpty && (<button className="btn btn-primary mr-2" onClick={() => addToCart(dish)}>Add to Cart</button>)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isUserNotEmpty &&
                    (
                        <div className="col-md-3">
                            <div className="card">
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
                                                <div className="d-flex justify-content-between align-items-center mb-1">
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
    );
}