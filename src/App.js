import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import SpecificStateCases from './components/SpecificStateCases'
import About from './components/About'
import NotFound from './components/NotFound'

import './App.css'
import CartContext from './Context/CartContext'

class App extends Component {
  state = {isDark: true}

  onChangeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {isDark} = this.state
    return (
      <CartContext.Provider
        value={{
          isDark,
          changeTheme: this.onChangeTheme,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/state/:stateCode"
            component={SpecificStateCases}
          />
          <Route exact path="/about" component={About} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
