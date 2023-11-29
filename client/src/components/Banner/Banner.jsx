import React from 'react'
import './Banner.css'
import indoor1 from '../../images/indoor1.jpg'
import indoor2 from '../../images/indoor2.jpg'
import gym from '../../images/gym.jpg'
function Banner() {
    return (

        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item c-item active" style={{
                    backgroundImage: `linear-gradient(transparent, rgba(37, 37, 37, 0.61), rgb(17, 17, 17)), url(${indoor1})`
                }} data-bs-interval="5000">
                </div>
                <div className="carousel-item c-item" style={{
                    backgroundImage: `linear-gradient(transparent, rgba(37, 37, 37, 0.61), rgb(17, 17, 17)), url(${gym})`
                }} data-bs-interval="5000"></div>
                <div className="carousel-item c-item" style={{
                    backgroundImage: `linear-gradient(transparent, rgba(37, 37, 37, 0.61), rgb(17, 17, 17)), url(${indoor2})`
                }} data-bs-interval="5000"></div>
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