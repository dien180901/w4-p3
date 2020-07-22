import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationName: null,
      temp: null,
      description: null
    };

  }
  componentDidMount() {
    this.getLocation();
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeather(post.coords.latitude, post.coords.longitude)
    })
  }
  async getWeather(latitude, longitude) {

    const API_KEY = "d564f1a009343f0e0733144706c082e9";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      locationName: data.name,
      temp: data.main.temp,
      description: data.weather[0].description

      // put in more here
    });
  };

  async Choice(name) {

    const API_KEY = "d564f1a009343f0e0733144706c082e9";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();
    console.log("dsa ", data);
    this.setState({
      locationName: data.name,
      temp: data.main.temp,
      description: data.weather[0].description

      // put in more here
    });
    console.log(this);
  };
  search(event) {
    event.preventDefault()
    console.log(document.getElementById("input").value);
    let d=document.getElementById("input").value;
   
    this.Choice(d);
  }
  render() {
    if (this.state.locationName == null) {
      return (
        <h1>waiting</h1>);
    }
    return (
      <>

        <div className="container-fluid text-white my-auto">
          <div className="container mx-auto my-4 py-4">
            <div className="row justify-content-center text-center">
              <Button variant="secondary" onClick={() => this.Choice("london")}>London</Button>
              <Button variant="secondary" onClick={() => this.Choice("bangkok")}>Bangkok</Button>{' '}
              <Button variant="secondary" onClick={() => this.Choice("tokyo")}>Tokyo</Button>{' '}
              <Button variant="secondary" onClick={() => this.Choice("sydney")}>Sydney</Button>{' '}
              <Button variant="secondary" onClick={() => this.Choice("kyoto")}>Kyoto</Button>{' '}
              <Button variant="secondary" onClick={() => this.Choice("shanghai")}>Shanghai</Button>{' '}
              <Button variant="secondary" onClick={() => this.Choice("seoul")}>Seoul</Button>{' '}
              <Button variant="secondary" onClick={() => this.Choice("busan")}>Busan</Button>{' '}
              <form>
                <label>
                  Name:
    <input type="text" name="name" id="input" />
                </label>
                <input type="submit" value="Submit" onClick={this.search.bind(this)} />
              </form>
              <h1 className="col-12 display-4 my-2 py-3 text-success">
                Awesome Weather App
            </h1>
              <h2 className="col-12">{this.state.locationName}</h2>
              <h3 className="col-12 text-danger">{this.state.temp}</h3>
              <h3 className="col-12">{this.state.description}</h3>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default App;
