import React, { useContext, useState } from 'react'
import './StudentNavBar.css'
import cet_emblem_white1 from "../../images/cet_emblem_white1.png"
import { useNavigate } from 'react-router-dom'
import { studentContext } from '../../contexts/StudentContext'
import Cookies from 'universal-cookie'

function StudentNavBar() {
  const navigate = useNavigate()
  const { student, setStudent } = useContext(studentContext)
  const [badminton, setBadminton] = useState(false)

  const cookies = new Cookies()

  // Get the current date
  const today = new Date();
  // Format the date as needed
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  //Logout button
  const Logout = () => {
    setStudent(null)
    cookies.remove("jwt_authorization")
    setStudent(null)
    navigate('/student')
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
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setBadminton(true)}>Badminton Court</a></li>
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setBadminton(false)}>Table Tennis</a></li>

                  {/* <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li> */}

                </ul>
              </li>

              <li className="nav-item">
                <div className="items">
                  <button type="button" onClick={() => navigate('/cart')} className="btn btn-dark position-relative">
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
                  <button type="button" className="btn btn-dark position-relative">
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

      <div style={{ zIndex: "1" }} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Book your Slot</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setBadminton(false)}></button>
            </div>
            <div className="modal-body">
              <div class="mb-3">
                <input type="text" class="form-control" value={badminton ? 'Badminton Court' : 'Table Tennis'} disabled />
              </div>
              <div className="mb-3">
                <input type="date" class="form-control" value={formattedDate} disabled />
              </div>
              <div className="mb-3">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select your slot</option>
                  <option value="9:30-10:30">9:30 - 10:30am</option>
                  <option value="10:30-11:30">10:30 - 11:30am</option>
                  <option value="11:30-12:30">11:30 - 12:30pm</option>
                  <option value="12:30-13:30">12:30 - 1:30pm</option>
                  <option value="13:30-14:30">1:30 - 2:30pm</option>
                  <option value="14:30-15:30">2:30 - 3:30pm</option>
                  <option value="15:30-16:30">3:30 - 4:30pm</option>
                  <option value="16:30-17:30">4:30 - 5:30pm</option>
                  <option value="17:30-18:30">5:30 - 6:30pm</option>
                  <option value="18:30-19:30">6:30 - 7:30pm</option>
                  <option value="19:30-20:30">7:30 - 8:30pm</option>
                  <option value="20:30-21:30">8:30 - 9:30pm</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type='submit' className="slot-submit btn">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentNavBar