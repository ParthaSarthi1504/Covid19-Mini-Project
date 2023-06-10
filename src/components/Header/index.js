import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdCancel, MdLightMode, MdNightlight} from 'react-icons/md'
import CartContext from '../../Context/CartContext'
import './index.css'

class Header extends Component {
  state = {isBarClicked: false}

  clickingThreeBars = () => {
    console.log('triggered')
    this.setState(prevState => ({
      isBarClicked: !prevState.isBarClicked,
    }))
  }

  cancelPopup = () => {
    this.setState({isBarClicked: false})
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {isDark, changeTheme} = value

          const toggleTheme = () => {
            changeTheme()
          }
          const lightHeaterTheme = isDark ? '' : 'light-header-theme'
          const darkCrossLogo = isDark ? '' : 'dark-cross-logo'
          const {isBarClicked} = this.state

          const hidePopup = !isBarClicked ? 'hide-pop-up' : ''
          return (
            <>
              <nav className={`nav-div ${lightHeaterTheme}`}>
                <Link to="/" className="under-line">
                  <img
                    src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683786494/COVID19INDIA_hpjj6o.png"
                    className="covid-logo"
                    alt="covidLogo"
                  />
                </Link>

                <div className="nav-navigation-div">
                  <div className="home-about-btn-div">
                    <Link to="/" className="under-line">
                      <button type="button" className="home-navigation">
                        Home
                      </button>
                    </Link>
                    <Link to="/about" className="under-line">
                      <button type="button" className="about-navigation">
                        About
                      </button>
                    </Link>
                  </div>
                  {isDark ? (
                    <MdLightMode
                      className="light-mode-icon"
                      onClick={toggleTheme}
                    />
                  ) : (
                    <MdNightlight
                      className="light-mode-icon"
                      onClick={toggleTheme}
                    />
                  )}
                  <img
                    src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684162791/add-to-queue_1_ihvesd.png"
                    className="threeBars"
                    alt="three bars"
                    onClick={this.clickingThreeBars}
                  />
                </div>
              </nav>
              <div className={`pop-up ${hidePopup}`}>
                <div>
                  <Link to="/" className="under-line">
                    <button type="button" className="home-navigation2">
                      Home
                    </button>
                  </Link>
                  <Link to="/about" className="under-line">
                    <button type="button" className="about-navigation2">
                      About
                    </button>
                  </Link>
                </div>
                <MdCancel
                  className={`cross-logo ${darkCrossLogo}`}
                  onClick={this.cancelPopup}
                />
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Header
