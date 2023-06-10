import CartContext from '../../Context/CartContext'
import './index.css'

const TopDistricts = props => {
  const {DistrictData, ActiveTab} = props
  const {stateName} = DistrictData

  return (
    <CartContext.Consumer>
      {value => {
        const {isDark} = value
        const topDistrictDarkTheme = isDark ? '' : 'top-district-dark-theme'
        return (
          <li
            className={`district-case-details-li-div ${topDistrictDarkTheme}`}
          >
            <p className="district-case-details-case-count">
              {DistrictData[`${ActiveTab}`]}
            </p>
            <p className="district-name-li-list">{stateName}</p>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default TopDistricts
