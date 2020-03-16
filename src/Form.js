import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: {
        name: "",
        qualification: "",
        phone: "",
        mother: ""
      },
      arr: []
    };
  }

  componentWillMount() {
    var data
    var payload = JSON.parse(JSON.stringify(this.state.payload))

    if (this.props.match.params.id) {
      data = JSON.parse(localStorage.getItem("data"))
      payload = data[this.props.match.params.id]
      this.setState({
        payload
      })
    }
  }

  handlechange = e => {
    let data = JSON.parse(JSON.stringify(this.state.payload));
    data[e.target.id] = e.target.value;
    this.setState({ payload: data });
  };

  handlesubmit = event => {
    if (this.props.match.params.id) {
      event.preventDefault();
      let server = JSON.parse(localStorage.getItem("data"));

      server[this.props.match.params.id] = this.state.payload


      localStorage.setItem("data", JSON.stringify(server));

    }
    else {
      event.preventDefault();

      if (localStorage["data"] === undefined) {
        let arr = [];
        arr.push(this.state.payload);
        localStorage.setItem("data", JSON.stringify(arr));
      } else {
        let serverData = JSON.parse(localStorage.getItem("data"));
        serverData.push(this.state.payload);
        this.setState({
          arr: serverData
        })
        localStorage.setItem("data", JSON.stringify(serverData));
      }
    }

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="mian">
        <div className="Header">
          <Link to="/"><img src={require('./baseline_keyboard_backspace_black_18dp.png')} /></Link>
          <h1 className="formh">Add a New Student</h1>
        </div>
        <form onSubmit={this.handlesubmit}>
          <p>Name:</p>
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            value={this.state.payload.name}
            onChange={this.handlechange}
          />
          <p>Qualification:</p>
          <input
            type="text"
            placeholder="Highest Qualification"
            id="qualification"
            value={this.state.payload.qualification}
            onChange={this.handlechange}
          />
          <p>Mother's Name:</p>
          <input
            type="text"
            placeholder="Mother's Name"
            id="mother"
            onChange={this.handlechange}
            value={this.state.payload.mother}
          />
          <p>Contact:</p>
          <input
            type="text"
            placeholder="Contact"
            id="phone"
            onChange={this.handlechange}
            value={this.state.payload.phone}
          />
          <input type="submit" value="Add Student" />
        </form>
      </div>
    );
  }
}
