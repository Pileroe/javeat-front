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
                
            }
            else
            {
                alert('Mail o Password errati.');
            }
            navigate("/all-restaurants");
        })
        .catch(error =>
            {
              
            });
    }

    return(
        <>
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
                        <input type="button" onClick={handlLogin} className="btn btn-warning" style={{ backgroundColor: "#ff6600", color: "#ffffff" }} value={"Login"}></input>
                    </form>
                </div>
            </body>

        

        </>

    );
}
export default Login;