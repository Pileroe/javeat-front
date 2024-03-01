import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer =() => {


    return (
    
        <footer class="footer">
        <div class="container">
            <div class="footer-section">
                <h3>Informazioni</h3>
                <ul>
                    <li><a href="#">Chi siamo</a></li>
                    <li><a href="#">Come funziona</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Assistenza</h3>
                <ul>
                    <li><a href="#">Contatti</a></li>
                    <li><a href="#">Assistenza clienti</a></li>
                    <li><a href="#">Mappa del sito</a></li>
                </ul>
            </div>
           
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Just Eat. Tutti i diritti riservati.</p>
        </div>
    </footer>
    );

}

export default Footer;