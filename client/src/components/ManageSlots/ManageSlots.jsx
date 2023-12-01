import React, { useEffect, useState } from 'react'
import './ManageSlots.css'
import StaffNavBar from '../StaffNavBar/StaffNavBar'
import axios from '../../utilities/Axios'
import Cookies from 'universal-cookie'
import ClipLoader from "react-spinners/ClipLoader";

function ManageSlots() {
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const cookies = new Cookies();
  const jwtToken = cookies.get("jwt_staff_authorization")

  useEffect(() => {
    axios.get('/staff/bookedSlots', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      setBookings(result.data)
      setLoading(false)
    })
  }, [])
  return (
    <div>
      <StaffNavBar />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2 className="text-center manage-rentals-title"><span className="first-letter">M</span>ANAGE <span className="first-letter">S</span>LOTS</h2>
          <div className="col-12 text-center mt-4">
            {(bookings.length > 0) ? <table className="table">
              <thead>
                <tr>
                  <th scope="col">Student</th>
                  <th scope="col">Admission No.</th>
                  <th scope="col">Mobile No.</th>
                  <th scope="col">Court</th>
                  <th scope='col'>Slot</th>
                </tr>
                {bookings.map((item) => {

                  return (<tr>
                    <td>{item.student.name}</td>
                    <td>{item.student.admission}</td>
                    <td>{item.student.mobile}</td>
                    <td>{item.court}</td>
                    <td>{item.slot}</td>
                  </tr>)
                })}
              </thead>
              <tbody>

              </tbody>
            </table> : (loading ? <ClipLoader color="#4c00b4" size={80} cssOverride={{ marginTop: "15%" }} /> : <h4 className='text-center' style={{ marginTop: "10%" }}>No Courts booked for today.</h4>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageSlots