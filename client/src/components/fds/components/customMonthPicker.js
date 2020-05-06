import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';

export default function CustomDatePicker(props) {
    const { originalDate, onChange } = props;
    const [pickerDate, setPickerDate] = useState(null);

    useEffect(() => setPickerDate(originalDate), [originalDate])

    return (
        <DatePicker
            showMonthYearPicker
            selected= {pickerDate}
            dateFormat= "yyyy-MM"
            onChange= {d => {
                setPickerDate(d)
                onChange(d)
            }}
        />
    )
}