import {BiChevronRightSquare} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import CartContext from '../../Context/CartContext'
import './index.css'

const SearchInputs = props => (
  <CartContext.Consumer>
    {value => {
      const {isDark} = value
      const stateNameLightTheme = isDark ? '' : 'state-name-light-theme'
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
              <p className={`search-option-state-name ${stateNameLightTheme}`}>
                {stateName}
              </p>
              <div className="search-box-state-code-div">
                <h1 className="search-box-state-code">{stateCode}</h1>
                <BiChevronRightSquare className="right-square" />
              </div>
            </li>
          </Link>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default SearchInputs
