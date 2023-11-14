import React, { useContext, useEffect, useState } from 'react'
import './StudentLogin.css'
import person from '../../images/person.png'
import passwordImg from '../../images/passwordImg.png'
import { useNavigate } from 'react-router-dom'
import axios from '../../utilities/Axios'
import { studentContext } from '../../contexts/StudentContext'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'universal-cookie'

function StudentLogin() {
  const navigate = useNavigate()
  const cookies = new Cookies()

  const { student, setStudent } = useContext(studentContext)
  const [admission, setAdmission] = useState('')
  const [password, setPassword] = useState('')
  const [visibility, setVisibility] = useState(false)

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

  const Login = (e) => {
    e.preventDefault();

    //form validation begins
    const validationErrors = {}
    if (!admission.trim()) {
      validationErrors.admission = "Admission Number is required."
    }
    else if (admission.length !== 6) {
      validationErrors.admission = "Enter a valid Admission Number."
    }
    if (!password.trim()) {
      validationErrors.password = "Password is required."
    }

    setErrors(validationErrors)
    //form validation ends

    if (Object.keys(validationErrors).length === 0) {
      //server call
      const formData = {
        admission, password
      }
      axios.post('/student/login', formData).then((result) => {
        console.log(result);
        if (result.data.token) {
          console.log(result);

          //decoding jwt token
          const decoded = jwtDecode(result.data.token)
          console.log(decoded);

          //setting student
          setStudent(decoded)

          //set cookie
          cookies.set("jwt_authorization", result.data.token, {
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
    <div className="student-login container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="header">
            <div className="text">Student Login</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={Login} method="post">
            <div className="form-group">
              <div className="input">
                <img src={person} alt="user" />
                <input type="text" name="admission" onChange={(e) => setAdmission(e.target.value)} placeholder='Admission No' />
              </div>
              <div className="validation">
                {errors.admission && <small className='text-danger'>{errors.admission}</small>}
              </div>
            </div>
            <div className="form-group">

              {visibility ?
                <div className="input">
                  <img src={passwordImg} alt="password" />
                  <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                  <i className="password-eye fa-duotone fa-eye" onClick={() => setVisibility(!visibility)}></i>
                </div> :
                <div className="input">
                  <img src={passwordImg} alt="password" />
                  <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                  <i className="password-eye fa-duotone fa-eye-slash" onClick={() => setVisibility(!visibility)}></i>
                </div>
              }

              <div className="validation">
                {errors.password && <small className='text-danger'>{errors.password}</small>}
              </div>
            </div>
            <div className="submit-container">
              <div className="create-account"><span onClick={() => navigate('/student/signup')}>Create new account?</span></div>
              <button type='submit' className="submit btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentLogin