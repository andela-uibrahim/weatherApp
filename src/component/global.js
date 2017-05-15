import React, { Component } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

let defaults = {
  size: 300,
  animate: true
};

/**
 * 
 * 
 * @class Global
 * @extends {Component}
 */
class Global extends Component {


  /**
   * Creates an instance of CreateDocument.
   * @param {any} props 
   * 
   * @memberof CreateDocument
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.setState({
      isLoading: true
    });
    const BASE_URL = 'http://ip-api.com/json/?callback';
      fetch(BASE_URL, { method: 'GET'})
        .then(response => 
          response.json()
        )
        .then(json => {
          this.setState({
            lat: json.lat,
            lon: json.lon,
            city: json.city,
            country: json.country,
            timezone: json.timezone,
          });
         })
        .then(()=> {
          const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=52c9c7c1a1600046a2ca67ff1f906033`
          fetch(URL, { method: 'GET'})
            .then(response => response.json())
            .then(json => {
              switch (json.weather[0].icon) {
                case '01d':
                  defaults.icon = 'CLEAR_DAY';
                  defaults.color = 'goldenrod';
                  break;
                case '01n':
                  defaults.icon = 'CLEAR_NIGHT';
                  defaults.color = 'white';
                  break;
                case '02d':
                  defaults.icon = 'PARTLY_CLOUDY_DAY';
                  defaults.color = 'goldenrod';
                  break;
                case '02n':
                  defaults.icon = 'PARTLY_CLOUDY_NIGHT';
                  defaults.color = 'white';
                  break;
                case '03d':
                  defaults.icon = 'CLOUDY';
                  defaults.color = 'goldenrod';
                  break;
                case '03n':
                  defaults.icon = 'CLOUDY';
                  defaults.color = 'white';
                  break;
                default:
                  defaults.icon = 'RAIN';
                  defaults.color = 'white';

              }
              this.setState({
                temp: parseInt(json.main.temp)-273,
                cloud: json.weather[0].main,
                isLoading: false 
              })
            })
        })
  }

  render(){
    if(this.state.isLoading){
      return null
    }
    return (
      <div className="row">
        <div className="col s4"/>
        <div className="main center col s4"> 
          <h2>Country: {this.state.country}</h2>
          <h3>{this.state.city} City</h3>
          <h4>{this.state.timezone} Timezone</h4>
          <br/>
          <h4>{this.state.temp}<sup>o</sup>C</h4>
          <h4>{this.state.cloud}</h4>
            <ReactAnimatedWeather
              icon={defaults.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />

        </div>
      </div>
     )
  }
}

export default Global;
