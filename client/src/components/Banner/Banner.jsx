import React from 'react'
import './Banner.css'

function Banner() {
    return (

        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item c-item active" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1579033461380-adb47c3eb938?fit=crop&w=1964&q=100)` }} data-bs-interval="5000">
                </div>
                <div className="carousel-item c-item" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100)` }} data-bs-interval="5000">
                </div>
                <div className="carousel-item c-item" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1612686635542-2244ed9f8ddc?fit=crop&w=2070&q=100)` }} data-bs-interval="5000">
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Banner