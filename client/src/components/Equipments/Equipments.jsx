import React, { useEffect, useState } from 'react'
import './Equipments.css'
import StudentNavBar from '../StudentNavBar/StudentNavBar'
import { baseUrl } from '../../utilities/Constants'
import axios from '../../utilities/Axios'

function Equipments() {
    const [equipments, setEquipments] = useState([])
    useEffect(() => {
        axios.get('/student/getEquipments').then((result) => {
            setEquipments(result.data.equipments)
        })
    }, [])
    return (
        <div>
            <StudentNavBar />
            <div className="container-fluid">
                <div className="row justify-content-center mb-5">
                    <h2 className="text-center equipments-title"><span className="first-letter">E</span>QUIPMENTS</h2>

                    {equipments.map((rowData) => (
                        <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={baseUrl + '/images/' + rowData.filename} className="card-img-top" alt={rowData.filename} />
                                <div className="card-body">
                                    <h5 className="card-title">{rowData.equipment}</h5>
                                    <p className="card-text">
                                        {parseInt(rowData.stock,10)>0 ? <small className='text-success'>In Stock</small> : <small className='text-danger'>Out of Stock</small>}<br />
                                        <small className='text-primary-emphasis'><i>Availability : {rowData.stock}</i></small>
                                    </p>
                                    <button type='submit' className="submit btn">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Equipments