import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import SelectDownBar from '../SelectDownBar'
import CartContext from '../../Context/CartContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TimeLineCharts extends Component {
  state = {
    timelineData: [],
    districtWiseTimeLines: null,
    displayDistrictTimelines: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTimeLineDatas()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []

    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        resultList.push({
          Date: keyName,
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

  getTimeLineDatas = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {stateCode} = this.props

    const url = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const listOfTestedDates = this.convertObjectsDataIntoListItemsUsingForInMethod(
        data[`${stateCode}`].dates,
      )
      const districtTimeLines = data[`${stateCode}`].districts
      this.setState({
        districtWiseTimeLines: districtTimeLines,
        timelineData: listOfTestedDates,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  dataFormatter = number => {
    if (number > 100000) {
      return `${(number / 100000).toString()}L`
    }
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  renderFailureView = () => (
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

  renderLoadingView = () => (
    <div className="loader-container3" data-testid="timelinesDataLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  districtChanged = value => {
    const {districtWiseTimeLines} = this.state
    const specificDistrictTimelines = districtWiseTimeLines[`${value.label}`]
    const formattedTimeLinesForDistricts = this.convertObjectsDataIntoListItemsUsingForInMethod(
      specificDistrictTimelines.dates,
    )

    this.setState({displayDistrictTimelines: formattedTimeLinesForDistricts})
  }

  renderTimeLineView = () => {
    const {timelineData, displayDistrictTimelines} = this.state
    const {activeTab, districtNames} = this.props

    let barColor = ''
    switch (activeTab) {
      case 'confirmed':
        barColor = '#9A0E31'
        break
      case 'deceased':
        barColor = '#474C57'
        break
      case 'active':
        barColor = '#0A4FA0'
        break
      default:
        barColor = '#216837'
        break
    }

    const options = {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    }

    const month = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ]
    let minConfirmedCases = Infinity
    let minActiveCases = Infinity
    let minDeceasedCases = Infinity
    let minRecoveredCases = Infinity
    let minTestedCases = Infinity

    const formattedTimeLine = timelineData.map(each => {
      const newDate = new Date(each.Date)
      const monthName = month[newDate.getMonth()]
      const formattedDate = `${newDate.getDate()} ${monthName}`
      if (each.confirmed < minConfirmedCases) {
        minConfirmedCases = each.confirmed
      }
      if (each.active < minActiveCases) {
        minActiveCases = each.active
      }
      if (each.deceased < minDeceasedCases) {
        minDeceasedCases = each.deceased
      }
      if (each.recovered < minRecoveredCases) {
        minRecoveredCases = each.recovered
      }
      if (each.tested < minTestedCases) {
        minTestedCases = each.tested
      }

      return {...each, Date: formattedDate}
    })

    const lastTenTimeLineData = formattedTimeLine.slice(
      timelineData.length - 10,
      timelineData.length,
    )

    const districtCodeAndNameList = districtNames.map(each => ({
      value: each.stateName,
      label: each.stateName,
    }))

    let districtList
    if (displayDistrictTimelines.length === 0) {
      districtList = timelineData
    } else {
      districtList = displayDistrictTimelines
      // eslint-disable-next-line
      const formattedDistrictTimeLineDatas = districtList.map(each => {
        if (each.confirmed < minConfirmedCases) {
          minConfirmedCases = each.confirmed
        }
        if (each.active < minActiveCases) {
          minActiveCases = each.active
        }
        if (each.deceased < minDeceasedCases) {
          minDeceasedCases = each.deceased
        }
        if (each.recovered < minRecoveredCases) {
          minRecoveredCases = each.recovered
        }
        if (each.tested < minTestedCases) {
          minTestedCases = each.tested
        }

        return {...each}
      })
    }

    return (
      <CartContext.Consumer>
        {value => {
          const {isDark} = value
          const dailySpreadHeading = isDark ? '' : 'daily-spread-heading'
          return (
            <>
              <div className="bar-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={lastTenTimeLineData}
                    margin={{
                      top: 30,
                      bottom: 70,
                    }}
                  >
                    <XAxis
                      dataKey="Date"
                      stroke={`${barColor}`}
                      tick={{
                        stroke: 'transparant',
                        strokeWidth: 1,
                        fontSize: 12,
                        fontFamily: 'Roboto',
                      }}
                      axisLine="false"
                    />
                    <Tooltip cursor={{fill: 'white'}} />
                    <Bar
                      dataKey={`${activeTab}`}
                      fill={`${barColor}`}
                      className="bar"
                      label={{
                        position: 'top',
                        style: {
                          fill: `${barColor}`,
                          fontFamily: 'Roboto',
                          fontSize: '40%',
                        },
                      }}
                      barSize="2%"
                      radius={[7, 7, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <h1 className={`daily-spread-heading ${dailySpreadHeading}`}>
                Daily Spread Trends
              </h1>
              <div className="select-div">
                <SelectDownBar
                  options={districtCodeAndNameList}
                  onChange={this.districtChanged}
                />
              </div>

              <div
                data-testid="lineChartsContainer"
                className="line-charts-wrapper"
              >
                <div className="line-chart-div red-bg">
                  <h1 className="confirmed-legend-heading">Confirmed</h1>
                  <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                      data={districtList}
                      margin={{top: 5, right: 40, left: 0, bottom: 5}}
                    >
                      <XAxis
                        dataKey="Date"
                        stroke="#FF073A"
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                      />
                      <YAxis
                        stroke="#FF073A"
                        tickFormatter={this.dataFormatter}
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                        domain={[minConfirmedCases, 'auto']}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="confirmed"
                        stroke="#FF073A"
                        fill="#FF073A"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="line-chart-div blue-bg">
                  <h1 className="confirmed-legend-heading">Total Active</h1>
                  <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                      data={districtList}
                      margin={{top: 5, right: 40, left: 0, bottom: 5}}
                      options={options}
                    >
                      <XAxis
                        dataKey="Date"
                        stroke="#007BFF"
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                      />
                      <YAxis
                        stroke="#007BFF"
                        tickFormatter={this.dataFormatter}
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                        domain={[minActiveCases, 'auto']}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="active"
                        stroke="#007BFF"
                        fill="#007BFF"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="line-chart-div green-bg">
                  <h1 className="confirmed-legend-heading">Recovered</h1>
                  <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                      data={districtList}
                      margin={{top: 5, right: 40, left: 0, bottom: 5}}
                      options={options}
                    >
                      <XAxis
                        dataKey="Date"
                        stroke="#27A243"
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                      />
                      <YAxis
                        stroke="#27A243"
                        tickFormatter={this.dataFormatter}
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                        domain={[minRecoveredCases, 'auto']}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="recovered"
                        stroke="#27A243"
                        fill="#27A243"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="line-chart-div grey-bg">
                  <h1 className="confirmed-legend-heading">Deceased</h1>
                  <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                      data={districtList}
                      margin={{top: 5, right: 40, left: 0, bottom: 5}}
                      options={options}
                    >
                      <XAxis
                        dataKey="Date"
                        stroke="#6C757D"
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                      />
                      <YAxis
                        stroke="#6C757D"
                        tickFormatter={this.dataFormatter}
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                        domain={[minDeceasedCases, 'auto']}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="deceased"
                        stroke="#6C757D"
                        fill="#6C757D"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="line-chart-div violet-bg">
                  <h1 className="confirmed-legend-heading">Tested</h1>
                  <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                      data={districtList}
                      margin={{top: 5, right: 40, left: 0, bottom: 5}}
                      options={options}
                    >
                      <XAxis
                        dataKey="Date"
                        stroke="#9673B9"
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                      />
                      <YAxis
                        stroke="#9673B9"
                        tickFormatter={this.dataFormatter}
                        tick={{
                          fontSize: 12,
                          fontFamily: 'Roboto',
                        }}
                        domain={[minTestedCases, 'auto']}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="tested"
                        stroke="#9673B9"
                        fill="#9673B9"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderTimeLineViewForStates = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTimeLineView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderTimeLineViewForStates()}</>
  }
}

export default TimeLineCharts
