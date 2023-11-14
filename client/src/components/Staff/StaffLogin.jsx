import React, { useState, useEffect, useContext } from 'react'
import './StaffLogin.css'
import person from '../../images/person.png'
import passwordImg from '../../images/passwordImg.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from '../../utilities/Axios'
import { jwtDecode } from 'jwt-decode'
import { staffContext } from '../../contexts/StaffContext'


function StaffLogin() {
  const navigate = useNavigate()
  const cookies = new Cookies()

  const {staff,setStaff} = useContext(staffContext)
  const [staffno, setStaffno] = useState('')
  const [password, setPassword] = useState('')
  const [visibility, setVisibility] = useState(false)

  const [errors, setErrors] = useState({})

  //Execute when page loads
  useEffect(() => {
    const jwtToken = cookies.get("jwt_staff_authorization")

    if (jwtToken) {
      // Decode the token
      const decoded = jwtDecode(jwtToken);

      // Set the staff state
      setStaff(decoded);
    }
  })

  const Login = (e) => {
    e.preventDefault();

    //form validation begins
    const validationErrors = {}
    if (!staffno.trim()) {
      validationErrors.staffno = "Staff Number is required."
    }
    else if (staffno.length !== 6) {
      validationErrors.staffno = "Enter a valid Staff Number."
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required."
    }

    setErrors(validationErrors)
    //form validation ends

    if (Object.keys(validationErrors).length === 0) {
      //server call
      const formData = {
        staffno, password
      }
      axios.post('/staff/login', formData).then((result) => {
        console.log(result);
        if (result.data.token) {
          console.log(result);

          //decoding jwt token
          const decoded = jwtDecode(result.data.token)
          console.log(decoded);

          //setting staff
          setStaff(decoded)

          //set cookie
          cookies.set("jwt_staff_authorization", result.data.token, {
            expires: new Date(decoded.exp * 1000)
          })
        }
        else {
          alert(result.data.message)
        }
      })
    }
  }
  return (
    <div className="staff-login container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="header">
            <div className="text">Staff Login</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={Login} method="post">
            <div class="form-group">
              <div className="input">
                <img src={person} alt="user" />
                <input type="text" name="staffno" placeholder='Staff No' onChange={(e) => setStaffno(e.target.value)} />
              </div>

              <div className="validation">
                {errors.staffno && <small className='text-danger'>{errors.staffno}</small>}
              </div>
            </div>
            <div class="form-group">

              {visibility ?
                <div className="input">
                  <img src={passwordImg} alt="password" />
                  <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                  <i class="password-eye fa-duotone fa-eye" onClick={() => setVisibility(!visibility)}></i>
                </div> :
                <div className="input">
                  <img src={passwordImg} alt="password" />
                  <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                  <i class="password-eye fa-duotone fa-eye-slash" onClick={() => setVisibility(!visibility)}></i>
                </div>
              }

              <div className="validation">
                {errors.password && <small className='text-danger'>{errors.password}</small>}
              </div>

            </div>
            <div className="submit-container">
              <div className="create-account"><span onClick={() => navigate('/staff/signup')}>Create new account?</span></div>
              <button className="submit btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StaffLogin