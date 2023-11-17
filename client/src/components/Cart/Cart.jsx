import React from 'react'
import './Cart.css'
import StudentNavBar from '../StudentNavBar/StudentNavBar'

function Cart() {
    return (
        <div>
            <StudentNavBar />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <h2 className="text-center cart-title"><span className="first-letter">M</span>Y <span className="first-letter">C</span>ART</h2>

                    <div className="col-12 text-center mt-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img style={{width:"6rem",height:"4rem"}} src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" alt="" /></td>
                                    <td><button type="button" className="btn btn-outline-primary">-</button><span style={{fontSize :"larger",fontWeight:"bold",marginLeft:"3%",marginRight:"3%"}}> 1 </span><button type="button" className="btn btn-outline-primary">+</button></td>
                                    <td><button type="button" className="btn btn-danger">Remove</button></td>
                                </tr>
                                <tr>
                                    <td><img style={{width:"6rem",height:"4rem"}} src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" alt="" /></td>
                                    <td><button type="button" className="btn btn-outline-primary">-</button><span style={{fontSize :"larger",fontWeight:"bold",marginLeft:"3%",marginRight:"3%"}}> 1 </span><button type="button" className="btn btn-outline-primary">+</button></td>
                                    <td><button type="button" className="btn btn-danger">Remove</button></td>
                                </tr>
                                <tr>
                                    <td><img style={{width:"6rem",height:"4rem"}} src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" alt="" /></td>
                                    <td><button type="button" className="btn btn-outline-primary">-</button><span style={{fontSize :"larger",fontWeight:"bold",marginLeft:"3%",marginRight:"3%"}}> 1 </span><button type="button" className="btn btn-outline-primary">+</button></td>
                                    <td><button type="button" className="btn btn-danger">Remove</button></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><button type="button" className="btn cart-confirm-btn">Confirm</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart