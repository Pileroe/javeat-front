import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import AllRestaurants from './components/restaurant/AllRestaurants';
import { atom } from 'jotai';

export const currentUser = atom();

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/all-restaurants" element={<AllRestaurants />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
