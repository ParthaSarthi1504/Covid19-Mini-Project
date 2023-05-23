import './index.css'

const TopDistricts = props => {
  const {DistrictData, ActiveTab} = props
  const {stateName} = DistrictData

  return (
    <li className="district-case-details-li-div">
      <p className="district-case-details-case-count">
        {DistrictData[`${ActiveTab}`]}
      </p>
      <p className="district-name-li-list">{stateName}</p>
    </li>
  )
}

export default TopDistricts
