import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  setPatient = (event) => {
    this.setState({ value: event.target.value }, () =>
      this.props.setPatient(this.state.value)
    );
  };

  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input
          type="text"
          className="form-control"
          value={this.state.value}
          onChange={this.setPatient}
        />
      </div>
    );
  }
}
export default Input;
