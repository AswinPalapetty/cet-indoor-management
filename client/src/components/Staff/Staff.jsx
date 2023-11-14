import React, { useContext, useEffect } from 'react'
import StaffNavBar from '../StaffNavBar/StaffNavBar'
import Banner from '../Banner/Banner'
import Content from '../Content/Content'
import { staffContext } from '../../contexts/StaffContext'

function Staff() {
  const {staff} = useContext(staffContext)
  
  useEffect(()=>{
    console.log(staff);
  })

  return (
    <div className='staff'>
      <StaffNavBar />
      <Banner/>
      <Content/>
    </div>
  )
}

export default Staff