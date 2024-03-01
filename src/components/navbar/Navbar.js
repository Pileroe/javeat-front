import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useAtom } from 'jotai';
import { currentUser } from "../../App";
import axios from 'axios';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(currentUser);
    const isUserNotEmpty = Object.keys(user).length > 0;

    function logOut() {
        setUser({});
        localStorage.setItem('user', JSON.stringify({}));
        navigate("/");
        // Aggiorna il localStorage direttamente
    }

    return (
        <div className="row">
            <nav className="navbar navbar-expand-lg col-12 p-5 justify-content-between" style={{ backgroundColor: "#fbfbfb", height: "80px" }}>
                <Link to="/" className="navbar-brand">
                    <img src="https://cdn.discordapp.com/attachments/1211972312690069504/1212065840694952017/9171171b-36ac-4796-8f2e-e1f97bf276e1.png?ex=65f07b47&is=65de0647&hm=44281128b2b1c67c51a380dddb53966a6e22180dcaf9790cc05f8432937ca93e&" alt="Logo" height="200" />
                </Link>
                <div className="navbar-nav">
                    {!isUserNotEmpty && (
                        <>
                            <Link className="btn text-black btn-lg bottoneNav" to="user/login">LOGIN</Link>
                        </>
                    )
                    }

                    <Link className="btn btn-lg bottoneNav ms-2" to="/allrestaurants">ALL RESTAURANTS</Link>
                    {isUserNotEmpty && (
                        <li className="nav-item">
                            {/* <Link className="text-white nav-link active" to="/" onClick={logOut}>Seal image</Link> */}
                            <Link to="" className="navbar-brand">
                                <div
                                    
                                    onClick={logOut}
                                > Log Out</div>
                            </Link>
                        </li>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;