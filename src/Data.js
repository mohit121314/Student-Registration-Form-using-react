import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
export default class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      i: null
    };
  }

  componentDidMount() {
    this.getlist();
  }

  getlist = () => {
    let l = JSON.parse(localStorage.getItem("data"));
    this.setState(
      {
        list: l
      });

  };

  handledelete = (i) => {
    let dele = JSON.parse(localStorage.getItem("data"));
    var filter = dele.filter((item) => {
      return item.name !== i;
    });
    localStorage.setItem("data", JSON.stringify(filter));
    this.setState({
      list: filter
    });

  }

  render() {
    return (
      <div className="main">
        <div className="Header1">
          <h1 className="datah">Student List</h1>
          <Link to="/data" className="link"><Fab color="red" aria-label="add">
            <AddIcon />
          </Fab></Link>
        </div>

        <div className="tablediv">
          <table>
            <tr>
              <th>Name</th>
              <th>Qualification</th>
              <th>Contact</th>
              <th>Mother's Name</th>
              <th>Action</th>
            </tr>

            {this.state.list
              ? this.state.list.map((item, index) => {
                return (
                  <tr key={index} className="datarow">
                    <td className="data">{item.name}</td>
                    <td className="data">{item.qualification}</td>
                    <td className="data">{item.phone}</td>
                    <td className="data">{item.mother}</td>
                    <td className="data1" onClick={() => this.handledelete(item.name)}><img src={require('./trash_can.png')} />
                      <span onClick={() => this.props.history.push(`/data/${index}`)}> <img src={require('./pencil.png')} /></span>
                    </td>
                  </tr>
                );
              })
              : "no data found"}
          </table>
        </div>
      </div>
    );
  }
}
