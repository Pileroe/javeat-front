import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function Homepage() {
    return (
        <>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://th.bing.com/th/id/R.6f2f30ab499ab3e654f61f9663c497dc?rik=J00Xl5jFNCNvUA&pid=ImgRaw&r=0" style={{height:"85vh"}}  className="d-block w-100" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cmx.weightwatchers.com/assets-proxy/weight-watchers/image/upload/v1594406683/visitor-site/prod/ca/burgers_mobile_my18jv" style={{height:"85vh"}} className="d-block w-100" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://th.bing.com/th/id/R.a3542c1f8f97436db2603c2eabb01e16?rik=4mNdW4e54zigmg&riu=http%3a%2f%2fwww.scattidigusto.it%2fwp-content%2fuploads%2f2016%2f07%2fpizza-Sorbillo-pesto-Nonna-Carolina.jpg&ehk=pE4koIL931w0nOtgk2Df3T9QFyz7iqYg6KICdxD4Smo%3d&risl=&pid=ImgRaw&r=0" style={{height:"85vh"}} className="d-block w-100" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
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
        </>
    );
}
