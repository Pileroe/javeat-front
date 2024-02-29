import { useState } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { currentOrder } from "../../App";


export default function PageOrder (){

    
    const [expected_arrival, setExpected_arrival] = useState(''); // Stato per l'orario di consegna
    const [messageNotes, setMessageNotes] = useState(''); // Stato per le note
    const [order,setOrder] = useAtom(currentOrder);
    
    


    function generateTimeSlots(closingTime) 
    {
        const slots = [];
        const now = new Date();
        const [closingHour, closingMinute] = closingTime.split(':').map(Number);
        const closingDate = new Date(now);
        closingDate.setHours(closingHour, closingMinute, 0, 0);
      
        let slot = new Date(now);
        // Arrotonda al quarto d'ora successivo
        slot.setMinutes(Math.ceil(slot.getMinutes() / 15) * 15, 0, 0);
      
        while (slot < closingDate) 
        {
          slots.push(slot.toTimeString().substring(0, 5));
          slot = new Date(slot.getTime() + 15 * 60 * 1000); // Aggiunge 15 minuti
        }
      
        return slots;
    }


    let navigate = useNavigate();
    

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
        navigate('/checkOut');
    }

    const handleOrarioChange = (event) =>
    {
        setExpected_arrival(event.target.value);
        setOrder({...order,expected_arrival:event.target.value});
    }

   console.log(order);
    return(
        <>
        
            <div style={{ minHeight: '150vh', backgroundImage: "url('https://cdn.discordapp.com/attachments/1211972312690069504/1212361688813150329/Progetto_senza_titolo-6.png?ex=65f18ecf&is=65df19cf&hm=57230290f233eb9bd2f3fc210141625e60bd328bdca423ff5a35a193de0e7acc&')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
               <br/><br/><br/><br/><br/><br/>
                <div className="container d-flex justify-content-center align-items-center  ">
                    <form>
                        <h2>Seleziona l'orario di consegna</h2>
                        <br/>
                        <select className="form-select" id="orario" value={expected_arrival} onChange={handleOrarioChange}>
                            <option value="" disabled>Orari di consegna</option>
                                    {generateTimeSlots('18:00').map((time, index) => (
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