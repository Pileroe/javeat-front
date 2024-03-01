import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useAtom } from 'jotai';
import { currentUser } from "../../App";
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(currentUser);
    const isUserNotEmpty = Object.keys(user).length > 0;

    function logOut() {
        setUser({});
        localStorage.setItem('user', JSON.stringify({}));
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg justify-content-between" style={{ backgroundColor: "#000000", height: "150px" }}>
            <div className="container-fluid">
                <div className="navbar-brand-container">
                    <Link to="/" className="navbar-brand">
                        <img src="https://cdn.discordapp.com/attachments/1211972312690069504/1213091514042028073/final.png?ex=65f43683&is=65e1c183&hm=9ab0c4f65d0c2ae426bab753481a4e6ee5927d8bb367ca42bb23f0d00a8ea2b9&" alt="Logo" height="180" />
                    </Link>
                </div>
                <div className="navbar-nav">
                    {!isUserNotEmpty ? (
                        <Link className="nav-link text-white fst-italic fw-semibold fs-5" to="user/login">Login</Link>
                    ) : (
                        <>
                            <Link className="nav-link text-white fst-italic fw-semibold fs-5" to="/my-orders">My Orders</Link>
                            <button className="btn btn-danger ms-2" onClick={logOut}>Log Out</button>
                        </>
                    )}
                    <Link className="nav-link ms-2 text-white fst-italic fw-semibold fs-5" to="/allrestaurants">All Restaurants</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


