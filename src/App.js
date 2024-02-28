import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import { atom } from 'jotai';
import Register from './components/login/Register';


export const currentUser = atom();
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
