import React, {Component} from 'react';
import './header.css';

class Navbar extends Component {
  render() {
    return (
      <header>
        <h2><a>UW Planner</a></h2>
        <nav>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </nav>
      </header>
    );
  }
}

export default Navbar;