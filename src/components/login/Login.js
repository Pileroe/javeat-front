import { useAtom } from "jotai";
import { currentUser } from "../../App";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useAtom(currentUser);
    const mailIn = useRef(null);
    const passIn = useRef(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    function handleLogin() {
        const reqBody = {
            mail: mailIn.current.value,
            password: passIn.current.value
        };

        axios.post("/user/login", reqBody)
            .then(resp => {
                if (resp.data) {
                    setUser(resp.data);
                    if(resp.data.owner)
                    
                        navigate("/my-restaurant");
                    
                    else
                        navigate("/allrestaurants");
                } else {
                    setErrorMessage("Mail o Password errati.");
                    setShowErrorPopup(true);
                }
            })
            .catch(error => {
                console.error("An error occurred while logging in:", error);
                setErrorMessage("Mail o Password errati.");
                setShowErrorPopup(true);
            });
    }

    function handleCloseErrorPopup() {
        setShowErrorPopup(false);
    }

    return (
        <body style={{ minHeight: '150vh', backgroundImage: "url('https://cdn.discordapp.com/attachments/1211972312690069504/1212361688813150329/Progetto_senza_titolo-6.png?ex=65f18ecf&is=65df19cf&hm=57230290f233eb9bd2f3fc210141625e60bd328bdca423ff5a35a193de0e7acc&')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <br/><br/><br/><br/><br/><br/>
            <div className="container d-flex justify-content-center align-items-center  ">
                <form>
                    <h2>Accedi</h2>
                    <br/>
                    <div className="mb-">
                        <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email address</strong></label>
                        <input type="email" className="form-control" ref={mailIn} placeholder="Email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                        <input type="password" className="form-control" id="exampleInputPassword1" ref={passIn} placeholder="Password"/>
                    </div>
                    <button type="button" onClick={handleLogin} className="btn btn-warning" style={{ backgroundColor: "#ff6600", color: "#ffffff" }}>Login</button>
                    <Link to="/user/register" ><button type="button" className="btn btn-secondary mx-3" >Registrati</button></Link>
                </form>
            </div>
            {showErrorPopup && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Errore</h5>
                            </div>
                            <div className="modal-body">
                                {errorMessage}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseErrorPopup}>Chiudi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </body>
    );
}
