import React, { useContext } from 'react'
import './StaffNavBar.css'
import Cookies from 'universal-cookie'
import {staffContext} from '../../contexts/StaffContext'
import { useNavigate } from 'react-router-dom'
import cet_emblem_white1 from '../../images/cet_emblem_white1.png'

function StaffNavBar() {
  
  const navigate = useNavigate()
  const {staff,setStaff} = useContext(staffContext)
  const cookies = new Cookies()

  const Logout = ()=>{
    setStaff(null)
    cookies.remove("jwt_staff_authorization")
    navigate('/staff')
  }
  return (
    <div className="StudentNavBar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="name">
            <a className="navbar-brand" onClick={() => navigate('/')}>
              <img src={cet_emblem_white1} alt="CET" />
              <span>Indoor SportsHub</span>
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={() => navigate('/staff')}>Home</a>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Attendance</a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" onClick={()=>navigate('/staff/indoorAttendance')}>Indoor Court Attendance</a></li>
                  <li><a className="dropdown-item" onClick={()=>navigate('/staff/gymAttendance')}>Gym Attendance</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={() => navigate('/staff/equipments')}>Equipments</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/staff/slots')}>Manage Slots</a>
              </li>


              <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={() => navigate('/staff/announcements')}>Announcements</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={() => navigate('/staff/rentals')}>Manage Rentals</a>
              </li>

              {/* <li className="nav-item">
              <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> */}

            </ul>
            <button type="button" className="btn btn-outline-light" onClick={Logout}>Logout &nbsp;<i className="fa-duotone fa-right-from-bracket"></i></button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default StaffNavBar