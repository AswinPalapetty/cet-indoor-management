import React, { useEffect, useState } from 'react'
import './Announcements.css'
import StudentNavBar from '../StudentNavBar/StudentNavBar'
import axios from '../../utilities/Axios'
import Cookies from 'universal-cookie';
import ClipLoader from 'react-spinners/ClipLoader';

function Announcements() {
  const cookies = new Cookies();
  const [Announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const jwtToken = cookies.get("jwt_authorization")
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios.get('/student/getAnnouncements', { headers: { Authorization: `Bearer ${jwtToken}` } }).then((result) => {
      setAnnouncements(result.data.announcements);
      setLoading(false);
    })
  }, [])

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
      <StudentNavBar />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2 className="text-center announcement-title mb-3"><span className="first-letter">A</span>NNOUNCEMENTS</h2>

          {
            (Announcements.length > 0) ?
              <div>
                {Announcements.map((rowData) => {
                  const date = new Date(rowData.createdAt);
                  const newDate = date.toLocaleDateString('en-GB');

                  return (
                    <div className="col-12 mb-3">
                      <div className="posts" data-bs-toggle="modal" data-bs-target="#announcement">
                        <i className="fa-duotone fa-megaphone announcement-icon"></i>
                        <div className="posts-body">
                          <div className="posts-title" style={{ fontSize: "16px", fontWeight: "500" }}>{rowData.title}</div>
                          <div className="posts-date" style={{ fontSize: "12px" }}>{newDate}</div>
                        </div>
                      </div>

                      {/* MODAL */}
                      <div className="modal fade" id="announcement" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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

    </div>
  )
}

export default Announcements