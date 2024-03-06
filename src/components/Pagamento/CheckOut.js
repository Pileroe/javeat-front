import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate da react-router-dom
import { currentOrder } from '../../App';

const CheckOut = ({ restaurant }) => {
    const navigate = useNavigate(); // Ottieni la funzione di navigazione
    const [order, setOrder] = useAtom(currentOrder);
    const [editedOrder, setEditedOrder] = useState({ dishes: new Map(), ...order});
    const [dishesDetails, setDishesDetails] = useState([]);

    useEffect(() => {
        const menu = restaurant.menu;
        const details = Array.from(editedOrder.dishes.entries()).map(([id, quantity]) => {
            const dishDetail = menu.find(dish => dish.id === parseInt(id));
            return { ...dishDetail, quantity };
        });

        setDishesDetails(details);
    }, [editedOrder.dishes, restaurant.menu]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedOrder({ ...editedOrder, [name]: value });
    };

    const handleDishChange = (id, newQuantity) => {
        const updatedDishes = new Map(editedOrder.dishes);
        updatedDishes.set(parseInt(id, 10), parseInt(newQuantity, 10));
        setEditedOrder({ ...editedOrder, dishes: updatedDishes });
    };

    const mapDishesToObject = (dishesMap) => {
        const obj = {};
        dishesMap.forEach((quantity, id) => {
            obj[id] = quantity;
        });
        return obj;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const orderToSubmit = {
            ...editedOrder,
            dishes: mapDishesToObject(editedOrder.dishes),
        };
    
        try {
            const response = await axios.post('/deliveries', orderToSubmit);
            if (response.status === 200) {
                navigate('/my-orders');
            } else {
                console.error('Errore nell\'invio dell\'ordine:', response.statusText);
            }
        } catch (error) {
            console.error('Errore nell\'invio dell\'ordine:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Note dell'ordine</label>
                    <textarea className="form-control" name="notes" value={editedOrder.notes} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label>Metodo di pagamento</label>
                    <select className="form-control" name="paymentMethod" value={editedOrder.paymentMethod} onChange={handleChange}>
                        <option value="card">Carta di Credito/Debito</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash">Contanti alla consegna</option>
                    </select>
                </div>
                {dishesDetails.map((dish, index) => (
                    <div key={index} className="mb-3">
                        <label>{dish.name} - {dish.price}€ x {dish.quantity}</label>
                        <input
                            type="number"
                            className="form-control"
                            value={dish.quantity}
                            onChange={(e) => handleDishChange(dish.id, e.target.value)}
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-success">Invia Ordine</button>
            </form>
        </div>
    );
};

export default CheckOut;
