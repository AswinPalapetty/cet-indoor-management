import React, { useEffect, useState } from 'react'
import './ManageRentals.css'
import StaffNavBar from '../StaffNavBar/StaffNavBar'
import axios from '../../utilities/Axios'
import Cookies from 'universal-cookie'
import ClipLoader from "react-spinners/ClipLoader";

const baseUrl = process.env.REACT_APP_BASE_URL;

function ManageRentals() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const cookies = new Cookies();
    const jwtToken = cookies.get("jwt_staff_authorization")

    useEffect(() => {
        axios.get('/staff/orders', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
            console.log(result);
            setOrders(result.data)
            setLoading(false)
        })
    }, [])
    return (
        <div>
            <StaffNavBar />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <h2 className="text-center manage-rentals-title"><span className="first-letter">M</span>ANAGE <span className="first-letter">R</span>ENTALS</h2>
                    <div className="col-12 text-center mt-4">
                        {(orders.length > 0) ? <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Student</th>
                                    <th scope="col">Admission No.</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope='col'>Commencement of Rental</th>
                                    <th scope='col'>Due Date</th>
                                    <th scope='col'>Fine</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'></th>
                                </tr>
                                {orders.map((item) => {
                                    const dueDateObject = new Date(item.dueDate);
                                    const orderDateObject = new Date(item.orderDate);
                                    item.dueDate = dueDateObject.toLocaleDateString("en-GB");
                                    item.orderDate = orderDateObject.toLocaleDateString("en-GB")

                                    return (<tr>
                                        <td>{item.student.name}</td>
                                        <td>{item.student.admission}</td>
                                        <td><img style={{ width: "6rem", height: "4rem", objectFit: "contain" }} src={baseUrl + '/images/' + item.equipment.filename} alt='' /></td>
                                        <td>{item.quantity}</td>
                                        <td>{item.orderDate}</td>
                                        <td style={{ color: "red" }}>{item.dueDate}</td>
                                        {item.fine > 0 ? <td style={{ color: "red" }}>{item.fine}</td> : <td style={{ color: "green" }}>{item.fine}</td>}
                                        <td>{item.status}</td>
                                    </tr>)
                                })}
                            </thead>
                            <tbody>

                            </tbody>
                        </table> : (loading ? <ClipLoader color="#4c00b4" size={80} cssOverride={{ marginTop: "15%" }} /> : <h4 className='text-center' style={{ marginTop: "10%" }}>No equipments rented.</h4>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageRentals