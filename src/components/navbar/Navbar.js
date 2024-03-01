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
        <nav className="navbar navbar-expand-lg justify-content-between" style={{ backgroundColor: "#000000", height: "100px" }}> 
            <div className="container-fluid m-0 px-5">
            <Link  to="/" className="navbar-brand ">
                    <img src="/finale_maybe.png"alt="Logo" height="200" />
                </Link>
                <div className="navbar-nav ">
                <Link className="nav-link ms-2 text-white fst-italic fw-semibold fs-5" to="/allrestaurants">All Restaurants</Link>
                    {!isUserNotEmpty ? (
                        <Link className="nav-link text-white fst-italic fw-semibold fs-5" to="user/login">Login</Link>
                    ) : (
                        <>
                            <Link className="nav-link text-white fst-italic fw-semibold fs-5" to="/my-orders">My Orders</Link>
                            <button className="btn btn-danger ms-2" onClick={logOut}>Log Out</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


