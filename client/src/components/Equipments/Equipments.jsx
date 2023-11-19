import React, { useContext, useEffect, useState } from 'react'
import './Equipments.css'
import StudentNavBar from '../StudentNavBar/StudentNavBar'
import { baseUrl } from '../../utilities/Constants'
import axios from '../../utilities/Axios'
import { cartContext } from '../../contexts/CartContext'

function Equipments() {
    const [equipments, setEquipments] = useState([]);
    const { cartItems, setCartItems,cartLength,setCartLength } = useContext(cartContext);

    useEffect(() => {
        axios.get('/student/getEquipments').then((result) => {
            setEquipments(result.data.equipments)

            for (const key in result.data.equipments) {
                const newItem = cartItems[result.data.equipments[key].equipment] = [0, result.data.equipments[key]._id]
                setCartItems({ ...cartItems, newItem })
            }
            
        })
    }, [])

    const addToCart = (equipment) => {
        cartItems[equipment][0] = cartItems[equipment][0] + 1
        setCartLength(cartLength+1)
    }

    return (
        <div>
            <StudentNavBar />
            <div className="container-fluid">
                <div className="row justify-content-center mb-5">
                    <h2 className="text-center equipments-title"><span className="first-letter">E</span>QUIPMENTS</h2>

                    {equipments ? equipments.map((rowData) => (
                            <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">

                                {/* Here we add each equipment to cartItems to keep track of cart items*/}

                                <div className="card" style={{ width: "19rem", height: "20rem" }}>
                                    <img src={baseUrl + '/images/' + rowData.filename} className="card-img-top" alt={rowData.filename} style={{ height: "40%", objectFit: "contain" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{rowData.equipment}</h5>
                                        <p className="card-text">
                                            {parseInt(rowData.stock, 10) > 0 ? <small className='text-success'>In Stock</small> : <small className='text-danger'>Out of Stock</small>}<br />
                                            <small className='text-primary-emphasis'><i>Availability : {rowData.stock}</i></small>
                                        </p>
                                        <button type='submit' className="submit btn" onClick={() => addToCart(rowData.equipment)}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        )) : <h3 className='text-center'>Equipments not found.</h3>}

                </div>
            </div>
        </div>
    )
}

export default Equipments