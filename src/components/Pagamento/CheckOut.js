import React, { useState } from "react";
import { useAtom } from "jotai";
import { currentOrder } from "../../App";
import { currentMenu } from "../../App";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
    const [pay_method, setPayMethod] = useState(0);
    const [order] = useAtom(currentOrder);
    const [menu, setMenu] = useAtom(currentMenu);

    let navigate = useNavigate();

    let dishIdsInOrder = Array.from(order.dishes.keys());

    let listaProd = menu.filter(item => dishIdsInOrder.includes(item.id));
    
    

    const handleMetodoPagamentoChange = (event) => {
        setPayMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            // Invia i dati del checkout all'API
            console.log('Dati di checkout inviati con successo!');
            navigate('/orderfinal');//naviga alla pag Finale

        } catch (error) {
            console.error('Si è verificato un errore durante il checkout:', error);
        }
    };

    const renderOrder = () => {

        return listaProd.map((item) => 
        {
            const quantity = order.dishes.get(item.id) || 0;
            const totalPrice = item.price * quantity;
            return (
                <div key={item.id}>
                    <p>{quantity} {item.name} {totalPrice.toFixed(2)}</p>
                </div>
            );
        });
        
    };

    return (
        <>
            <div style={{ minHeight: '150vh', backgroundImage: "url('https://cdn.discordapp.com/attachments/1211972312690069504/1212361688813150329/Progetto_senza_titolo-6.png?ex=65f18ecf&is=65df19cf&hm=57230290f233eb9bd2f3fc210141625e60bd328bdca423ff5a35a193de0e7acc&')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <br /><br /><br /><br /><br /><br />
                <div className="container d-flex justify-content-center align-items-center  ">
                    <form onSubmit={handleSubmit}>
                        <h2>Checkout</h2>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order Details</h5>
                                {renderOrder()}
                            </div>
                        </div>

                        <br />

                        <div className="form-group">
                            <label htmlFor="metodoPagamento">Metodo di pagamento:</label>
                            <select value={pay_method} onChange={handleMetodoPagamentoChange}>
                            <option value="carta">Carta di credito</option>
                            <option value="paypal">PayPal</option>
                            <option value="contanti">Contanti</option>
                        </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Conferma Ordine</button>
                    </form>
                </div>
            </div>
        </>
    );
}