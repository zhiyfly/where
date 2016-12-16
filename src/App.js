import React, { Component } from 'react';
import { Button, Label } from 'react-bootstrap';
import './App.css';
import 'whatwg-fetch';
import 'es6-promise';

class App extends Component {
  constructor() {
    super();
    this.state = {
      main: {}
    }
  }

  componentDidMount() {
    fetch('http://123.206.219.180:3000/where?mis=mashuangfei', {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*'
        },
        mode: 'cors'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data)
      this.setState({
        main: data
      })
    })
  }

  render() {
    return (
      <div>
        <h2 className="Title" >在哪儿</h2>
        <div className="Status">
          <Button bsStyle="success">上班</Button>
        </div>
        <div className="Status">
          <Button bsStyle="warning">暂离</Button>
        </div>
        <div className="Status">
          <Button bsStyle="danger">下班</Button>
        </div>
        {this.state.main.seats.map((seat, index) => {
            const seatView = (              
              <div 
                key={index}
                className="Seat"
              >
              <Label className="Seat-Row">{(index + 1) + "排"}</Label>
              {seat.map((user, index) => {
                let userView = null;
                switch (user.seatStatus) {
                  case -1:
                    userView = (
                      <Button
                        key={index}
                        className="Seat-Unknow"
                      >
                      </Button>
                    );
                    break;
                  case 0:
                    userView = (
                      <Button
                        key={index}
                        bsStyle="primary Seat-User"
                      >
                        {user.user.name}
                      </Button>
                    );
                    break;
                  case 1:
                    userView = (
                      <Button
                        key={index}
                        bsStyle="success Seat-User"
                      >
                        {user.user.name}
                      </Button>
                    );
                    break;
                  case 2:
                    userView = (
                      <Button
                        key={index}
                        bsStyle="warning Seat-User"
                      >
                        {user.user.name}
                      </Button>
                    );
                    break;
                  case 3:
                    userView = (
                      <Button
                        key={index}
                        bsStyle="danger Seat-User"
                      >
                        {user.user.name}
                      </Button>
                    );
                    break;
                   default:
                    break;
                }
                return userView;
              })}
              </div>);
            return seatView;
          })}
      </div>
    );
  }
}

export default App;
