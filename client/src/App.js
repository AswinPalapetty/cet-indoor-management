
import './App.css';
import {Route,Routes} from "react-router-dom";
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

function App() {
  const {student} = useContext(studentContext)
  const {staff} = useContext(staffContext)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='student' element={student ? <Student/> : <StudentLogin />}/>
        <Route path='staff' element={staff ? <Staff/> : <StaffLogin />}/>
        <Route path='equipments' element={student ? <Equipments/> : <StudentLogin />}/>
        <Route path='cart' element={student ? <Cart/> : <StudentLogin />}/>
        <Route path='staff/signup' element={staff ? <Staff/> : <StaffSignup/>}/>
        <Route path='student/signup' element={student ? <Student/> : <StudentSignup/>}/>
      </Routes>
    </div>
  );
}

export default App;
