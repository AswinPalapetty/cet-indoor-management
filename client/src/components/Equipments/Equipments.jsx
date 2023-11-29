import React, { useContext, useEffect, useState } from 'react'
import './Equipments.css'
import StudentNavBar from '../StudentNavBar/StudentNavBar'
import axios from '../../utilities/Axios'
import { cartContext } from '../../contexts/CartContext'
import Cookies from 'universal-cookie'
import {studentContext} from '../../contexts/StudentContext'

const baseUrl = process.env.REACT_APP_BASE_URL;

function Equipments() {
    const [equipments, setEquipments] = useState([]);
    const { cartLength,setCartLength } = useContext(cartContext);
    const cookies = new Cookies();
    const {student} = useContext(studentContext);

    useEffect(() => {
        const jwtToken = cookies.get("jwt_authorization")
        axios.get('/student/getEquipments').then((result) => {
            setEquipments(result.data.equipments)          
        })
        
        // axios.get('/student/getCartItems',{headers:{Authorization:jwtToken}}).then((result)=>{
        //     console.log(result.data.cartData.length);
        //     setCartLength(result.data.cartData.length);
        //     //setCartItems(result.data.cartData)
        // })
    }, [])

    const addToCart = (equipmentId,userId) => {
        axios.post('/student/addToCart',{equipmentId,userId}).then((result)=>{
            if(result.data.cartItem){
                setCartLength(cartLength+1)
                alert(result.data.message)
            }
            else{
                alert(result.data.message)
            }
        })
    }

    return (
        <div>
            <StudentNavBar />
            <div className="container-fluid">
                <div className="row justify-content-center mb-5">
                    <h2 className="text-center equipments-title"><span className="first-letter">E</span>QUIPMENTS</h2>

                    {equipments ? equipments.map((rowData) => (
                            <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
                                <div className="card" style={{ width: "19rem", height: "20rem" }}>
                                    <img src={baseUrl + '/images/' + rowData.filename} className="card-img-top" alt={rowData.filename} style={{ height: "40%", objectFit: "contain" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{rowData.equipment}</h5>
                                        <p className="card-text">
                                            {parseInt(rowData.stock, 10) > 0 ? <small className='text-success'>In Stock</small> : <small className='text-danger'>Out of Stock</small>}<br />
                                            <small className='text-primary-emphasis'><i>Availability : {rowData.stock}</i></small>
                                        </p>
                                        <button type='submit' className="submit btn" onClick={() => addToCart(rowData._id,student._id)}>Add to Cart</button>
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