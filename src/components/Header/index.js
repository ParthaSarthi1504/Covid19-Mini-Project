import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {homeNavClicked: true, aboutNavClicked: false}

  navAboutLinkClicked = () => {
    this.setState({aboutNavClicked: true, homeNavClicked: false})
  }

  navHomeLinkClicked = () => {
    this.setState({homeNavClicked: true, aboutNavClicked: false})
  }

  render() {
    const {homeNavClicked, aboutNavClicked} = this.state

    console.log(homeNavClicked, aboutNavClicked)
    const homeWhiteColor = homeNavClicked ? 'white-nav-color' : ''
    const aboutWhiteColor = aboutNavClicked ? 'white-nav-color' : ''

    return (
      <nav className="nav-div">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683786494/COVID19INDIA_hpjj6o.png"
            className="covid-logo"
            alt="covidLogo"
          />
        </Link>
        <Link to="/">
          <button
            type="button"
            className={`home-navigation ${homeWhiteColor}`}
            onClick={this.navHomeLinkClicked}
          >
            Home
          </button>
        </Link>
        <Link to="/about">
          <button
            type="button"
            className={`about-navigation ${aboutWhiteColor}`}
            onClick={this.navAboutLinkClicked}
          >
            About
          </button>
        </Link>
      </nav>
    )
  }
}

export default Header
