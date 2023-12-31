import React from 'react'
import './Content.css'
import indoor2 from '../../images/indoorout2.jpg'

function Content() {
    return (
        <div className="container-fluid">
            <div className="content">
                <h2 className="text-center title"><span className="first-letter">I</span>NDOOR <span className="first-letter">S</span>PORTS<span className="first-letter"> H</span>UB</h2>
                <div className="row mt-3">
                    <div className="col-md-6 mb-4">
                        <img src={indoor2} alt="About" width="100%" className="rounded" />
                    </div>
                    <div className="col-md-6 mb-4 text-muted" style={{ fontSize: "15px" }}>
                        <div><span style={{ fontWeight: "600" }}>The Indoor Court Management System</span> is a transformative solution designed to streamline and modernize the management of our college's indoor sports facilities.</div>
                        <div className="mt-2">This web application enhances the student experience by allowing them to mark their gym attendance and book court slots effortlessly. With an emphasis on preventing data loss and ensuring data accuracy through secure database storage, this system minimizes the administrative burden on staff members.</div>
                        <div className="mt-2">It's a step towards creating a more convenient and organized environment for sports and fitness enthusiasts on campus, promoting effective resource management and encouraging active participation. Welcome to the future of indoor sports facility management at our college.</div>
                        <div className="mt-2">In addition to attendance tracking and court bookings, the Indoor Court Management System fosters a sense of community by facilitating sports events and tournaments. Students can easily organize and participate in various competitions, promoting camaraderie and healthy competition.</div>
                        <div className="mt-2">The system's user-friendly interface ensures that students and staff can stay updated on upcoming events, match schedules, and facility availability. By integrating a comprehensive notification system, users receive timely alerts about their bookings, upcoming matches, and any changes in the schedule.</div>
                    </div>
                    <div className="col-12 text-muted" style={{ fontSize: "15px" }}>
                        <div className="mb-1" style={{ fontSize: '15px', fontWeight: "700" }}>Main objectives of Indoor SportsHub are :</div>
                        <ul className="content-ul text-muted">
                            <li>Streamline attendance tracking for students using indoor sports facilities. The system aims to replace manual record-keeping with a digital solution, reducing errors and data loss.</li>
                            <li>Simplify the process of renting sports equipment by enabling students to book items online. The system will maintain a record of borrowed items, automatically assign due dates, and send reminders, reducing the burden on staff and improving accountability.</li>
                            <li>Provide students with the convenience of booking slots for various indoor courts, including badminton, basketball, and volleyball. This feature optimizes resource utilization and ensures a fair and organized approach to court reservations.</li>
                            <li>Enable students to mark their gym attendance through an online portal, enhancing the user experience and making it easier for staff to track participation.</li>
                            <li>Ensure data security by storing information in a robust database, reducing the chances of data loss and errors. This objective guarantees reliable and consistent information management.</li>
                        </ul>
                    </div>
                </div>

                <div className="row mt-3">
                    <h2 className="text-center title"><span className="first-letter">D</span>epartment of <span className="first-letter">P</span>hysical<span className="first-letter"> E</span>ducation</h2>
                    <div className="col-12 mt-4 mb-4 text-muted" style={{ fontSize: "15px" }}>
                        <div><span style={{ fontWeight: "600" }}>The Physical Education Department</span> at our college offers a wide range of state-of-the-art facilities to cater to the diverse sporting and fitness needs of our students. One of the highlights is the Multi-Purpose Indoor Hall, a dynamic space that boasts a fully-equipped Basketball Court, Two Shuttle Badminton Courts, and Four Table Tennis Boards. This indoor arena not only provides a venue for sports enthusiasts but also fosters a sense of community and camaraderie among students. It's a hub of activity and a place where students can hone their skills, engage in friendly competition, and stay active throughout the year.</div>
                        <div className="mt-2">In addition to the indoor facilities, our college takes fitness seriously with a well-equipped Fitness Centre. Here, students have access to modern Cardio and Weight Training Equipment, which includes Multi-station Gyms, Treadmills, Elliptical Cycles, Dumbbells, Weight bars, Weight plates, and more. This facility promotes a healthy lifestyle and encourages students to maintain their physical well-being while pursuing their academic goals.</div>
                        <div className="mt-2">Furthermore, the Physical Education Department extends its reach beyond the campus boundaries with a well-maintained Outdoor Stadium. This extensive area comprises a 200-meter Track, a Football field, a Cricket ground, Handball courts, and Kabbadi courts. Our college also provides specialized training areas, such as Cricket Nets for cricket enthusiasts, Volleyball Courts for those who enjoy team sports, and an Outdoor Basketball Court. These facilities, coupled with fitness centers at both the Men's and Women's Hostels, reflect our college's commitment to fostering a culture of health, wellness, and active engagement among its students, providing a holistic education that goes beyond the classroom.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content