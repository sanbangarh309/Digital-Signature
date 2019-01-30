import React from 'react';
import {connect} from 'react-redux';
import './css/docs.theme.min.css';
import './css/owl.carousel.min.css';
import './css/owl.theme.default.min.css';
import './css/bootstrap.min.css';
import './css/animate.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/style.css';
import './css/responsive.css';
// Js Files
import 'jquery';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';
// import './scripts/popper.min.js';
// import './scripts/bootstrap.min.js';

// import './scripts/wow.min.js';
import WOW from 'wow.js'
const wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 0,
  live: true
});
import OwlCarousel from 'react-owl-carousel';
import './scripts/custom.js';
// import {Link} from 'react-router-dom';
var NavLink = require('react-router-dom').NavLink;
let logout = () => {
  localStorage.clear();
  return 1;
}

const Header = () => {
  let user_action = <a className="" href="#" data-toggle="modal" data-target="#auth-modal">
  <span className="fa fa-unlock-alt"></span>
  Login</a>;
  if (localStorage.getItem('jwtToken')) {
    user_action = <a className="" href="#" onClick = {logout}>
    <span className="fa fa-unlock-alt"></span>
    Logout</a>;
  }
  return (
    <header className="home-header">
           <nav className="navbar navbar-expand-lg navbar-light custom-navheader" id="sroll-className">
              <a className="navbar-brand d-lg-block d-md-block" href="index.html"><img src="images/fina-logo.png" alt=""/></a>
  			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
  				<span className="navbar-toggler-icon"></span>
  			</button>
        <div className="collapse navbar-collapse navigation-bar" id="navbarCollapse">
  				<ul className="navbar-nav ml-auto custom-nav">
  					<li className="nav-item">
              <NavLink exact activeClassName='active' to='/'>
  					   <span className="fa fa-home"></span>
  					   Home</NavLink>
  					</li>
  					<li className="nav-item">
              <NavLink exact activeClassName='active' to='/about'><span className="fa fa-user"></span>
              About</NavLink>
  					</li>
  					<li className="nav-item">
  					   <NavLink exact activeClassName='active' to='/prices'>
  					   <span className="fa fa-dollar"></span>
  					   Prices</NavLink>
  					</li>
  					<li className="nav-item">
  					   <NavLink activeClassName='active' to='/feature'>
  					   <span className="fa fa-list-ul"></span>
  					   Features</NavLink>
  					</li>
  					<li className="nav-item">
              <NavLink activeClassName='active' to='/contact'>
  					   <span className="fa fa-file"></span>
  					   Contact</NavLink>
  					</li>
  					<li className="nav-item">
  					   {user_action}
  					</li>
  				</ul>
              </div>
           </nav>
        </header>
  );
}

export default Header;
