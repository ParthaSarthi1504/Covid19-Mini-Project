import React from 'react'

const CartContext = React.createContext({
  isDark: '',
  changeTheme: () => {},
})

export default CartContext
