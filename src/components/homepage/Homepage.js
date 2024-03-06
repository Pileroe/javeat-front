import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Homepage() {
    return (
        <> <div className="restaurant-form-container pt-5" style={{ backgroundImage: "url(/1back.jpg)", backgroundSize: 'cover', color: 'white', padding: '10px',height: '90vh' }}>
            <div className="container mt-5">
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="card">
                                <img src="/slide_1.png" className="card-img-top" alt="First slide" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card">
                                <img src="/slide_2.png" className="card-img-top" alt="Second slide" />
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="card">
                                <img src="/slide_3.png" className="card-img-top" alt="Third slide" />
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            </div>
        </>
    );
}


