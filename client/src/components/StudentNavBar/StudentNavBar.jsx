import React, { useContext, useEffect, useRef, useState } from 'react'
import './StudentNavBar.css'
import cet_emblem_white1 from "../../images/cet_emblem_white1.png"
import { useNavigate } from 'react-router-dom'
import { studentContext } from '../../contexts/StudentContext'
import Cookies from 'universal-cookie'
import { cartContext } from '../../contexts/CartContext'
import axios from '../../utilities/Axios'

function StudentNavBar() {
  const navigate = useNavigate()
  const { student, setStudent } = useContext(studentContext)
  const [badminton, setBadminton] = useState(false)
  const { cartLength, setCartLength } = useContext(cartContext)
  const [announcementsCount, setAnnouncementsCount] = useState(0)
  const [badmintonSlots, setBadmintonSlots] = useState([])
  const [tableTennisSlots, setTableTennisSlots] = useState([])
  const [slot, setSlot] = useState('')
  const [mySlots, setMySlots] = useState([])
  const ButtonRef = useRef(null)

  const cookies = new Cookies()
  const jwtToken = cookies.get("jwt_authorization")

  // Get the current date
  const today = new Date();
  // Format the date as needed
  const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  useEffect(() => {
    axios.get('/student/getCartItems', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      setCartLength(result.data.cartData.length);
    })

    axios.get('/student/getAnnouncements', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      setAnnouncementsCount(result.data.announcements.length)
    })
  }, [])

  const getBadmintonSlot = () => {
    axios.get('/student/getBadmintonSlot', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      setBadmintonSlots(result.data.slots)
    })
  }

  const getTableTennisSlot = () => {
    axios.get('/student/getTableTennisSlot', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      setTableTennisSlots(result.data.slots)
    })
  }

  const bookSlot = () => {
    let court = ""
    if (badminton) {
      court = "badminton";
    }
    else {
      court = "table_tennis";
    }
    axios.post('/student/bookSlot', { court, slot }, { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      if (result.data.booking) {
        alert(result.data.message)
        ButtonRef.current.click();
        setSlot('')
      }
      else {
        alert(result.data.message)
        ButtonRef.current.click();
        setSlot('')
      }
    })
  }

  const getMySlots = () => {
    axios.get('/student/getMySlots', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      setMySlots(result.data);
    })
  }

  //Logout button
  const Logout = () => {
    setStudent(null)
    cookies.remove("jwt_authorization")
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
                <a className="nav-link" onClick={() => navigate('/student/equipments')}>Equipments</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Book your slot</a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                    getBadmintonSlot();
                    setBadminton(true);
                  }
                  }>Badminton Court</a></li>
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                    getTableTennisSlot();
                    setBadminton(false);
                  }
                  }>Table Tennis</a></li>
                  <li><a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#mySlots" onClick={getMySlots}>My Slots</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <div className="items">
                  <button type="button" onClick={() => navigate('/student/cart')} className="btn btn-dark position-relative">
                    My Cart
                    {cartLength > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">{cartLength}
                      <span className="visually-hidden">unread messages</span>
                    </span>}
                  </button>
                </div>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/student/myEquipments')}>My Equipments</a>
              </li>


              <li className="nav-item">
                <div className="items">
                  <button type="button" className="btn btn-dark position-relative" onClick={() => navigate('/student/announcements')} >
                    Announcements
                    {announcementsCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">{announcementsCount}
                      <span className="visually-hidden">unread messages</span>
                    </span>}
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
                <select class="form-select" aria-label="Default select example" value={slot} onChange={(e) => setSlot(e.target.value)}>
                  <option selected>Select your slot</option>
                  {badminton ?
                    (
                      badmintonSlots &&
                      badmintonSlots.map((eachSlot) => (<option value={eachSlot}>{eachSlot}</option>)
                      )
                    )
                    :
                    (
                      tableTennisSlots &&
                      tableTennisSlots.map((eachSlot) =>
                        (<option value={eachSlot}>{eachSlot}</option>)
                      )
                    )
                  }
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={ButtonRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type='submit' className="slot-submit btn" onClick={bookSlot}>Confirm</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}

      <div style={{ zIndex: "1" }} className="modal fade" id="mySlots" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">My Slots</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {
                (mySlots.length > 0) ?
                  <table class="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">Court</th>
                        <th scope="col">Slot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mySlots.map((eachCourt) => {
                        eachCourt.court = eachCourt.court.replace(/_/g, ' ');
                        return (
                          <tr>
                            <td scope="row">{eachCourt.court}</td>
                            <td colspan="2">{eachCourt.slot}</td>
                          </tr>
                        )
                      }
                      )}
                    </tbody>
                  </table>
                  :
                  <h6 className='text-center' style={{ marginTop: "5%" }}>You haven't booked any courts.</h6>
              }

            </div>
          </div>
        </div>
      </div>

    </div>


  )
}

export default StudentNavBar