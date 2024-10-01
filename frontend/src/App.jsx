/* Main page of Scheduling Melon Tastings */

/* React Hooks */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* React Bootstrap Components */
import {Navbar} from 'react-bootstrap';

/* Styling Imports */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-calendar/dist/Calendar.css';

/* Components */
import Navibar from './Navibar';


/* Route Imports */
import Register from './Register';
import Login from './Login';
import CalendarFeature from './CalendarFeature';
import Reservations from './Reservations';
import MelonPairings from './MelonPairings';


function App() {

  return (
    <>
      <Router>
        <Navibar/>
        <div className='mainPageItems'>
          <CalendarFeature/>
          <MelonPairings/>
        </div>
        <Routes>
          <Route path="/login" element={<Login/>}/><Route/>
          <Route path="/register" element={<Register/>}/><Route/>
          <Route path="/reservations" element={<Reservations/>}/><Route/>
          <Route path="/" element={<Navbar/>}/><Route/>
        </Routes>
      </Router>
    </>
  );
}


export default App
