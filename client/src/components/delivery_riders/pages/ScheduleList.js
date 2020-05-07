import React from "react"
const ScheduleList = (props) => {
    return (
         props.scheduleList.map((val, idx) => {
            let dayOfWeek = `dayOfWeek-${idx}`, task = `task-${idx}`, startTime = `startTime-${idx}`, endTime = `endTime-${idx}`
            return (
                <tr key={val.index}>
                    <td>
                        <select name="dayOfWeek" data-id={idx} id={dayOfWeek} className="form-control " >
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                            <option value="7">Sunday</option>
                        </select>
                    </td>
                    <td>
                        <select name="startTime" id={startTime} data-id={idx} className="form-control" >
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                        </select>
                    </td>
                    <td>
                        <select name="endTime" id={endTime} data-id={idx} className="form-control" >
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                        </select>
                    </td>
                    <td>
                        {
                            idx===0?<button onClick={()=>props.add()} type="button" className="btn btn-primary text-center">Add<i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                                : <button className="btn btn-danger" onClick={(() => props.delete(val))} >Delete<i className="fa fa-minus" aria-hidden="true"></i></button>
                        }
                    </td>
                </tr >
            )
        })
    )
}
export default ScheduleList