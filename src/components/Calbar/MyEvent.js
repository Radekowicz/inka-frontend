import React, {Component} from "react";

class MyEvent extends Component {
    render() {
        return <div>
            <div><b>Title:</b></div>
            <div>{this.props.event.title}</div>
            <div><b>Name:</b></div>
            <div>{this.props.event.name}</div>
        </div>
    }
}

export default MyEvent