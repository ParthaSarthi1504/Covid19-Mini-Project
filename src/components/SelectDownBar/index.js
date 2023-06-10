import Select from 'react-select'
import CartContext from '../../Context/CartContext'
import './index.css'

const MySelect = props => (
  <CartContext.Consumer>
    {value => {
      const {isDark} = value
      const dropDownBackGround = isDark ? '#2F2F43' : '#ffffff'
      const dropDownElementsColor = isDark ? '#94A3B8' : '#708090'
      const {selected, onChange, options} = props

      const colourStyles = {
        control: (styles, state) => ({
          ...styles,
          backgroundColor: `${dropDownBackGround}`,
          color: `${dropDownElementsColor}`,
          fontSize: '16px',
          fontFamily: 'Roboto',
          fontWeight: '400',
          borderColor: state.isFocused ? '#2F2F43' : '#2F2F43',
          borderRadius: '10px',
          outline: 'none',
        }),
        placeholder: styles => ({
          ...styles,
          color: `${dropDownElementsColor}`,
          fontSize: '16px',
          fontFamily: 'Roboto',
          fontWeight: '400',
        }),
        option: (styles, state) => ({
          ...styles,
          backgroundColor: state.isFocused
            ? 'rgba(9, 103, 210, 0.08)'
            : `${dropDownBackGround}`,
          color: state.isFocused ? '#0967D2' : `${dropDownElementsColor}`,
          fontSize: '16px',
          fontFamily: 'Roboto',
          fontWeight: '400',
        }),
        singleValue: styles => ({...styles, color: `${dropDownElementsColor}`}),
        input: styles => ({...styles, color: `${dropDownElementsColor}`}),
      }
      return (
        <Select
          className="my-select"
          value={selected}
          placeholder="Select District"
          onChange={onChange}
          options={options}
          noOptionsMessage={() => 'No district found'}
          styles={colourStyles}
        />
      )
    }}
  </CartContext.Consumer>
)

export default MySelect
