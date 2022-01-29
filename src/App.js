import {Component} from 'react'

// import {Loader} from 'react-loader-spinner'

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './App.css'

class App extends Component {
  state = {
    search: 'Delhi',
    uday: [],
    apiStatus: true,
  }

  componentDidMount() {
    this.getDetails()
  }

  searchCity = event => {
    this.setState({search: event.target.value})
  }

  press = event => {
    const {search} = this.state
    if (event.key === 'Enter') {
      const getdata = localStorage.getItem('name')
      if (getdata === null) {
        localStorage.setItem('name', search)
        this.setState({search}, this.getDetails)
      } else {
        localStorage.removeItem('name')
        localStorage.setItem('name', search)
        this.setState({search}, this.getDetails)
      }
    }
  }

  getDetails = async () => {
    const namedata = localStorage.getItem('name')
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${namedata}&appid=c3e89bc97eb6bd54a4b2b7ea34b98c35 `
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const ram = {
        temp: data.main.temp,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        weather: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        name: data.name,
      }
      this.setState({uday: ram, search: '', apiStatus: true})
    } else if (response.status === 404) {
      this.setState({search: '', apiStatus: false})
    }
  }

  renderSuccess = () => {
    const {apiStatus, uday, search} = this.state
    const {temp, minTemp, maxTemp, weather, humidity, pressure, name} = uday
    return (
      <div className="background1">
        {apiStatus ? (
          <>
            <input
              type="text"
              value={search}
              className="input"
              onChange={this.searchCity}
              onKeyPress={this.press}
              placeholder="Enter the city name"
            />
            <div className="uday">
              <h1>{name}</h1>
            </div>

            <h1>{temp} F</h1>
            <h2>{weather}</h2>
            <p>Coldest Temperature: {minTemp} F </p>
            <p>Warmest Temperature: {maxTemp} F </p>
            <div className="uday">
              <p>Humidity :{humidity} </p>
              <p>Pressure :{pressure} </p>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              value={search}
              className="input"
              onChange={this.searchCity}
              onKeyPress={this.press}
              placeholder="Enter the city name"
            />
            <h1>Country is not Found</h1>
          </>
        )}
      </div>
    )
  }

  //   renderFailure = () => {
  //     const {search} = this.state
  //     return (
  //       <div className="background1">
  //         <input
  //           type="text"
  //           value={search}
  //           className="input"
  //           onChange={this.searchCity}
  //           onKeyPress={this.press}
  //           placeholder="Enter the city name"
  //         />
  //         <h1>Country is not Found</h1>
  //       </div>
  //     )
  //   }

  //   renderLoading = () => (
  //     <div className="background1">
  //       <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  //     </div>
  //   )

  render() {
    return <div className="background">{this.renderSuccess()}</div>
  }
}

export default App
