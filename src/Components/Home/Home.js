import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "./Home.css"

const SideNavigation = () => {
  return (
   
<div className='home_body'>
<nav class="navbar">
  <ul class="nav-list">
    <li><a href="/home">Home</a></li>
    <li><a href="/category">Category</a></li>
    <li><a href="/client">Client</a></li>
    <li><a href="/">Logout</a></li>
  </ul>
</nav>

<h1 className='username'>VASANTH</h1>
</div>
  )

};

export default SideNavigation;
