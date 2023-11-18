import React, { useEffect, useRef, useState } from 'react'
import './ManageEquipments.css'
import StaffNavBar from '../StaffNavBar/StaffNavBar'
import axios from '../../utilities/Axios'
import { baseUrl } from '../../utilities/Constants'

function ManageEquipments() {
  const ButtonRef = useRef(null);
  const fileInputRef = useRef();

  const [equipment, setEquipment] = useState('')
  const [stock, setStock] = useState('')
  const [file, setFile] = useState('')
  const [insertedEquipments, setInsertedEquipments] = useState([])

  useEffect(() => {
    axios.get('/staff/getEquipments').then((result) => {
      setInsertedEquipments(result.data.equipments)
    })
  }, [])

  const addEquipment = () => {
    const formData = { equipment, stock, file }
    axios.post('/staff/addEquipment', formData, { headers: { "Content-Type": "multipart/form-data" } }).then((result) => {
      if (result.data.equipment) {
        setInsertedEquipments([...insertedEquipments, result.data.equipment]);
        setEquipment('');
        setStock('');
        setFile('');
        // Clear the file input 
        fileInputRef.current.value = '';
        
        alert(result.data.message);
        ButtonRef.current.click();
      }
    })
  }
  return (
    <div>

      <StaffNavBar />
      <div className="container-fluid">

        <div className="row justify-content-center">
          <h2 className="text-center manage-equipment-title"><span className="first-letter">M</span>ANAGE <span className="first-letter">E</span>QUIPMENTS</h2>
          <div className="col-12 text-center mb-5">
            <button type="button" className='add-equipment-btn' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Add Equipment
            </button>
          </div>
        </div>

        {(insertedEquipments.length > 0) &&
          <div className="row justify-content-center mb-5">

            {insertedEquipments.map((rowData) => (
              <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={baseUrl + '/images/' + rowData.filename} className="card-img-top" alt={rowData.filename} />
                  <div className="card-body">
                    <h5 className="card-title">{rowData.equipment}</h5>
                    <p className="card-text">
                      <small className='text-primary-emphasis'><i>Current Stock : {rowData.stock}</i></small>
                    </p>
                    <button type='submit' className="update-stock-submit btn">Update Stock</button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        }

      </div>

      {/* MODAL */}

      <div style={{ zIndex: "100" }} tabIndex="-1" className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Equipment</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={equipment} onChange={(e) => setEquipment(e.target.value)} />
                <label for="floatingInput">Name of Equipment</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                <label for="floatingInput">Current Stock</label>
              </div>
              <div className='mb-3'>

                <input
                  ref={fileInputRef}
                  class="form-control form-control-lg"
                  type="file"
                  onChange={(e) => {
                    const datetimeName = "" + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + "." + e.target.files[0].name.split('.').pop();
                    const newFile = new File([e.target.files[0]], datetimeName, { type: e.target.files[0].type });
                    setFile(newFile);
                  }
                  } />

              </div>
            </div>
            <div className="modal-footer">
              <button ref={ButtonRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type='submit' className="slot-submit btn" onClick={addEquipment}>Add</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ManageEquipments