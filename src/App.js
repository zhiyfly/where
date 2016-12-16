import React, { Component } from 'react';
import { Button, Label, Image } from 'react-bootstrap';
import Alert from 'react-bootstrap-alert';
import './App.css';
import 'whatwg-fetch';
import 'es6-promise';
import Avatar from 'react-avatar';


class SeatTable extends Component {
  constructor() {

    super();
    this.state = {
      seats: null,
    }
  }

  componentDidMount() {
    console.log("conponentDidMount");
    this.fetchSeatTable()
  }

  fetchSeatTable() {
    fetch('http://123.206.219.180:3000/where?mis=mashuangfei', {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*'
        },
        mode: 'cors'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("success");
      console.log(data)
      this.setState({
        seats: data.seats
      })
    })
  }

  checkIn() {
    console.log("checkIn");
    fetch('http://123.206.219.180:3000/where/bind?row=4&col=3&name=洪光焰&mis=hongguangyan&seatStatus=1', {
      method:'GET',
      headers: {
          'Accept': 'application/json, text/plain, */*'
        },
      mode: 'cors'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.result === "success") {
        console.log("checkIn success");
        this.fetchSeatTable();
      }
    })
  };

  render() {
    const seats = this.state.seats;
    if (seats != null && seats.length > 0) {
      var seatTable = seats.map((row, index) => {
            var seatView = (              
              <div 
                key={index}
                className="Seat"
              >
              <Label className="Seat-Row">{(index + 1) + "排"}</Label>
              <Label className="black"></Label>
              {row.map((col, index) => {
                let userView = null;
                switch (col.seatStatus) {
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
                        onClick={this.checkIn.bind(this)}
                      >
                        {col.user.name}
                      </Button>
                    );
                    break;
                  case 1:
                    userView = (
                      <Button
                        key={index}
                        bsStyle="success Seat-User"
                        onClick={() => {
                          console.log("xxx");
                          var retVal = confirm("Do you want to continue ?");
                          if( retVal == true ){
                              console.log("User wants to continue!");
                          }
                          else{
                              console.log("User does not want to continue!");
                          }
                          }
                        }
                        >
                        {col.user.name}
                      </Button>
                    );
                    break;
                  case 2:
                    userView = (
                      <Button
                        key={index}
                        bsStyle="warning Seat-User"
                        onClick={() => {alert(col.user.name+"不在座位了") }}
                      >
                        {col.user.name}
                      </Button>
                    );
                    break;
                  case 3:
                    userView = (
                      <Button
                        key={index}
                        bsStyle="danger Seat-User"
                        onClick={() => {alert(col.user.name+"下班了") }}
                      >
                        {col.user.name}
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
          });
      return <div>{seatTable}</div>
    } else {
      return <div className="loading">loading...</div>
    }
  }
}


class App extends Component {
  constructor() {

    super();
    this.state = {
      user: {
        "name":"曹立成",
        "misID":"caolicheng",
        "avatar":"http://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile4/68f368d9-a6cc-477a-b9c5-4fd7f20d5bc2_200_200"
      }
    }
  }

  render() {
    return (
      <div>
        <h2 className="Title" >在哪儿</h2>
        <Avatar size="100" src={this.state.user.avatar} size="60" />
        <div className="Status">
          <Button bsStyle="success">上班</Button>
        </div>
        <div className="Status">
          <Button bsStyle="warning">暂离</Button>
        </div>
        <div className="Status">
          <Button bsStyle="danger">下班</Button>
        </div>
        <SeatTable user={this.state.user}>
       </SeatTable>
      </div>
    );
  }
}

export default App;
