import { useAtom } from "jotai";
import { currentUser } from "../../App";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () =>
{
    const [user,setUser]= useAtom(currentUser);

    const mailIn = useRef(null);
    const passIn = useRef(null);

    let navigate = useNavigate();

    function handlLogin()
    {
        const reqBody = {
            mail : mailIn.current.value,
            password: passIn.current.value
        }

        axios.post("/user/login", reqBody)
        .then(resp => {
            if(resp.data)
            {
                setUser(resp.data);
                navigate("/homepage");
                
            }
            else
            {
                alert('Mail o Password errati.');
            }
        })
        .catch(error =>
            {
              
            });
    }

    return(
        <>
        
        <div className="container d-flex justify-content-center align-items-center vh-10 w-50"style={{ border: "1px solid #ddd", padding: "40px" }}>
            
            <form>
                <h2>Accedi</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" ref={mailIn} placeholder="Email"/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" ref={passIn} placeholder="Password"/>
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button onClick={handlLogin} className="btn btn-primary">Login</button>
                
            </form>
        </div>
        

        </>

    );
}
export default Login;