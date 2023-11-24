import React, { useEffect, useState } from 'react'
import './MyEquipments.css'
import StudentNavBar from '../StudentNavBar/StudentNavBar'
import { baseUrl } from '../../utilities/Constants'
import axios from '../../utilities/Axios'
import Cookies from 'universal-cookie'
import ClipLoader from 'react-spinners/ClipLoader'

function MyEquipments() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const cookies = new Cookies();
    const jwtToken = cookies.get("jwt_authorization")

    useEffect(() => {
        axios.get('/student/orders', { headers: { Authorization: jwtToken } }).then((result) => {
            console.log(result.data);
            setOrders(result.data)
            setLoading(false)
        })
    }, [])

    const initPayment = (order) => {
        const options = {
            key: process.env.REACT_APP_KEY_ID,
            amount: order.amount*100,
            currency: order.currency,
            description: "Fine Payment",
            order_id: order.id,
            handler: async (response) => {
                try {
                    const result = await axios.post('/student/makePayment', { headers: { Authorization: jwtToken } }, response);
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3c0098",
            },
        };
        console.log(options);
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const payFine = async (fine) => {
        try {
            const { data } = await axios.post('/student/getPaymentGateway', { amount: fine });
            if (data.order) {
                initPayment(data.order);
            }
            else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <StudentNavBar />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <h2 className="text-center my-equipments-title"><span className="first-letter">M</span>Y <span className="first-letter">E</span>QUIPMENTS</h2>
                    <div className="col-12 text-center mt-4">
                        {(orders.length > 0) ? <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope='col'>Due Date</th>
                                    <th scope='col'>Fine</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'></th>
                                </tr>
                                {orders.map((item) => {
                                    const dateObject = new Date(item.dueDate);
                                    item.dueDate = dateObject.toLocaleDateString("en-GB");
                                    return (<tr>
                                        <td><img style={{ width: "6rem", height: "4rem", objectFit: "contain" }} src={baseUrl + '/images/' + item.equipment.filename} alt='' /></td>
                                        <td>{item.quantity}</td>
                                        <td style={{ color: "red" }}>{item.dueDate}</td>
                                        {item.fine > 0 ? <td style={{ color: "red" }}>{item.fine}</td> : <td style={{ color: "green" }}>{item.fine}</td>}
                                        <td>{item.status}</td>
                                        {item.fine !== 0 && <td><button className='btn btn-danger' onClick={() => payFine(item.fine)}>Pay Fine</button></td>}
                                    </tr>)
                                })}
                            </thead>
                            <tbody>

                            </tbody>
                        </table> : (loading ? <ClipLoader color="#4c00b4" size={80} cssOverride={{ marginTop: "15%" }} /> : <h4 className='text-center' style={{ marginTop: "10%" }}>You haven't rented any equipments.</h4>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyEquipments