import { useState } from "react";

export default function CheckOut (){

  
    const [pay_method,setPayMethod] = useState(0);

   

    const handleMetodoPagamentoChange = (event) =>
    {
        setPayMethod(event.target.value)
    };

    const handleSubmit =  (event) => 
    {
        event.preventDefault();
        try 
        {
          // Invia i dati del checkout all'API
          
          console.log('Dati di checkout inviati con successo!');
        } 
        catch (error) 
        {
          console.error('Si è verificato un errore durante il checkout:', error);
        }
      };



   

    return(

        <>
            <div style={{ minHeight: '150vh', backgroundImage: "url('https://cdn.discordapp.com/attachments/1211972312690069504/1212361688813150329/Progetto_senza_titolo-6.png?ex=65f18ecf&is=65df19cf&hm=57230290f233eb9bd2f3fc210141625e60bd328bdca423ff5a35a193de0e7acc&')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
               <br/><br/><br/><br/><br/><br/>
                <div className="container d-flex justify-content-center align-items-center  ">
                    <form onSubmit={handleSubmit}>
                    <h2>Checkout</h2>
                    
                        Metodo di pagamento:
                        <select value={pay_method} onChange={handleMetodoPagamentoChange}>
                            <option value="carta">Carta di credito</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </form>
                </div>
            </div>

        </>
    );

}