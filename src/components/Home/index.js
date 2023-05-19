import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import StateList from '../StateList'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const stateCodeData = statesList.map(each => ({
  stateCode: each.state_code,
  stateName: each.state_name,
}))

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
    stateWiseCases: null,
    statesListData: [],
    searchListItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCovidDetails()
  }

  getCovidDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      console.log(data.AP)

      const updatedSimilarData = statesList.map(each => ({
        stateCode: each.state_code,
        stateName: each.state_name,
      }))
      let totalConfirmed = 0
      let totalActive = 0
      let totalRecovered = 0
      let totalDeceased = 0

      const dummy = updatedSimilarData.map(eachState => {
        const {stateCode} = eachState
        const state = data[stateCode]
        const totalCasesObj = state.total
        totalConfirmed += totalCasesObj.confirmed
        totalActive +=
          totalCasesObj.confirmed -
          (totalCasesObj.recovered + totalCasesObj.deceased)
        totalRecovered += totalCasesObj.recovered
        totalDeceased += totalCasesObj.deceased
        return eachState
      })
      this.setState({
        totalConfirmed,
        totalActive,
        totalRecovered,
        totalDeceased,
        stateWiseCases: data,
        statesListData: updatedSimilarData,
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
    <div className="loader-container" data-testid="homeRouteLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  ascendingOrderSorting = () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {statesListData} = this.state
    statesListData.sort((a, b) => {
      const k = a.stateName.toLowerCase()
      const l = b.stateName.toLowerCase()
      if (k < l) {
        return -1
      }
      if (k > l) {
        return 1
      }
      return 0
    })
    console.log(statesListData)
    this.setState({statesListData, apiStatus: apiStatusConstants.success})
  }

  descendingOrderSorting = () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {statesListData} = this.state
    statesListData.sort((a, b) => {
      const k = a.stateName.toLowerCase()
      const l = b.stateName.toLowerCase()
      if (k < l) {
        return 1
      }
      if (k > l) {
        return -1
      }
      return 0
    })
    console.log(statesListData)
    this.setState({statesListData, apiStatus: apiStatusConstants.success})
  }

  renderCovidDetailsView = () => {
    const {
      totalConfirmed,
      totalActive,
      totalRecovered,
      totalDeceased,
      stateWiseCases,
      statesListData,
    } = this.state

    return (
      <>
        <div className="card-container">
          <div
            data-testid="countryWideConfirmedCases"
            className="specific-card"
          >
            <h1 className="confirm">Confirmed</h1>
            <img
              src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683806914/Vector_hsmmhq.png"
              className="confirm-logo"
              alt="country wide confirmed cases pic"
            />
            <p className="confirmed-count">{totalConfirmed}</p>
          </div>
          <div data-testid="countryWideActiveCases" className="specific-card">
            <h1 className="active">Active</h1>
            <img
              src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683808560/protection_1_uqvvm7.png"
              className="active-logo"
              alt="country wide active cases pic"
            />
            <p className="active-count">{totalActive}</p>
          </div>
          <div
            data-testid="countryWideRecoveredCases"
            className="specific-card"
          >
            <h1 className="recover">Recovered</h1>
            <img
              src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683811796/Vector_2_x3skhp.png"
              className="recover-logo"
              alt="country wide recovered cases pic"
            />
            <p className="recover-count">{totalRecovered}</p>
          </div>
          <div data-testid="countryWideDeceasedCases" className="specific-card">
            <h1 className="decease">Deceased</h1>
            <img
              src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683812143/Outline_cgxfbn.png"
              className="decease-logo"
              alt="country wide deceased cases pic"
            />
            <p className="decease-count">{totalDeceased}</p>
          </div>
        </div>
        <div className="wrapping-case-table">
          <div className="case-table" data-testid="stateWiseCovidDataTable">
            <ul className="case-table-ul-row">
              <li className="case-table-columns state-name">
                State/UT
                <div data-testid="stateWiseCovidDataTable">
                  <button
                    type="button"
                    data-testid="ascendingSort"
                    className="sort-btn"
                    onClick={this.ascendingOrderSorting}
                  >
                    <FcGenericSortingAsc className="sort-logo" />
                  </button>
                  <button
                    type="button"
                    data-testid="descendingSort"
                    className="sort-btn"
                    onClick={this.descendingOrderSorting}
                  >
                    <FcGenericSortingDesc className="sort-logo" />
                  </button>
                </div>
              </li>
              <li className="case-table-columns">Confirmed</li>
              <li className="case-table-columns">Active</li>
              <li className="case-table-columns">Recovered</li>
              <li className="case-table-columns">Deceased</li>
              <li className="case-table-columns">Population</li>
            </ul>
            <hr className="hr-rule" />
            {statesListData.map(eachState => {
              const {stateCode} = eachState
              return (
                <ul className="case-table-ul-row sizing">
                  <StateList
                    stateDetails={eachState}
                    stateCases={stateWiseCases[stateCode]}
                  />
                </ul>
              )
            })}
          </div>
        </div>
        <div className="footer-alignment">
          <Footer />
        </div>
      </>
    )
  }

  getStateWiseCovidDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovidDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getStateDropdown = event => {
    if (event.target.value !== '') {
      this.setState({apiStatus: apiStatusConstants.initial})
      const filteredSearchData = stateCodeData.filter(each =>
        each.stateName.toLowerCase().includes(event.target.value.toLowerCase()),
      )
      this.setState({searchListItems: filteredSearchData})
    } else {
      this.setState({searchListItems: []}, this.getCovidDetails)
    }
  }

  render() {
    const {searchListItems} = this.state
    return (
      <div className="bg-div">
        <Header />
        <div className="search-box-container">
          <BsSearch className="search-icon" />
          <input
            type="search"
            className="search-input"
            placeholder="Enter the State"
            onChange={this.getStateDropdown}
          />
        </div>
        <ul
          className="search-drop-down"
          data-testid="searchResultsUnorderedList"
        >
          {searchListItems.map(each => (
            <>
              <Link
                to={`/state/${each.stateCode}`}
                className="direct-to-states"
                data-testid="searchResultsUnorderedList"
              >
                <li className="search-option">
                  <p className="search-option-state-name">{each.stateName}</p>
                  <div className="search-box-state-code-div">
                    <h1 className="search-box-state-code">{each.stateCode}</h1>
                    <BiChevronRightSquare className="right-square" />
                  </div>
                </li>
              </Link>
              <hr className="search-option-hr-rule" />
            </>
          ))}
        </ul>
        <div className="bottom-container">
          {this.getStateWiseCovidDetails()}
        </div>
      </div>
    )
  }
}

export default Home
