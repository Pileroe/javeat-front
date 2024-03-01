import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import axios from 'axios';

const Navbar = () => {

    
    return (
        <div className="row">
            <nav className="navbar navbar-expand-lg col-12 p-5 justify-content-between" style={{ backgroundColor: "#000000", height: "80px" }}>
                <Link to="/" className="navbar-brand">
                    <img src="https://cdn.discordapp.com/attachments/1211972312690069504/1213058892649467954/White_Car_Food_Delivery_Mobile_App_Logo.png?ex=65f41821&is=65e1a321&hm=6ffa96868b6ce001bfac61aa326628259187d21c43b485289b597db775efc93b&" alt="Logo" height="200" />
                </Link>
                <div className="navbar-nav">
                    <Link className="nav-link btn  text-white mx-auto btn-lg bottoneNav"  to="user/login">LOGIN</Link>
                    <Link className="nav-link btn  text-white mx-auto btn-lg bottoneNav" to="user/register" >REGISTRATI</Link>
                    <Link className="nav-link btn btn-warning text-white mx-auto btn-lg" to="/allrestaurants">ALL RESTAURANTS</Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;