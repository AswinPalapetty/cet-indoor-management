import React, { useContext, useEffect, useState } from 'react'
import './StudentSignup.css'
import { studentContext } from '../../contexts/StudentContext'
import { useNavigate } from 'react-router-dom'
import axios from "../../utilities/Axios"
import { jwtDecode } from "jwt-decode"
import Cookies from 'universal-cookie'

function StudentSignup() {
  const navigate = useNavigate()
  //initialize cookies
  const cookies = new Cookies()

  const { student, setStudent } = useContext(studentContext)

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [admission, setAdmission] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [visibility, setVisibility] = useState(false)
  const [ConfirmVisibility, setConfirmVisibility] = useState(false)

  const [errors, setErrors] = useState({})

  //Execute when page loads
  useEffect(() => {
    const jwtToken = cookies.get("jwt_authorization")

    if (jwtToken) {
      // Decode the token
      const decoded = jwtDecode(jwtToken);

      // Set the student state
      setStudent(decoded);
    }
  })

  const signUp = (e) => {
    e.preventDefault();

    //form validation begins
    const validationErrors = {}
    if (!fname.trim()) {
      validationErrors.fname = "First Name is required."
    }
    if (!lname.trim()) {
      validationErrors.lname = "Last Name is required."
    }
    if (!department.trim()) {
      validationErrors.department = "Name of Department is required."
    }
    if (!admission.trim()) {
      validationErrors.admission = "Admission Number is required."
    }
    else if (admission.length !== 6) {
      validationErrors.admission = "Enter a valid Admission Number."
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
        name: fname + " " + lname, admission, email, mobile, department, password
      }
      axios.post('/student/signup', formData).then((result) => {

        if (result.data.token) {
          //decoding jwt token
          const decoded = jwtDecode(result.data.token)

          //set cookie
          cookies.set("jwt_authorization", result.data.token, {
            expires: new Date(decoded.exp * 1000)
          })

          //setting student
          setStudent(decoded)

          navigate('/student')
        }
        else{
          alert(result.data.message)
          
        }

      })
    }
  }
  return (
    <div className="student-signup container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="header">
            <div className="text">Student SignUp</div>
            <div className="underline"></div>
          </div>



          <div className="signup-form">
            <form onSubmit={signUp} method="post">
              <div className="row">

                <div className="form-group col-md-6">
                  <div className="input-signup">
                    <input type="text" name="fname" className="form-control" onChange={(e) => setFname(e.target.value)} placeholder='First Name' />
                  </div>
                  <div className="validation">
                    {errors.fname && <small className='text-danger'>{errors.fname}</small>}
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="input-signup">
                    <input type="text" name="lname" className="form-control" onChange={(e) => setLname(e.target.value)} placeholder='Last Name' />
                  </div>
                  <div className="validation">
                    {errors.lname && <small className='text-danger'>{errors.lname}</small>}
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="input-signup">
                    <input type="number" name="admission_no" className="form-control" onChange={(e) => setAdmission(e.target.value)} placeholder='Admission No' />
                  </div>
                  <div className="validation">
                    {errors.admission && <small className='text-danger'>{errors.admission}</small>}
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="input-signup">
                    <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder='Email Id' />
                  </div>
                  <div className="validation">
                    {errors.email && <small className='text-danger'>{errors.email}</small>}
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="input-signup">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">+91</div>
                      </div>
                      <input type="number" name="mobile" className="form-control" onChange={(e) => setMobile(e.target.value)} placeholder='Mobile No' />
                    </div>
                  </div>
                  <div className="validation">
                    {errors.mobile && <small className='text-danger'>{errors.mobile}</small>}
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="input-signup">
                    <input type="text" name="department" className="form-control" onChange={(e) => setDepartment(e.target.value)} placeholder='Department' />
                  </div>
                  <div className="validation">
                    {errors.department && <small className='text-danger'>{errors.department}</small>}
                  </div>
                </div>

                <div className="form-group col-md-6">
                  {visibility ?
                    <div className="input-signup">
                      <input type="text" className='signup-password' name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                      <i className="password-signup-eye fa-duotone fa-eye" onClick={() => setVisibility(!visibility)}></i>
                    </div> :
                    <div className="input-signup">
                      <input type="password" className='signup-password' name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                      <i className="password-signup-eye fa-duotone fa-eye-slash" onClick={() => setVisibility(!visibility)}></i>
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
                      <i className="password-signup-eye fa-duotone fa-eye" onClick={() => setConfirmVisibility(!ConfirmVisibility)}></i>
                    </div> :
                    <div className="input-signup">
                      <input type="password" className='signup-password' name="cpassword" onChange={(e) => setCpassword(e.target.value)} placeholder='Confirm Password' />
                      <i className="password-signup-eye fa-duotone fa-eye-slash" onClick={() => setConfirmVisibility(!ConfirmVisibility)}></i>
                    </div>
                  }
                  <div className="validation">
                    {errors.confirmPassword && <small className='text-danger'>{errors.confirmPassword}</small>}
                  </div>
                </div>

                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="submit-signup-container">
                    <a className='login-account' onClick={() => navigate('/student')}>Already have an account?</a>
                    <button type="submit" className="submit btn">SignUp</button>
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

export default StudentSignup