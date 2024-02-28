import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import AllRestaurants from './components/restaurant/AllRestaurants';
import { atom } from 'jotai';
import Register from './components/login/Register';

import RestaurantDetail from './components/restaurant/RestaurantDetail';

export const currentUser = atom();

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
                    <Route path="/all-restaurants" element={<AllRestaurants />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
