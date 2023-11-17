import React, { useState } from 'react'
import './ManageEquipments.css'
import StaffNavBar from '../StaffNavBar/StaffNavBar'

function ManageEquipments() {
  const [equipment, setEquipment] = useState('')
  const [stock, setStock] = useState('')
  const [file, setFile] = useState('')
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

        <div className="row justify-content-center mb-5">
          <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
            <div className="card" style={{ width: "18rem" }}>
              <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Cricket Bat</h5>
                <p className="card-text">
                  <small className='text-primary-emphasis'><i>Current Stock : 12</i></small>
                </p>
                <button type='submit' className="update-stock-submit btn">Update Stock</button>
              </div>
            </div>
          </div>

          <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
            <div className="card" style={{ width: "18rem" }}>
              <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Cricket Bat</h5>
                <p className="card-text">
                  <small className='text-primary-emphasis'><i>Current Stock : 12</i></small>
                </p>
                <button type='submit' className="update-stock-submit btn">Update Stock</button>
              </div>
            </div>
          </div>

          <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
            <div className="card" style={{ width: "18rem" }}>
              <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Cricket Bat</h5>
                <p className="card-text">
                  <small className='text-primary-emphasis'><i>Current Stock : 12</i></small>
                </p>
                <button type='submit' className="update-stock-submit btn">Update Stock</button>
              </div>
            </div>
          </div>

          <div className="card-div col-lg-3 col-md-4 col-sm-6 col-12 text-center mt-4">
            <div className="card" style={{ width: "18rem" }}>
              <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?fit=crop&w=2134&q=100" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Cricket Bat</h5>
                <p className="card-text">
                  <small className='text-primary-emphasis'><i>Current Stock : 12</i></small>
                </p>
                <button type='submit' className="update-stock-submit btn">Update Stock</button>
              </div>
            </div>
          </div>

        </div>

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
                <input type="text" className="form-control" onChange={(e) => setEquipment(e.target.value)} />
                <label for="floatingInput">Name of Equipment</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" onChange={(e) => setStock(e.target.value)} />
                <label for="floatingInput">Current Stock</label>
              </div>
              <div className='mb-3'>
                <input class="form-control form-control-lg" type="file" onChange={(e) => console.log(e.target.files[0])} />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type='submit' className="slot-submit btn">Add</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ManageEquipments