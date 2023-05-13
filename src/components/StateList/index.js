import './index.css'

const StateList = props => {
  const {stateDetails, stateCases} = props
  const {total} = stateCases
  const {population} = stateCases.meta
  const {confirmed, recovered, deceased} = total
  return (
    <>
      <li
        className="case-table-columns1 state-name1"
        id={`${stateDetails.stateName}`}
      >
        {stateDetails.stateName}
      </li>
      <li className="case-table-columns1 red" id={`${confirmed}`}>
        {confirmed}
      </li>
      <li
        className="case-table-columns1 blue"
        id={`${confirmed - (recovered + deceased)}`}
      >
        {confirmed - (recovered + deceased)}
      </li>
      <li className="case-table-columns1 green" id={`${recovered}`}>
        {recovered}
      </li>
      <li className="case-table-columns1 ash" id={`${deceased}`}>
        {deceased}
      </li>
      <li className="case-table-columns1 light-ash" id={`${population}`}>
        {population}
      </li>
    </>
  )
}

export default StateList
