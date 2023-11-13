import React, { useState } from 'react'
import './StaffLogin.css'
import person from '../../images/person.png'
import passwordImg from '../../images/passwordImg.png'
import { useNavigate } from 'react-router-dom'

function StaffLogin() {
  const navigate = useNavigate()
  const [admission, setAdmission] = useState('')
  const [password, setPassword] = useState('')
  const [visibility, setVisibility] = useState(false)

  const [errors, setErrors] = useState({})
  return (
    <div className="staff-login container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="header">
            <div className="text">Staff Login</div>
            <div className="underline"></div>
          </div>
          <form action="" method="post">
            <div class="form-group">
              <div className="input">
                <img src={person} alt="user" />
                <input type="text" name="satff_no" placeholder='Staff No' />
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