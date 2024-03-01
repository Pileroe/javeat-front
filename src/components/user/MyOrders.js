import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { currentUser } from '../../App';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAtom(currentUser);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/myorders/${user.id}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Errore nel recupero degli ordini:', error);
            }
        };

        if (user.id) {
            fetchOrders();
        }
    }, [user]);

    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.delete(`/deliveries/${orderId}`);
            if (response.status === 200) {
                // Rimuovi l'ordine dalla lista degli ordini visualizzati
                setOrders(orders.filter(order => order.id !== orderId));
            } else {
                console.error('Errore nella cancellazione dell\'ordine:', response.statusText);
            }
        } catch (error) {
            console.error('Errore nella cancellazione dell\'ordine:', error);
        }
    };

    return (
        <div className="container">
            <h2>My Orders</h2>
            <div className="row">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Ordine #{order.id}</h5>
                                    <p className="card-text">Note: {order.notes}</p>
                                    <p className="card-text">Metodo di pagamento: {order.paymentMethod}</p>
                                    <p className="card-text">Data di consegna prevista: {order.expectedArrival}</p>
                                    <p className="card-text">Prezzo piatti: {order.dishesPrice}</p>
                                    <p className="card-text">Guadagno del rider: {order.riderRevenue}</p>
                                    <p className="card-text">Prezzo totale: {order.totalPrice}</p>
                                    <p className="card-text">Piatti:</p>
                                    <ul className="list-group">
                                        {order.dishes.map(dish => (
                                            <li key={dish.id} className="list-group-item">
                                                {dish.name} - {dish.price}€ x {dish.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3">
                                        <button onClick={() => cancelOrder(order.id)} className="btn btn-danger me-2">Annulla Ordine</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nessun ordine trovato.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;







