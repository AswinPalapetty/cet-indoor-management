import React, { useContext, useEffect } from 'react'
import './Student.css'
import { studentContext } from '../../contexts/StudentContext'
import StudentNavBar from '../StudentNavBar/StudentNavBar'
import Banner from '../Banner/Banner'
import Content from '../Content/Content'

function Student() {
  const { student, setStudent } = useContext(studentContext)
  useEffect(()=>{
    console.log(student);
  })
  return (
    <div className='student'>
      <StudentNavBar />
      <Banner />
      <Content />
    </div>
  )
}

export default Student