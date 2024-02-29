import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function PageOrder (){

    
    const [expected_arrival, setExpected_arrival] = useState(''); // Stato per l'orario di consegna
    const [notes, setNotes] = useState(''); // Stato per le note
    

    


    useEffect(() => 
    {

        const arrival_time = new Date();// prendo orario corrente
        const orario_formatt = (String(arrival_time.getHours()).padStart(2,'0')) + ":"+(String(arrival_time.getMinutes()).padStart(2,'0'));// formatto hh:mm
    

        setExpected_arrival(orario_formatt);//imposto l'orario corrente in orario formattato
    
    }, 
    []);
    
    const generaOrari= ()=>
    {
        let orari=[];

        for(let hour=0, min=0; hour<24, min<60; hour++, min+=15)
        {
            const ora_formatt= (hour < 10 ? '0' : '')(hour);
            const min_formatt= (min < 10 ? '0' : '')(min);

            orari.push(ora_formatt+":"+min_formatt);
        }
        return orari;  
        
    }


    let navigate = useNavigate();
    

    const handelArrival = (event) =>
    {
        setExpected_arrival(event.target.value);
    };

    const handleNotesChange = (event) =>
    {
        setNotes(event.target.value);
    };  

    const handleSubmit = (event) =>
    {
        event.preventDefault();
        navigate('/checkout');
    }

   
    return(
        <>
        
            <div style={{ minHeight: '150vh', backgroundImage: "url('https://cdn.discordapp.com/attachments/1211972312690069504/1212361688813150329/Progetto_senza_titolo-6.png?ex=65f18ecf&is=65df19cf&hm=57230290f233eb9bd2f3fc210141625e60bd328bdca423ff5a35a193de0e7acc&')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
               <br/><br/><br/><br/><br/><br/>
                <div className="container d-flex justify-content-center align-items-center  ">
                    <form>
                        <h2>Seleziona l'orario di consegna</h2>
                        <br/>
                        <select className="form-select" id="orario" value={generaOrari} onChange={handleOrarioChange}>
                            <option selected>Orari di consegna</option>
                            {orariOptions}
                        </select>
                        <div className="mb-3 mt-3">
                            <label htmlFor="exampleInputPassword1" className="form-label"><strong>Notes</strong></label>
                            <input type="notes" className="form-control" id="exampleInputPassword1" value={notes} onChange={handelArrival} placeholder="Notes"/>
                        </div>
                        <input type="button" onSubmit={handleSubmit} className="btn" style={{ backgroundColor: "#ff6600", color: "#ffffff" }} value={"Submit"} />
                    </form>
                </div>
            
            </div>
        </>
    );
}