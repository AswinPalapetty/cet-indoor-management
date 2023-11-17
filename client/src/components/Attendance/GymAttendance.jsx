import React, { useEffect, useRef, useState } from 'react'
import './Attendance.css'
import StaffNavBar from '../StaffNavBar/StaffNavBar'
import axios from "../../utilities/Axios"

function GymAttendance() {
  const invisibleButtonRef = useRef(null);
  const ButtonRef = useRef(null);

  const [errors, setErrors] = useState({})

  const [admission, setAdmission] = useState('')
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [mobile, setMobile] = useState('')
  const [intime, setIntime] = useState('')
  const [todaysAttendance, setTodaysAttendance] = useState([])

  useEffect(()=>{
    axios.get('/staff/fetchGymAttendance').then((result) =>{
      setTodaysAttendance(result.data.todaysAttendance)
    })
  },[])

  const markAttendance = () => {
    const studentData = { admission, name, department, mobile, intime }
    axios.post('/staff/markGymAttendance', studentData).then((result) => {
      if (result.data.studentAttendance) {
        setTodaysAttendance([...todaysAttendance, result.data.studentAttendance])
        alert(result.data.message)
        ButtonRef.current.click();
      }
      else {
        alert(result.data.message)
        ButtonRef.current.click();
      }
    })
  }


  const findStudent = () => {
    const validationErrors = {}
    if (!admission.trim()) {
      validationErrors.admission = "Admission Number is required."
    }
    else if (admission.length !== 6) {
      validationErrors.admission = "Enter a valid Admission Number."
    }

    setErrors(validationErrors)
    //form validation ends

    if (Object.keys(validationErrors).length === 0) {
      axios.get(`/staff/findStudent/${admission}`).then((result) => {
        if (result.data.student) {
          setName(result.data.student.name)
          setDepartment(result.data.student.department)
          setMobile(result.data.student.mobile)

          const now = new Date();

          // Get the date components
          const [month, day, year] = now.toLocaleDateString('en-US').split('/');

          // Get the time components
          const hours = now.getHours();
          const minutes = now.getMinutes();

          // Format date and time
          const formattedDate = `${day}-${month}-${year}`;
          const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

          // Combine date and time with your desired format
          setIntime(`${formattedDate} -- ${formattedTime}`);

          //invisible button clicking 
          invisibleButtonRef.current.click();
        }
        else {
          alert(result.data.message)
        }
      })
    }
  }

  return (
    <div>
      <StaffNavBar />
      <div className="container-fluid">

        <div className="row justify-content-center">
          <h2 className="text-center attendance-title"><span className="first-letter">G</span>YM <span className="first-letter">A</span>TTENDANCE</h2>
          <div className="col-md-4"></div>

          <div className="col-md-4 mb-3">
            <div className="input-group">

              <input type="text" className="form-control" placeholder="Enter Admission No." onChange={(e) => setAdmission(e.target.value)} />
              <button type="button" className='find-student-btn' onClick={findStudent}>
                Find
              </button>

            </div>
            <div className="validation">
              {errors.admission && <small className='text-danger'>{errors.admission}</small>}
            </div>
          </div>

          <div className="col-md-4"></div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 text-center mt-5">
            {(todaysAttendance.length>0) && <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sl No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Admission No.</th>
                  <th scope='col'>Mobile</th>
                  <th scope='col'>Department</th>
                  <th scope='col'>In Time</th>
                </tr>
              </thead>
              <tbody>
                {todaysAttendance.map((rowData,index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{rowData.name}</td>
                    <td>{rowData.admission}</td>
                    <td>{rowData.mobile}</td>
                    <td>{rowData.department}</td>
                    <td>{rowData.intime}</td>
                  </tr>
                ))}
              </tbody>
            </table>}
          </div>
        </div>
      </div>


      {/* MODAL */}

      {/* The invisible button that triggers modal */}
      <button ref={invisibleButtonRef} style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button>


      <div style={{ zIndex: "100" }} tabIndex="-1" className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Mark Attendance</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={name} disabled />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={admission} disabled />
                <label for="floatingPassword">Admission No.</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={mobile} disabled />
                <label for="floatingPassword">Mobile</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={department} disabled />
                <label for="floatingPassword">Department</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={intime} disabled />
                <label for="floatingPassword">In Time</label>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={ButtonRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type='submit' className="slot-submit btn" onClick={markAttendance}>Mark</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default GymAttendance