import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function DatePickerComponent() {
    const [startDate, setStartDate] = useState(new Date());
    const date = new Date();
    return <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />;
}

export default DatePickerComponent;
