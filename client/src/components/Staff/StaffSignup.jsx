import React, { useState } from 'react'
import './StaffSignup.css'
import { useNavigate } from 'react-router-dom'

function StaffSignup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [staff, setStaff] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [visibility, setVisibility] = useState(false)
  const [ConfirmVisibility, setConfirmVisibility] = useState(false)

  const [errors, setErrors] = useState({})
  
  return (
    <div className="staff-signup container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div className="header">
            <div className="text">Staff SignUp</div>
            <div className="underline"></div>
          </div>

          <div className="signup-form">
            <form action="" method="POST">
              <div class="row">

                <div class="form-group col-md-6">
                  <div className="input-signup">
                    <input type="text" name="name" className="form-control" placeholder='Name' required/>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div className="input-signup">
                    <input type="number" name="staff_no" className="form-control" placeholder='Staff No' required/>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div className="input-signup">
                    <input type="email" name="email" className="form-control" placeholder='Email Id' required/>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <div className="input-signup">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">+91</div>
                      </div>
                      <input type="number" name="mobile" className="form-control" placeholder='Mobile No' required/>
                    </div>
                  </div>

                  <span id="mobileErr"></span>
                </div>

                <div className="form-group col-md-6">
                  {visibility ?
                    <div className="input-signup">
                      <input type="text" className='signup-password' name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                      <i class="password-signup-eye fa-duotone fa-eye" onClick={() => setVisibility(!visibility)}></i>
                    </div> :
                    <div className="input-signup">
                      <input type="password" className='signup-password' name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                      <i class="password-signup-eye fa-duotone fa-eye-slash" onClick={()=>setVisibility(!visibility)}></i>
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
                      <i class="password-signup-eye fa-duotone fa-eye" onClick={() =>setConfirmVisibility(!ConfirmVisibility)}></i>
                    </div> :
                    <div className="input-signup">
                      <input type="password" className='signup-password' name="cpassword" onChange={(e) => setCpassword(e.target.value)} placeholder='Confirm Password' />
                      <i class="password-signup-eye fa-duotone fa-eye-slash" onClick={()=>setConfirmVisibility(!ConfirmVisibility)}></i>
                    </div>
                  }
                  <div className="validation">
                    {errors.confirmPassword && <small className='text-danger'>{errors.confirmPassword}</small>}
                  </div>
                </div>

                <div class="col-md-6"></div>
                <div class="col-md-6">
                  <div className="submit-signup-container">
                    <a className='login-account' onClick={()=>navigate('/staff')}>Already have an account?</a>
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