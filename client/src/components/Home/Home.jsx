import React from 'react'
import './Home.css'
import cet_emblem_white1 from "../../images/cet_emblem_white1.png"
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className='home container-fluid'>
      <div className="row">
        <div className="banner col-12">
          <img src={cet_emblem_white1} alt="CET" style={{ 'max-width': '100%', 'height': 'auto' }} />
          <span className='banner-title'>INDOOR COURT MANAGEMENT</span>
          <span className='mt-2 college-name'>College Of Engineering</span>
          <span className='college-place'>Trivandrum</span>
          <div className="banner-btn mt-4">
          <a onClick={()=>navigate('/student')}><i class="fa-light fa-user-graduate"></i>&nbsp;student</a>
          <a onClick={()=>navigate('/staff')}><i class="fa-light fa-chalkboard-user"></i>&nbsp;staff</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home