import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="row">
            <nav className="navbar navbar-expand-lg col-12 p-5 justify-content-between mb-5" style={{ backgroundColor: "#1c100b", height: "70px" }}>
                <Link to="/" className="navbar-brand">
                    <img src="https://cdn.discordapp.com/attachments/1211972312690069504/1212065840694952017/9171171b-36ac-4796-8f2e-e1f97bf276e1.png?ex=65f07b47&is=65de0647&hm=44281128b2b1c67c51a380dddb53966a6e22180dcaf9790cc05f8432937ca93e&" alt="Logo" height="95" />
                </Link>
                <div className="navbar-nav">
                    <Link className="nav-link btn btn-warning text-white mx-auto btn-lg" to="user/login">LOGIN</Link>
                    <Link className="nav-link btn btn-warning text-white mx-auto btn-lg"to="user/register" >REGISTRATI</Link>
                    <Link className="nav-link btn btn-warning text-white mx-auto btn-lg" to="/all-restaurants">ALL RESTAURANTS</Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;