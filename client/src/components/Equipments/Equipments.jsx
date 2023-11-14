import React from 'react'
import './Equipments.css'
import StudentNavBar from '../StudentNavBar/StudentNavBar'

function Equipments() {
    return (
        <div>
            <StudentNavBar />
            <div className="container-fluid">
                <div className="row">
                    <h2 className="text-center equipments-title"><span className="first-letter">E</span>QUIPMENTS</h2>

                    <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Cricket Bat</h5>
                                <p className="card-text">
                                    <small className='text-success'>In Stock</small><br/>
                                    <small className='text-primary-emphasis'><i>Availability : 12</i></small>
                                </p>
                                <button type='submit' className="submit btn">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Cricket Bat</h5>
                                <p className="card-text">
                                    <small className='text-success'>In Stock</small><br/>
                                    <small className='text-primary-emphasis'><i>Availability : 12</i></small>
                                </p>
                                <button type='submit' className="submit btn">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Cricket Bat</h5>
                                <p className="card-text">
                                    <small className='text-success'>In Stock</small><br/>
                                    <small className='text-primary-emphasis'><i>Availability : 12</i></small>
                                </p>
                                <button type='submit' className="submit btn">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                    <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Cricket Bat</h5>
                                <p className="card-text">
                                    <small className='text-success'>In Stock</small><br/>
                                    <small className='text-primary-emphasis'><i>Availability : 12</i></small>
                                </p>
                                <button type='submit' className="submit btn">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Equipments