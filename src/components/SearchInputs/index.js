import {BiChevronRightSquare} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import './index.css'

const SearchInputs = props => {
  const {inputDetail} = props
  const {stateName, stateCode} = inputDetail

  return (
    <>
      <Link
        to={`/state/${stateCode}`}
        className="direct-to-states"
        data-testid="searchResultsUnorderedList"
      >
        <li className="search-option">
          <p className="search-option-state-name">{stateName}</p>
          <div className="search-box-state-code-div">
            <h1 className="search-box-state-code">{stateCode}</h1>
            <BiChevronRightSquare className="right-square" />
          </div>
        </li>
      </Link>
    </>
  )
}

export default SearchInputs
