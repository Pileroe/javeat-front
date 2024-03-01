import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (

        <div class="container text-center mt-4">
            <div class="row align-items-center">
                <div class="col">
                <h3>Informazioni</h3>
                    <ul>
                         <li><a href="#">Chi siamo</a></li>
                         <li><a href="#">Come funziona</a></li>
                         <li><a href="#">FAQ</a></li>
                     </ul>
                </div>
                <div class="col">
                <h3>Assistenza</h3>
                     <ul>
                     <li><a href="#">Contatti</a></li>
                     <li><a href="#">Assistenza clienti</a></li>
                     <li><a href="#">Mappa del sito</a></li>
                 </ul>
                </div>
                <div class="col">
                <h3>Seguici su</h3>
                   <ul className="d-flex justify-content-center align-items-center">
                   <a data-v-5c3ede00 data-gtm="engagement|footer|click_follow_facebook" href="" class="link">
                   <img data-v-5c3ede00 alt="Facebook" src="/1.png" class="link-image" style={{ width: "20%", height: "auto" }}/>
                   <a data-v-5c3ede00 data-gtm="engagement|footer|click_follow_facebook" href="" class="link">
                   <img data-v-5c3ede00 alt="Facebook" src="/2.png" class="link-image"style={{ width: "20%", height: "auto" }} />
                   </a>
                   </a>
                </ul>
                </div>
            </div>
            </div>
        // <div className="container">
        // <div className='row col'>
        // <div className="footer">
                     
        //         <div className="footer-section">
        //             <h3>Informazioni</h3>
        //             <ul>
        //                 <li><a href="#">Chi siamo</a></li>
        //                 <li><a href="#">Come funziona</a></li>
        //                 <li><a href="#">FAQ</a></li>
        //             </ul>
        //         </div>
        //         <div className="footer-section">
        //             <h3>Assistenza</h3>
        //             <ul>
        //                 <li><a href="#">Contatti</a></li>
        //                 <li><a href="#">Assistenza clienti</a></li>
        //                 <li><a href="#">Mappa del sito</a></li>
        //             </ul>
        //         </div>
        //         <div className="footer-section">
        //             <div className="footer-bottom">
        //                 <p>&copy; 2024 Just Eat. Tutti i diritti riservati.</p>
        //             </div>
        //         </div>
        //     </div>
        //     </div>
        // </div>
    );
}






export default Footer;