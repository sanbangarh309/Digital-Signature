import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Dashboard.css';
import axios from 'src/common/myAxios';
var NavLink = require('react-router-dom').NavLink;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:'About',
      data:[]
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

  render() {
    return (
      <div className="container-fluid main-wrapper">
      <aside className="main-sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img src="/assets/img/user2.jpg" className="img-circle" alt="User Image"/>
          </div>
          <div className="pull-left info">
            <p>DIGITTRIX <span className="small">Founder of App</span></p>
          </div>
         </div>
         <ul className="sidebar-menu tree" data-widget="tree">
          <li className="active" onClick={this.Login}><NavLink activeClassName='active' to='/docs'><i className="fa fa-dashboard"></i> <span>Documentation</span></NavLink></li>
          <li onClick={this.Login}><NavLink activeClassName='active' to='/dashboard'><i className="fa fa-rebel"></i> <span>Templates</span></NavLink></li>
          <li onClick={this.Login}><NavLink activeClassName='active' to='/logout'><i className="fa fa-sign-out"></i> <span>Logout</span></NavLink></li>
         </ul>
      </aside>
      <div className="right-maintemplate admin-right">
        <div className="page container-fluid">
          <div className="col-sm-12"><h3 className="text-uppercase">Documents</h3></div>
          <div className="box-body">
            <div className="col-sm-12">
              <div className="card box-spice">
                <div className="card-header">
                  <ul className="list-inline top-box-list">
                    <li><input type="checkbox"/><span></span></li>
                    <li><a href="#">NEW</a></li>
                    <li><a href="#">FOLDER SEND </a></li>
                    <li><a href="#">FOR SIGNING</a></li>
                    <li><a href="#">Move to</a></li>
                    <li className="delete-row"><a className="fa fa-trash danger" href="#"></a></li>
                    <li className="search-row">
                      <form id="example1_filter" className="dataTables_filter">
                        <label className="filter_search">
                          <input type="search" className="form-control input-sm" placeholder="Search..." aria-controls="example1"/>
                          <button className="btn search--btn"><i className="fa fa-search"></i></button>
                        </label>
                      </form>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle drop-tog" data-toggle="dropdown" aria-expanded="true" data-toggle="dropdown">
                        <i className="fa fa-cloud-download"></i>
                      </a>
                      <ul className="dropdown-menu drop-downbox">
                        <li>
                          <a href="#" className="btn btn-default btn-flat"><i className="fa fa-user"></i> My Profile</a>
                        </li>
                        <li>
                          <a href="#" className="btn btn-default btn-flat"><i className="fa fa-globe"></i> Feedback</a>
                        </li>
                        <li>
                          <a href="#" className="btn btn-default btn-flat"><i className="fa fa-sign-out"></i> Logout out</a>
                        </li>
                      </ul>
                    </li>
                    <li><a href="#"><i className="fa fa-upload"></i></a></li>
                    <li><a href="#"><i className="fa fa-filter"></i></a></li>
                  </ul>
                </div>
                <div className="card-body">
                  <ol className="od-list">
                    <li>
                      <ul className="list-inline top-box-list">
                        <li><input type="checkbox"/><span></span></li>
                        <li className="doc-box">
                          <a href="#">
                            <div className="fig-left">
                              <img src="/assets/img/doc-1.png" alt="" className="doc-pic"/>
                            </div>
                            <div className="doc-info">
                              <p>Document<span className="date-doc small">12/21/2018 2:55 PM</span></p>
                            </div>
                          </a>
                        </li>
                        <li><a href="#">SIGN </a></li>
                        <li><a href="#">SEND FOR SIGNING </a></li>
                        <li><a href="#"><i className="fa fa-edit"></i></a></li>
                        <li><a href="#"><i className="fa fa-share"></i></a></li>
                        <li><a href="#"><i className="fa fa-download"></i></a></li>
                        <li className="delete-row"><a className="fa fa-trash danger" href="#"></a></li>
                      </ul>
                    </li>
                    <li>
                      <ul className="list-inline top-box-list">
                        <li><input type="checkbox"/><span></span></li>
                        <li className="doc-box">
                          <a href="#">
                            <div className="fig-left">
                              <img src="/assets/img/doc-1.png" alt="" className="doc-pic"/>
                            </div>
                            <div className="doc-info">
                              <p>Document<span className="date-doc small">12/21/2018 2:55 PM</span></p>
                            </div>
                          </a>
                        </li>
                        <li><a href="#">SIGN </a></li>
                        <li><a href="#">SEND FOR SIGNING </a></li>
                        <li><a href="#"><i className="fa fa-edit"></i></a></li>
                        <li><a href="#"><i className="fa fa-share"></i></a></li>
                        <li><a href="#"><i className="fa fa-download"></i></a></li>
                        <li className="delete-row"><a className="fa fa-trash danger" href="#"></a></li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Dashboard;
