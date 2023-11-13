import React, { useContext } from 'react'
import './StudentNavBar.css'
import cet_emblem_white1 from "../../images/cet_emblem_white1.png"
import { useNavigate } from 'react-router-dom'
import { studentContext } from '../../contexts/StudentContext'
import Cookies from 'universal-cookie'

function StudentNavBar() {
  const navigate = useNavigate()
  const { student, setStudent } = useContext(studentContext)

  const cookies = new Cookies()

  //Logout button
  const Logout = () => {
    setStudent(null)
    cookies.remove("jwt_authorization")
    setStudent(null)
    navigate('/student')
  }

  const badmintonBooking = () => {

  }

  const tableTennisBooking = () => {

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
                <a className="nav-link" aria-current="page" onClick={() => navigate('/student')}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/equipments')}>Equipments</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Book your slot</a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Badminton Court</a></li>
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Table Tennis</a></li>

                  {/* <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li> */}

                </ul>
              </li>

              <li className="nav-item">
                <div className="items">
                  <button type="button" onClick={() => navigate('/cart')} class="btn btn-dark position-relative">
                    My Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      99+
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </div>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">My Activities</a>
              </li>


              <li className="nav-item">
                <div className="items">
                  <button type="button" class="btn btn-dark position-relative">
                    Announcements
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      99+
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </button>
                </div>
              </li>

              {/* <li className="nav-item">
              <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> */}

            </ul>
            <button type="button" className="btn btn-outline-light" onClick={Logout}>Logout &nbsp;<i className="fa-duotone fa-right-from-bracket"></i></button>
          </div>
        </div>
      </nav>



      {/* MODAL */}

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentNavBar