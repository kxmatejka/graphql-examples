import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Nav = styled.nav`
  & > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  & > ul > li {
    display: inline-block;
    margin: 15px;
  }

  & > ul > li:first-child {
    margin-left: 0;
  }
`

function Navigation () {
  return (
    <Nav>
      <ul>
        <li>
          <Link to='/'>Search</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
      </ul>
    </Nav>
  )
}

export default Navigation
