import { useAtom } from "jotai";
import { currentUser } from "../../App";

const Login = (props) =>
{
    const [user,setUser]= useAtom(currentUser);

    

    return(
        <>
        
        <div className="container d-flex justify-content-center align-items-center vh-10 w-50"style={{ border: "1px solid #ddd", padding: "40px" }}>
            
            <form>
                <h2>Accedi</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        

        </>

    );
}
export default Login;