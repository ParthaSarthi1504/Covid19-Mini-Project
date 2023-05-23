import Select from 'react-select'
import './index.css'

const MySelect = props => {
  const {selected, onChange, options} = props

  const colourStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: '#2F2F43',
      color: '#94A3B8',
      fontSize: '16px',
      fontFamily: 'Roboto',
      fontWeight: '400',
      borderColor: state.isFocused ? '#2F2F43' : '#2F2F43',
      outline: 'none',
    }),
    placeholder: styles => ({
      ...styles,
      color: '#94A3B8',
      fontSize: '16px',
      fontFamily: 'Roboto',
      fontWeight: '400',
    }),
    option: (styles, state) => ({
      ...styles,
      backgroundColor: state.isFocused ? 'rgba(9, 103, 210, 0.08)' : '#2F2F43',
      color: state.isFocused ? '#0967D2' : '#94A3B8',
      fontSize: '16px',
      fontFamily: 'Roboto',
      fontWeight: '400',
    }),
    singleValue: styles => ({...styles, color: '#94A3B8'}),
    input: styles => ({...styles, color: '#94A3B8'}),
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
}

export default MySelect
