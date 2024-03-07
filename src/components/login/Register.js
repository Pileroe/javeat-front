import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [phone,setPhone] = useState('');
  const [positionX,setPositionX] = useState(0);
  const [positionY,setPositionY] = useState(0);
  const [owner,setOwner] = useState(false);

  let navigate = useNavigate();

  function changeInOwner() 
  {

    var checkbox = document.getElementById("flexSwitchCheckDefault");
  
    var isOwner = checkbox.checked;
    setOwner(isOwner);
    
  }
  
  

  const handleRegistration = async (e) => 
  {
    e.preventDefault();
    try {
      const response = await axios.post('/user/register', 
      {
        mail,
        password,
        phone,
        positionX,
        positionY,
        owner
      });
        console.log('Registration successful', response.data);
        navigate('/user/login');
    } catch (error) {
        console.error('Registration failed', error);
    }
  };

  return (
   
    <div className="restaurant-form-container pt-5" style={{ backgroundImage: "url(/1back.jpg)", backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', padding: '20px' }}> 
        <form onSubmit={handleRegistration}>
                <h2>Crea un Account</h2>
                <br/>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input className="form-control" type="text"placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                    <input className="form-control" type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Position X</label>
                    <input className="form-control" type="number" placeholder="Position X" value={positionX} onChange={(e) => setPositionX(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Position Y</label>
                    <input className="form-control" type="number" placeholder="Position Y" value={positionY} onChange={(e) => setPositionY(e.target.value)}/>
                </div>
                <div className="form-check form-switch">
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Sei un ristoratore?</label>
                  <input onClick={changeInOwner} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                </div>
                <button onClick={handleRegistration} className="btn btn-primary">Register</button>   
        </form>
      </div>
  
    
        
  );
};

export default Register;