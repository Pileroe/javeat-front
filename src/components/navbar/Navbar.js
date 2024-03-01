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
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid m-0 px-5">
                <Link to="/" className="navbar-brand">
                    <img src="https://cdn.discordapp.com/attachments/1211972312690069504/1212065840694952017/9171171b-36ac-4796-8f2e-e1f97bf276e1.png?ex=65f07b47&is=65de0647&hm=44281128b2b1c67c51a380dddb53966a6e22180dcaf9790cc05f8432937ca93e&" alt="Logo" height="60" />
                </Link>
                <div className="navbar-nav ms-auto">
                    <Link className="nav-link ms-2" to="/allrestaurants">All Restaurants</Link>
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


