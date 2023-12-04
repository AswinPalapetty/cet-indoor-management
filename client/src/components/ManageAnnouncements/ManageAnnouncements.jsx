import React, { useEffect, useRef, useState } from 'react'
import './ManageAnnouncements.css'
import StaffNavBar from '../StaffNavBar/StaffNavBar'
import axios from '../../utilities/Axios'
import Cookies from 'universal-cookie';
import ClipLoader from 'react-spinners/ClipLoader';

const baseUrl = process.env.REACT_APP_BASE_URL;

function ManageAnnouncements() {
  const [loading, setLoading] = useState(true)
  const cookies = new Cookies();
  const fileInputRef = useRef();
  const CloseButtonRef = useRef(null);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [Announcements, setAnnouncements] = useState([])
  const jwtToken = cookies.get("jwt_staff_authorization")

  useEffect(() => {
    axios.get('/staff/getAnnouncements', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      setAnnouncements(result.data.announcements)
      setLoading(false)
    })
  }, [])

  const deleteAnnouncement = (id, filename) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this announcement?');

    if (isConfirmed) {
      axios.post('/staff/deleteAnnouncement', { id, filename }, { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
        setAnnouncements(result.data.announcements);
        alert(result.data.message);
      })
    }

  }

  const makeAnnouncement = () => {
    const formData = { title, content, file }
    if (title && content && file) {
      axios.post('/staff/addAnnouncement', formData, { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${jwtToken}` } }).then((result) => {
        if (result.data.announcement) {
          setAnnouncements([...Announcements, result.data.announcement]);
          setTitle('');
          setContent('');
          setFile('');
          // Clear the file input 
          fileInputRef.current.value = '';

          alert(result.data.message);
          CloseButtonRef.current.click();
        }
      })
    }
    else{
      alert("Please enter all details and upload file before confirm.")
    }
  }

  const closeButton = () => {
    setTitle('');
    setContent('');
    setFile('');
    // Clear the file input 
    fileInputRef.current.value = '';
  }

  const handleDownload = async (fileUrl, filename) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // Create a link element
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Set the filename for the downloaded file
      link.download = filename;

      // Simulate a click to trigger the download
      link.click();

      // Cleanup: remove the link and revoke the blob URL
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  return (
    <div>
      <StaffNavBar />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2 className="text-center announcement-title"><span className="first-letter">A</span>NNOUNCEMENTS</h2>
          <div className="col-12 text-center mb-3 mt-5">
            <button type="button" className='make-announcement-btn' data-bs-toggle="modal" data-bs-target="#make-announcement">
              Make Announcement
            </button>
          </div>
          {
            (Announcements.length > 0) ?
              <div>
                {Announcements.map((rowData) => {
                  const date = new Date(rowData.createdAt);
                  const newDate = date.toLocaleDateString('en-GB');

                  return (
                    <div className="col-12 mb-3">
                      <div className="staff-posts">
                        <i className="fa-duotone fa-megaphone announcement-icon"></i>
                        <div className="staff-posts-body" data-bs-toggle="modal" data-bs-target="#view-announcement">
                          <div className="staff-posts-title" style={{ fontSize: "16px", fontWeight: "500" }}>{rowData.title}</div>
                          <div className="staff-posts-date" style={{ fontSize: "12px" }}>{newDate}</div>
                        </div>
                        <i class="fa-duotone fa-trash" onClick={() => deleteAnnouncement(rowData._id, rowData.filename)}></i>
                      </div>

                      {/* MODAL */}
                      <div className="modal fade" id="view-announcement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="staticBackdropLabel">{rowData.title}</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">

                              <div className="content">
                                {rowData.content}
                              </div>
                              {rowData.filename && <div className="files mt-4">
                                <div class="card">
                                  <div class="card-body">
                                    <i class="fa-duotone fa-download download-btn" onClick={() => handleDownload(baseUrl + '/announcement-files/' + rowData.filename, rowData.filename)}></i>
                                  </div>
                                </div>
                              </div>}

                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div> : (loading ? <ClipLoader color="#4c00b4" size={80} cssOverride={{ marginTop: "15%" }} /> : <h5 className='text-center mt-5'>No Announcements Found.</h5>)
          }
        </div>
      </div>

      {/* MODAL */}

      <div className="modal fade" id="make-announcement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Make an Announcement</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeButton}></button>
            </div>

            <div className="modal-body">
              <div class="mb-3">
                <input type="text" class="form-control" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div class="mb-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Enter Content Here...' value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
              </div>
              <div className='mb-3'>

                <input
                  ref={fileInputRef}
                  className="form-control form-control-lg"
                  type="file"
                  accept="image/*, application/pdf"
                  multiple="false"
                  onChange={(e) => {
                    const datetimeName = "" + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + "." + e.target.files[0].name.split('.').pop();
                    const newFile = new File([e.target.files[0]], datetimeName, { type: e.target.files[0].type });
                    setFile(newFile);
                  }
                  }
                />

              </div>

            </div>
            <div className="modal-footer">
              <button ref={CloseButtonRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeButton}>Close</button>
              <button type='submit' className="announcement-submit-btn btn" onClick={makeAnnouncement}>Confirm</button>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default ManageAnnouncements