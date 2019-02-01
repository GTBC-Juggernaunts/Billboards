// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router-dom'

class NavLink extends Link {
  render() {
    return <Link {...this.props} activeStyle={{ color: 'red'}}/>
  }
}

export default NavLink