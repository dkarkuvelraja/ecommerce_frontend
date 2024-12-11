import React from 'react'

export default function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Ecom</div>
      <ul className="navbar-links">
        <li><a href="home">Home</a></li>
        <li><a href="about">About</a></li>
        <li><a href="login">Login</a></li>
        <li><a href="signUp">SignUp</a></li>
      </ul>
    </nav>
  )
}
