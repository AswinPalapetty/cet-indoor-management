
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Student from './components/Student/Student';
import { useContext } from 'react';
import { studentContext } from './contexts/StudentContext';
import { staffContext } from './contexts/StaffContext';
import StudentLogin from './components/Student/StudentLogin';
import StudentSignup from './components/Student/StudentSignup'
import Staff from './components/Staff/Staff';
import StaffLogin from './components/Staff/StaffLogin';
import StaffSignup from './components/Staff/StaffSignup';
import Equipments from './components/Equipments/Equipments';
import Cart from './components/Cart/Cart';
import IndoorAttendance from './components/Attendance/IndoorAttendance'
import GymAttendance from './components/Attendance/GymAttendance'
import ManageEquipments from './components/ManageEquipments/ManageEquipments'
import ManageSlots from './components/ManageSlots/ManageSlots'
import ManageAnnouncements from './components/ManageAnnouncements/ManageAnnouncements'
import MyEquipments from './components/MyEquipments/MyEquipments';
import ManageRentals from './components/ManageRentals/ManageRentals';

function App() {
  const { student } = useContext(studentContext)
  const { staff } = useContext(staffContext)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='student' element={student ? <Student /> : <StudentLogin />} />
        <Route path='student/signup' element={student ? <Student /> : <StudentSignup />} />
        <Route path='student/equipments' element={student ? <Equipments /> : <StudentLogin />} />
        <Route path='student/cart' element={student ? <Cart /> : <StudentLogin />} />
        <Route path='staff' element={staff ? <Staff /> : <StaffLogin />} />
        <Route path='staff/signup' element={staff ? <Staff /> : <StaffSignup />} />
        <Route path='staff/indoorAttendance' element={staff ? <IndoorAttendance /> : <StaffLogin />} />
        <Route path='staff/gymAttendance' element={staff ? <GymAttendance /> : <StaffLogin />} />
        <Route path='staff/equipments' element={staff ? <ManageEquipments /> : <StaffLogin />} />
        <Route path='staff/slots' element={staff ? <ManageSlots /> : <StaffLogin />} />
        <Route path='staff/announcements' element={staff ? <ManageAnnouncements /> : <StaffLogin />} />
        <Route path='student/myEquipments' element={student ? <MyEquipments /> : <StudentLogin />} />
        <Route path='staff/rentals' element={staff ? <ManageRentals /> : <StaffLogin />} />
      </Routes>
    </div>
  );
}

export default App;
