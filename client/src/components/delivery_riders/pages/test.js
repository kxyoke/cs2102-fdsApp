import React from "react"
import ScheduleList from "./ScheduleList"
import axios from 'axios';
class Test extends React.Component {

    state = {
        scheduleList: [{ index: Math.random(), dayOfWeek: "1", startTime: "10:00", endTime: "10:00" }],
        message: "",
    }

    handleChange = (e) => {
        this.state.message = "";
        if (["dayOfWeek", "startTime", "endTime"].includes(e.target.name)) {
            let scheduleList = [...this.state.scheduleList]
            scheduleList[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }
    addNewRow = (e) => {
        this.setState((prevState) => ({
            scheduleList: [...prevState.scheduleList, { index: Math.random(), dayOfWeek: "1", startTime: "10:00", endTime: "10:00" }],
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.scheduleList[0].dayOfWeek);
        axios.post('/api/deliveryRider/parttimeschedule',  [this.state, this.props.weekNum],   {
            headers: {
                "Content-Type" : "application/json",
            }
        }).then(res=>{
            console.log(res);
            if(res.status === 200) {
                alert("Schedule is now updated!");
            }
            //TODO find out how redirect
        })
            .catch(err => {
                if(err.response.status === 422) {
                    console.log(err.response.data);
                    alert(err.response.data);
                }
            })

    }
    clickOnDelete(record) {
        this.setState({
            scheduleList: this.state.scheduleList.filter(r => r !== record)
        });
    }
    render() {
        let { scheduleList } = this.state
        return (
            <div className="content">
                <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-10">
                            <div className="container">
                                <div className="row justify-content-md-center">

                                    {this.state.message.length > 0 ?
                                        <div className="alert alert-danger" role="alert">
                                            <p className="text-center">
                                                <strong>{this.state.message}  </strong>
                                            </p>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header text-center">Editing Week {this.props.weekNum + 1} Schedule</div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="required" >Day of Week</th>
                                            <th className="required" >Start Time</th>
                                            <th>End Time</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <ScheduleList add={this.addNewRow} delete={this.clickOnDelete.bind(this)} scheduleList={scheduleList} />
                                        </tbody>
                                        <tfoot>
                                            <tr><td colSpan="4">
                                                <button onClick={this.addNewRow} type="button" className="btn btn-primary text-center">Add a new row<i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                                            </td></tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="card-footer text-center"> <button type="submit" className="btn btn-primary text-center">Submit</button></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default Test;