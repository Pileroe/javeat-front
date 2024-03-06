import { useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { currentOrder } from "../../App";


export default function PageOrder ({ restaurant, invertFliker }){

    const [expected_arrival, setExpected_arrival] = useState('');
    const [messageNotes, setMessageNotes] = useState('');
    const [order,setOrder] = useAtom(currentOrder);
    
    function generateTimeSlots(closingHour) {
        const slots = [];
        const now = new Date();
        const closingDate = new Date(now);
        closingDate.setHours(closingHour, 0, 0, 0); 
    
        let slot = new Date(now);
        slot.setMinutes(Math.ceil(slot.getMinutes() / 15) * 15, 0, 0);
    
        while (slot < closingDate) {
            slots.push(slot.toTimeString().substring(0, 5));
            slot = new Date(slot.getTime() + 15 * 60 * 1000);
        }
    
        return slots;
    }

    const handleNotesChange = (event) =>
    {
        if (event.target && event.target.value !== undefined)
        { 
            setMessageNotes(event.target.value);
            
            setOrder({...order,notes:event.target.value});
        }
        
    };  

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        invertFliker('Checkout');
    }

    const handleOrarioChange = (event) =>
    {
        setExpected_arrival(event.target.value);
        setOrder({...order,expected_arrival:event.target.value});
    }

    return(
        <>
        
            <div style={{ minHeight: '150vh', backgroundSize: 'cover', backgroundPosition: 'center'}}>
               <br/><br/><br/><br/><br/><br/>
                <div className="container d-flex justify-content-center align-items-center  ">
                    <form>
                        <h2>Seleziona l'orario di consegna</h2>
                        <br/>
                        <select className="form-select" id="orario" value={expected_arrival} onChange={handleOrarioChange}>
                            <option value="" disabled>Orari di consegna</option>
                                    {generateTimeSlots(restaurant.closingHour).map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                        <div className="mb-3 mt-3">
                            <label htmlFor="exampleInputPassword1" className="form-label"><strong>Notes</strong></label>
                            <input type="text" className="form-control" id="exampleInputPassword1" value={messageNotes} onChange={handleNotesChange} placeholder="Notes"/>
                        </div>
                        <input type="submit" onClick={handleSubmit} className="btn" style={{ backgroundColor: "#ff6600", color: "#ffffff" }} value={"Submit"} />
                    </form>
                </div>
            
            </div>
        </>
    );
}