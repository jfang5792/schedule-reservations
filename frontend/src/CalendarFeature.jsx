/* Calendar component of Scheduling Melon Tastings */

/* React Calendar Import */
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

/* React Hooks */
import { useState } from 'react';


export default function CalendarFeature() {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
      setDate(newDate);
      console.log('Date selected:', newDate);
    };

    return (
      <div>
        <div className='centerHeader'><h3>Pick a date to reserve</h3></div>
        <Calendar
          onChange={onChange}
          value={date}
          showNeighboringMonth={true} // hide days from neighboring months
          minDate={new Date()} // Disable dates before today
          // maxDate={new Date(2025, 1, 1)} // Disable dates after X date
          // tileDisabled={({ date, view }) => date.getDay() === 0} // Disable Sundays
        />
        <div className='timeRangeInput'><p>Enter a time range to display available appointments</p></div>
        <div className='dateSelected'><p>{date.toDateString()} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        </svg></p></div>
      </div>
    );
  }
