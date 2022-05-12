import React, { useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './MyCalendar.css';

function MyCalendar() {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <div className="calendar-wrap">
                <Calendar onChange={onChange} value={value} />
            </div>
        </div>
    );
}

export default MyCalendar;
