import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import TimeLineCharts from '../TimeLineCharts'
import TopDistricts from '../TopDistricts'
import CartContext from '../../Context/CartContext'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559411/Group_7362_xmachc.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559922/Group_7354_eypcsq.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558259/Group_7340_ukqtvq.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558306/Group_7341_qnd6sm.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557832/Group_7335_f23q21.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559351/Group_7361_teoexo.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558876/Group_7353_bfvbru.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559466/Group_7357_lokx6w.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559616/Group_7358_jrqsuc.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558433/Group_7349_cpt25o.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557942/Group_7337_zqtfzp.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557614/Group_7332_xlrgfi.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557361/Group_7364_avtdnc.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557262/Group_7328_rmb533.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558029/Group_7342_lpniwe.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559119/Group_7339_iocz90.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559178/Group_7355_txndxo.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559786/Group_7363_ojgy2u.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559511/Group_7359_yj5dhg.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559000/Group_7350_cbxfo4.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557889/Group_7336_t5aedp.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558648/Group_7346_1_hadqrt.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558433/Group_7349_cpt25o.png',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558772/Group_7347_eiafty.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558579/Group_7345_jidkvo.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558924/Group_7348_d2imx1.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559566/Group_7360_tjmddz.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557417/Group_7330_eva5pm.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557693/Group_7333_nxxbdn.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558178/Group_7338_xs5x1p.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559225/Group_7356_zgfxjz.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684559064/Group_7351_vjhf8o.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558836/Group_7352_uoks3j.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557773/Group_7334_japq5g.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684557528/Group_7331_vymf09.png',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    url:
      'https://res.cloudinary.com/dhqmxvd8y/image/upload/v1684558104/Group_7343_pjt1vb.png',
  },
]

const stateCodeData = statesList.map(each => ({
  stateCode: each.state_code,
  stateName: each.state_name,
  url: each.url,
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

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        if (data[keyName].total !== undefined) {
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
      }
    })
    return resultList
  }

  getSpecificStateCases = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const NeededState = data[`${stateCode}`]

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
    const {stateCode} = params
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
    <div className="loader-container2" data-testid="stateDetailsLoader">
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
    const {stateCode} = params

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

    const metaData = this.getFormattedMetaData(stateData.meta)
    const {population} = metaData
    const lastUpdated = metaData.lastUpdated.slice(0, 10)
    const {tested, confirmed, deceased, recovered} = stateData.total
    const active = confirmed - (recovered + deceased)
    const stateNameList = stateCodeData.filter(
      each => each.stateCode === stateCode,
    )
    const {stateName, url} = stateNameList[0]

    const updatedDate = new Date(lastUpdated)

    const {districts} = stateData

    const listOfDistrictFormattedDataUsingForInMethod = this.convertObjectsDataIntoListItemsUsingForInMethod(
      districts,
    )

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

    let activeTab = ''
    let headingColor = ''
    if (isConfirmCardClicked) {
      activeTab = 'confirmed'
      headingColor = 'red-color'
    } else if (isActiveCardClicked) {
      activeTab = 'active'
      headingColor = 'blue-color'
    } else if (isDeceaseCardClicked) {
      activeTab = 'deceased'
      headingColor = 'grey-color'
    } else {
      activeTab = 'recovered'
      headingColor = 'green-color'
    }

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

    return (
      <CartContext.Consumer>
        {value => {
          const {isDark} = value
          const testedDarkColor = isDark ? '' : ' tested-dark-color'
          const updatedDateDarkColor = isDark ? '' : 'updated-date-dark-color '
          return (
            <>
              <div className="state-profile">
                <div className="state-name-div">
                  <h1 className="state-name-heading">{stateName}</h1>
                  <p className={`updated-date ${updatedDateDarkColor}`}>
                    Last update on {lastUpdatedDate}
                  </p>
                </div>
                <div>
                  <p className={`state-profile-tested ${testedDarkColor}`}>
                    Tested
                  </p>
                  <p
                    className={`state-profile-tested big-font ${testedDarkColor}`}
                  >
                    {tested}
                  </p>
                </div>
              </div>
              <div className="card-container1">
                <button
                  type="button"
                  data-testid="countryWideConfirmedCases"
                  className={`specific-card1 card1 ${confirmCardBg}`}
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
                  className={`specific-card1 card2 ${activeCardBg}`}
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
                  className={`specific-card1 card3 ${recoverCardBg}`}
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
                  className={`specific-card1 card4 ${deceaseCardBg}`}
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
              <div className="state-location-div">
                <img src={`${url}`} alt="state map" className="state-map" />
                <div className="ncp-details-div">
                  <h1 className={`ncp-heading ${testedDarkColor}`}>
                    NCP report
                  </h1>
                  <div className="ncp-report">
                    <div className="population-report">
                      <p
                        className={`population-heading ${updatedDateDarkColor}`}
                      >
                        Population
                      </p>
                      <p className={`population-count ${testedDarkColor}`}>
                        {population}
                      </p>
                    </div>
                    <div className="tested-report">
                      <h1
                        className={`tested-heading-ncp ${updatedDateDarkColor}`}
                      >
                        Tested
                      </h1>
                      <p className={`tested-count-ncp ${testedDarkColor}`}>
                        {tested}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className={`top-district-heading ${headingColor}`}>
                Top Districts
              </h1>
              <ul
                className="district-case-details-ul-div"
                data-testid="topDistrictsUnorderedList"
              >
                {listOfDistrictFormattedDataUsingForInMethod
                  .slice(0, 20)
                  .map(eachDistrict => (
                    <TopDistricts
                      key={eachDistrict.stateName}
                      DistrictData={eachDistrict}
                      ActiveTab={activeTab}
                    />
                  ))}
              </ul>
              <TimeLineCharts
                stateCode={stateCode}
                activeTab={activeTab}
                districtNames={listOfDistrictFormattedDataUsingForInMethod}
              />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderSpecificStateCovidDetails = () => {
    const {apiStatus} = this.state

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
      <CartContext.Consumer>
        {value => {
          const {isDark} = value
          const stateViewLightTheme = isDark ? '' : 'state-view-light-view'
          return (
            <div className={`bg-div2 ${stateViewLightTheme}`}>
              <Header />
              <div className="bottom-container2">
                {this.renderSpecificStateCovidDetails()}
              </div>
              <div className="footer-alignment-specific-state-view">
                <Footer />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default SpecificStateCases
