import React, { useContext, useEffect, useState } from 'react'
import './StaffSignup.css'
import { useNavigate } from 'react-router-dom'
import { staffContext } from '../../contexts/StaffContext'
import axios from "../../utilities/Axios"
import { jwtDecode } from "jwt-decode"
import Cookies from 'universal-cookie'

function StaffSignup() {
  const navigate = useNavigate()
  //initialize cookies
  const cookies = new Cookies()

  const { staff, setStaff } = useContext(staffContext)

  const [name, setName] = useState('')
  const [staffno, setStaffno] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [visibility, setVisibility] = useState(false)
  const [ConfirmVisibility, setConfirmVisibility] = useState(false)

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

  const signUp = (e) => {
    e.preventDefault();

    //form validation begins
    const validationErrors = {}

    if (!name.trim()) {
      validationErrors.name = "Name is required."
    }
    if (!staffno.trim()) {
      validationErrors.staffno = "Staff Number is required."
    }
    else if (staffno.length !== 6) {
      validationErrors.staffno = "Enter a valid Staff Number."
    }
    if (!mobile.trim()) {
      validationErrors.mobile = "Mobile Number is required."
    }
    else if (mobile.length !== 10) {
      validationErrors.mobile = "Enter a valid Mobile Number."
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Enter a valid Email."
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required"
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      validationErrors.password = "Password must have a minimum of 8 characters and include at least 1 uppercase letter, a digit, and a special character."
    }
    if (cpassword !== password) {
      validationErrors.confirmPassword = "Password is not matching."
    }
    setErrors(validationErrors)
    //form validation ends

    if (Object.keys(validationErrors).length === 0) {
      //server call
      const formData = {
        name, staffno, email, mobile, password
      }
      axios.post('/staff/signup', formData).then((result) => {

        if (result.data.token) {
          //decoding jwt token
          const decoded = jwtDecode(result.data.token)

          //set cookie
          cookies.set("jwt_staff_authorization", result.data.token, {
            expires: new Date(decoded.exp * 1000)
          })

          //setting student
          setStaff(decoded)

          navigate('/staff')
        }
        else {
          alert(result.data.message)

        }

      })
    }
  }

  return (
    <div className="staff-signup container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div className="header">
            <div className="text">Staff SignUp</div>
            <div className="underline"></div>
          </div>

          <div className="signup-form">
            <form onSubmit={signUp} method="POST">
              <div class="row">

                <div class="form-group col-md-6">
                  <div className="input-signup">
                    <input type="text" name="name" className="form-control" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="validation">
                    {errors.name && <small className='text-danger'>{errors.name}</small>}
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div className="input-signup">
                    <input type="number" name="staffno" className="form-control" placeholder='Staff No' onChange={(e) => setStaffno(e.target.value)} />
                  </div>

                  <div className="validation">
                    {errors.staffno && <small className='text-danger'>{errors.staffno}</small>}
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div className="input-signup">
                    <input type="email" name="email" className="form-control" placeholder='Email Id' onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="validation">
                    {errors.email && <small className='text-danger'>{errors.email}</small>}
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div className="input-signup">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">+91</div>
                      </div>
                      <input type="number" name="mobile" className="form-control" placeholder='Mobile No' onChange={(e) => setMobile(e.target.value)} />
                    </div>
                  </div>

                  <div className="validation">
                    {errors.mobile && <small className='text-danger'>{errors.mobile}</small>}
                  </div>
                </div>

                <div className="form-group col-md-6">
                  {visibility ?
                    <div className="input-signup">
                      <input type="text" className='signup-password' name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                      <i class="password-signup-eye fa-duotone fa-eye" onClick={() => setVisibility(!visibility)}></i>
                    </div> :
                    <div className="input-signup">
                      <input type="password" className='signup-password' name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                      <i class="password-signup-eye fa-duotone fa-eye-slash" onClick={() => setVisibility(!visibility)}></i>
                    </div>
                  }
                  <div className="validation">
                    {errors.password && <small className='text-danger'>{errors.password}</small>}
                  </div>
                </div>

                <div className="form-group col-md-6">
                  {ConfirmVisibility ?
                    <div className="input-signup">
                      <input type="text" className='signup-password' name="cpassword" onChange={(e) => setCpassword(e.target.value)} placeholder='Confirm Password' />
                      <i class="password-signup-eye fa-duotone fa-eye" onClick={() => setConfirmVisibility(!ConfirmVisibility)}></i>
                    </div> :
                    <div className="input-signup">
                      <input type="password" className='signup-password' name="cpassword" onChange={(e) => setCpassword(e.target.value)} placeholder='Confirm Password' />
                      <i class="password-signup-eye fa-duotone fa-eye-slash" onClick={() => setConfirmVisibility(!ConfirmVisibility)}></i>
                    </div>
                  }
                  <div className="validation">
                    {errors.confirmPassword && <small className='text-danger'>{errors.confirmPassword}</small>}
                  </div>
                </div>

                <div class="col-md-6"></div>
                <div class="col-md-6">
                  <div className="submit-signup-container">
                    <a className='login-account' onClick={() => navigate('/staff')}>Already have an account?</a>
                    <button type="submit" class="submit btn">SignUp</button>
                  </div>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default StaffSignup