import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import StudentNavBar from '../StudentNavBar/StudentNavBar'
import axios from '../../utilities/Axios'
import Cookies from 'universal-cookie'
import ClipLoader from "react-spinners/ClipLoader";
import { cartContext } from '../../contexts/CartContext'
import { useNavigate } from 'react-router-dom'

const baseUrl = process.env.REACT_APP_BASE_URL;

function Cart() {
    const cookies = new Cookies();
    const navigate = useNavigate()
    const { cartLength, setCartLength } = useContext(cartContext)
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const jwtToken = cookies.get("jwt_authorization")

    useEffect(() => {
        getCartItems();

    }, [])

    const getCartItems = async () => {
        const { data } = await axios.get('/student/getCartItems', { headers: { Authorization: `Bearer ${jwtToken}` } });
        setCartLength(data.cartData.length)
        setCartItems(data.cartData)
        setLoading(false);
    }

    const deleteItem = (cartItemId) => {
        axios.post('/student/deleteItem', { cartItemId }, { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
            alert("Equipment removed from cart.")
            setCartLength(cartLength - 1)
            getCartItems();
        });
    }

    const changeQuantity = (quantity, equipmentId) => {
        axios.put('/student/updateQuantity/' + equipmentId, { quantity }, { headers: { Authorization: `Bearer ${jwtToken}` } }).then(async (result) => {
            if (result.data.status) {
                getCartItems();
            }
            else{
                alert(result.data.message)
            }
        })
    }

    const confirmOrder = () => {
        axios.post('/student/confirmOrder', { cartItems: cartItems.map((cartItem) => ({ equipment: cartItem.equipment._id, quantity: cartItem.quantity })), student: cartItems[0].user }, { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
            alert(result.data.message);
            navigate('/student/myEquipments');
        })
    }

    return (
        <div>
            <StudentNavBar />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <h2 className="text-center cart-title"><span className="first-letter">M</span>Y <span className="first-letter">C</span>ART</h2>
                    {(cartItems.length > 0) ? <div className="col-12 text-center mt-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((rowData) => (
                                    <tr>
                                        <td><img style={{ width: "6rem", height: "4rem", objectFit: "contain" }} src={baseUrl + '/images/' + rowData.equipment.filename} alt={rowData.equipment.filename} /></td>
                                        <td><button type="button" className="btn btn-outline-primary" onClick={() => changeQuantity(-1, rowData.equipment._id)}>-</button><span style={{ fontSize: "larger", fontWeight: "bold" }}> {rowData.quantity} </span><button type="button" className="btn btn-outline-primary" onClick={() => changeQuantity(1, rowData.equipment._id)}>+</button></td>
                                        <td><button type="button" className="btn btn-danger" onClick={() => deleteItem(rowData._id)}>Remove</button></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><button type="button" className="btn cart-confirm-btn" onClick={confirmOrder}>Confirm</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> : (loading ? <ClipLoader color="#4c00b4" size={80} cssOverride={{ marginTop: "15%" }} /> : <h4 className='text-center' style={{ marginTop: "10%" }}>Your cart is empty.</h4>)}

                </div>
            </div>
        </div>
    )
}

export default Cart