/* React Hooks */
import { useState } from 'react';

import Login from './Login'
import NavbarComponent from './Navibar'

export default function Reservations() {
    const [times, setTimes] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [disableTime, setDisableTime] = useState(null);

    const [reservations, setReservations] = useState("")
    const [confirmTime, setConfirmedTime] = useState(false)

    //handle action when `Confirm Time` btn is clicked
    //save resy to db on user_id or username?
    const handleConfirmTimeBtn = async (btnClick) => {
        setTimes(btnClick);
        setSelectedTime(btnClick);
        setDisableTime(btnClick);
        console.log('Confirming time --:', btnClick);
        print('Confirming time selected:', btnClick)

      }


    return (
        pass
    )

}
