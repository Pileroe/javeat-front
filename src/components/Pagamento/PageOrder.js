import { useState } from "react";
import { useNavigate } from "react-router";


export default function PageOrder (){

    
    const [expected_arrival, setExpected_arrival] = useState(''); // Stato per l'orario di consegna
    const [notes, setNotes] = useState(''); // Stato per le note

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
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Orari di consegna</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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