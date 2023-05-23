import './index.css'

const StateList = props => {
  const {stateDetails, stateCases} = props
  const {total} = stateCases
  const {population} = stateCases.meta
  const {confirmed, recovered, deceased} = total
  return (
    <li className="case-table-rows">
      <p
        className="case-table-columns1 state-name1"
        id={`${stateDetails.stateName}`}
      >
        {stateDetails.stateName}
      </p>
      <p className="case-table-columns1 red" id={`${confirmed}`}>
        {confirmed}
      </p>
      <p
        className="case-table-columns1 blue"
        id={`${confirmed - (recovered + deceased)}`}
      >
        {confirmed - (recovered + deceased)}
      </p>
      <p className="case-table-columns1 green" id={`${recovered}`}>
        {recovered}
      </p>
      <p className="case-table-columns1 ash" id={`${deceased}`}>
        {deceased}
      </p>
      <p className="case-table-columns1 light-ash" id={`${population}`}>
        {population}
      </p>
    </li>
  )
}

export default StateList
