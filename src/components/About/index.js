import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import CartContext from '../../Context/CartContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {faq: [], apiStatus: apiStatusConstants.inProgress}

  componentDidMount() {
    this.getPreviousQuestion()
  }

  getPreviousQuestion = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const {faq} = data

      this.setState({
        faq,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobs-failure-button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="aboutRouteLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderFaqView = () => {
    const {faq} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {isDark} = value
          const darkHeading = isDark ? '' : 'dark-heading'
          const darkPara = isDark ? '' : 'dark-para'
          return (
            <>
              <h1 className={`about-heading ${darkHeading}`}>About</h1>
              <h1 className={`about-para ${darkPara}`}>
                COVID-19 vaccines be ready for distribution
              </h1>
              <ul className="about-faq-ul-div" data-testid="faqsUnorderedList">
                {faq.map(each => (
                  <li key={each.qno} className="about-faq-li">
                    <p className="question">{each.question}</p>
                    <p className="answer">{each.answer}</p>
                  </li>
                ))}
              </ul>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }

  getFaq = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFaqView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {isDark} = value
          const AboutLightTheme = isDark ? '' : 'about-light-theme'
          return (
            <div className={`bg-container ${AboutLightTheme}`}>
              <Header />
              <div className="bottom-container">{this.getFaq()}</div>
              <div className="footer-alignment">
                <Footer />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default About
