import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker';

export default function DatetimePicke(props) {
    const { defaultDate, onChange } = props
    const [date, setDate] = useState(null)
    useEffect(() => setDate(defaultDate), [defaultDate])
    return (
        <DatePicker
          showTimeSelect isClearable
          selected={date}
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="yyyy-MM-dd HH:mm:00"
          onChange={ date => {
              setDate(date)
              onChange(date)
          }}
        />
    )
}

