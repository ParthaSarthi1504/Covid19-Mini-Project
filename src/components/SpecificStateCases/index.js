import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
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

class SpecificStateCases extends Component {
  state = {
    stateData: [],
    isConfirmCardClicked: true,
    isActiveCardClicked: false,
    isRecoverCardClicked: false,
    isDeceaseCardClicked: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSpecificStateCases()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []

    const keyNames = Object.keys(data)
    console.log(keyNames)

    keyNames.forEach(keyName => {
      console.log(keyName)
      if (data[keyName]) {
        const {total} = data[keyName]

        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        resultList.push({
          stateName: keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  getSpecificStateCases = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const NeededState = data[`${id}`]
      console.log(NeededState)
      this.setState({
        stateData: NeededState,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    // eslint-disable-next-line
    const {id} = params
    return (
      <div className="job-item-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="job-item-failure-img"
        />
        <h1 className="job-item-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="job-item-failure-description">
          We cannot seem to find the page you are looking for
        </p>

        <button
          type="button"
          data-testid="button"
          className="job-item-failure-button"
          onClick={this.getJobData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container2" data-testid="homeRouteLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  getFormattedMetaData = meta => ({
    date: meta.date,
    lastUpdated: meta.last_updated,
    population: meta.population,
    tested: meta.tested,
    vaccinated: meta.vaccinated,
  })

  changeDeceaseCardBg = () => {
    this.setState({
      isConfirmCardClicked: false,
      isActiveCardClicked: false,
      isRecoverCardClicked: false,
      isDeceaseCardClicked: true,
    })
  }

  changeConfirmCardBg = () => {
    this.setState({
      isConfirmCardClicked: true,
      isActiveCardClicked: false,
      isRecoverCardClicked: false,
      isDeceaseCardClicked: false,
    })
  }

  changeActiveCardBg = () => {
    this.setState({
      isConfirmCardClicked: false,
      isActiveCardClicked: true,
      isRecoverCardClicked: false,
      isDeceaseCardClicked: false,
    })
  }

  changeRecoverCardBg = () => {
    this.setState({
      isConfirmCardClicked: false,
      isActiveCardClicked: false,
      isRecoverCardClicked: true,
      isDeceaseCardClicked: false,
    })
  }

  renderStateCaseView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const {
      stateData,
      isConfirmCardClicked,
      isDeceaseCardClicked,
      isActiveCardClicked,
      isRecoverCardClicked,
    } = this.state
    const confirmCardBg = isConfirmCardClicked ? 'confirm-card' : ''
    const deceaseCardBg = isDeceaseCardClicked ? 'decease-card' : ''
    const activeCardBg = isActiveCardClicked ? 'active-card' : ''
    const recoverCardBg = isRecoverCardClicked ? 'recover-card' : ''

    console.log(stateData)
    const metaData = this.getFormattedMetaData(stateData.meta)
    console.log(metaData)
    const {population} = metaData
    const lastUpdated = metaData.lastUpdated.slice(0, 10)
    const {tested, confirmed, deceased, recovered} = stateData.total
    const active = confirmed - (recovered + deceased)
    const stateNameList = stateCodeData.filter(each => each.stateCode === id)
    const {stateName} = stateNameList[0]

    const updatedDate = new Date(lastUpdated)
    console.log(updatedDate)

    const {districts} = stateData
    console.log(districts)

    const listOfDistrictFormattedDataUsingForInMethod = this.convertObjectsDataIntoListItemsUsingForInMethod(
      districts,
    )
    console.log(listOfDistrictFormattedDataUsingForInMethod)

    const month = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ]
    let sub = ''
    switch (updatedDate.getDate()) {
      case 1:
        sub = 'st'
        break
      case 2:
        sub = 'nd'
        break
      case 3:
        sub = 'rd'
        break
      default:
        sub = 'th'
        break
    }

    const lastUpdatedDate = `${month[updatedDate.getMonth()]} ${
      updatedDate.getDate() + sub
    } ${updatedDate.getFullYear()}`
    console.log(lastUpdatedDate)

    let activeTab = ''
    if (isConfirmCardClicked) {
      activeTab = 'confirmed'
    } else if (isActiveCardClicked) {
      activeTab = 'active'
    } else if (isDeceaseCardClicked) {
      activeTab = 'deceased'
    } else {
      activeTab = 'recovered'
    }
    console.log(activeTab)

    listOfDistrictFormattedDataUsingForInMethod.sort((a, b) => {
      const k = a[`${activeTab}`]
      const l = b[`${activeTab}`]
      if (k < l) {
        return 1
      }
      if (k > l) {
        return -1
      }
      return 0
    })

    console.log(listOfDistrictFormattedDataUsingForInMethod)

    return (
      <>
        <div className="state-profile">
          <div className="state-name-div">
            <h1 className="state-name-heading">{stateName}</h1>
            <p className="updated-date">Last update on {lastUpdatedDate}</p>
          </div>
          <div>
            <p className="state-profile-tested">Tested</p>
            <p className="state-profile-tested big-font">{tested}</p>
          </div>
        </div>
        <div className="card-container1">
          <button
            type="button"
            data-testid="countryWideConfirmedCases"
            className={`specific-card1 ${confirmCardBg}`}
            onClick={this.changeConfirmCardBg}
          >
            <h1 className="confirm1">Confirmed</h1>
            <img
              src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683806914/Vector_hsmmhq.png"
              className="confirm-logo1"
              alt="country wide confirmed cases pic"
            />
            <p className="confirmed-count1">{confirmed}</p>
          </button>
          <button
            type="button"
            data-testid="countryWideActiveCases"
            className={`specific-card1 ${activeCardBg}`}
            onClick={this.changeActiveCardBg}
          >
            <h1 className="active1">Active</h1>
            <img
              src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683808560/protection_1_uqvvm7.png"
              className="active-logo1"
              alt="country wide active cases pic"
            />
            <p className="active-count1">{active}</p>
          </button>
          <button
            type="button"
            data-testid="countryWideRecoveredCases"
            className={`specific-card1 ${recoverCardBg}`}
            onClick={this.changeRecoverCardBg}
          >
            <h1 className="recover1">Recovered</h1>
            <img
              src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683811796/Vector_2_x3skhp.png"
              className="recover-logo1"
              alt="country wide recovered cases pic"
            />
            <p className="recover-count1">{recovered}</p>
          </button>
          <button
            type="button"
            data-testid="countryWideDeceasedCases"
            className={`specific-card1 ${deceaseCardBg}`}
            onClick={this.changeDeceaseCardBg}
          >
            <h1 className="decease1">Deceased</h1>
            <img
              src="https://res.cloudinary.com/dhqmxvd8y/image/upload/v1683812143/Outline_cgxfbn.png"
              className="decease-logo1"
              alt="country wide deceased cases pic"
            />
            <p className="decease-count1">{deceased}</p>
          </button>
        </div>
        <h1 className="top-district-heading">Top Districts</h1>
        <ul className="district-case-details-ul-div">
          {listOfDistrictFormattedDataUsingForInMethod
            .slice(0, 20)
            .map(eachDistrict => (
              <li className="district-case-details-li-div">
                <p className="district-case-details-case-count">
                  {eachDistrict[`${activeTab}`]}
                </p>
                <p className="district-name-li-list">
                  {eachDistrict.stateName}
                </p>
              </li>
            ))}
        </ul>
      </>
    )
  }

  renderSpecificStateCovidDetails = () => {
    const {apiStatus, stateData} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStateCaseView()
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
      <div className="bg-div2">
        <Header />
        <div className="bottom-container2">
          {this.renderSpecificStateCovidDetails()}
        </div>
      </div>
    )
  }
}

export default SpecificStateCases
