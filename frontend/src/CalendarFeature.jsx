/* Calendar component of Scheduling Melon Tastings */

/* React Calendar Import */
import Calendar from 'react-calendar';

import Icon from '@reacticons/bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

/* React Bootstrap Components */
import {Modal, Button, Row, Col} from 'react-bootstrap';

/* React Hooks */
import { useState } from 'react';
import MelonPairings from './MelonPairings';


export default function CalendarFeature() {
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [times, setTimes] = useState(null);
    const [timeRange, setTimeRange] = useState(null);
    const [disableTime, setDisableTime] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [clearSelection, setClearSelection] = useState(false);

    const handleDateClick = (newDate) => {
      setDate(newDate);
      console.log('Date selected:', newDate);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleReservationsBtnClick = async (whenButtonClick) => {
      setTimes(whenButtonClick);
      setSelectedTime(whenButtonClick);
      setDisableTime(whenButtonClick);
      console.log('Disabled time at:', whenButtonClick);
      setClearSelection(true);
      // await new Promise(resolve => setTimeout(resolve, 4000));
      // handleCloseModal();
    };

    const handleTimeRangeSelect = (range) => {
      setTimeRange(range);
      console.log('When:', range);
    };

    const handleClearSelection = () => {
      setDisableTime(null);
      setTimes(null);
      setSelectedTime(null);
      setClearSelection(false);
    };

    const SelectedTimeDisplay = ({ selectedTime, onClear }) => {
      if (!selectedTime) {
        return null;
      } else {

      }
      return (
        <div className="text-center mt-3">
          <Row className="w-100">
          <Col s={2}>
          <div>Selected: {selectedTime} in {timeRange}</div>
          <Button style={{ marginRight: '10px' }} onClick={onClear}>
            Confirm Time
          </Button>
          <Button onClick={onClear}>
            Clear Selection
          </Button>
          </Col>
          </Row>
        </div>
      );
    };

    const renderRanges = () => {
      const ranges = ['Morning', 'Afternoon', 'Evening'];
      return (
        <Row className="justify-content-between g-2">
        {ranges.map((range) => (
          <Col key={range} xs={12} sm={4} className="d-flex justify-content-center">
            <Button
              variant={timeRange === range ? 'primary' : 'outline-primary'}
              onClick={() => handleTimeRangeSelect(range)}
            >
              {range}
            </Button>
          </Col>
        ))}
      </Row>
      )
    }

    const timeOptions = {
      Morning: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
      Afternoon: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
      Evening: ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM']
    };

    return (
    <div className='entireCalendar'>
        <Calendar className='calendarCssTag'
          onChange={handleDateClick}
          value={date}
          showNeighboringMonth={true} // hide days from neighboring months
          minDate={new Date()} // Disable dates before today
        />

        <div className='dateSelected'>Date: {date.toDateString()} <Icon name="calendar3"/></div>
        <div className='timeRangeModal'>
        <Button variant="success" onClick={handleShowModal}>
          Schedule a Reservation
        </Button>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="w-100">
            <div className="d-flex flex-column align-items-center">
              <h5 className="m-2">Select below to display times</h5>
                {renderRanges()}
            </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
  {timeRange && (
    <Row className="g-2 mb-3">
      {timeOptions[timeRange].map((whenButtonClick) => (
        <Col key={whenButtonClick} xs={6} sm={4} md={3} className="d-flex justify-content-center">
          <Button
            variant={disableTime === whenButtonClick ? "secondary" : "outline-primary"}
            className="w-100"
            onClick={() => handleReservationsBtnClick(whenButtonClick)}
            disabled={disableTime === whenButtonClick}
          >
            {whenButtonClick}
          </Button>
        </Col>
      ))}
    </Row>
  )}
  <SelectedTimeDisplay
    selectedTime={selectedTime}
    onClear={handleClearSelection}
  />
          </Modal.Body>
        </Modal>
    </div>
  );
}
