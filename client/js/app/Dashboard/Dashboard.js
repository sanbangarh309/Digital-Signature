import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Dashboard.css';
import axios from 'src/common/myAxios';
var NavLink = require('react-router-dom').NavLink;

const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page:'Dashboard',
      doc:'',
      data:[]
    };
    this.onChange = this.onChange.bind(this);
  }

  docUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({doc:base64});
      console.log(this.state.doc);
    });
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
          <li><NavLink activeClassName='active' to='/dashboard'><i className="fa fa-dashboard"></i> <span>Documentation</span></NavLink></li>
          <li><NavLink activeClassName='active' to='/temps'><i className="fa fa-rebel"></i> <span>Templates</span></NavLink></li>
          <li><NavLink activeClassName='active' to='/logout'><i className="fa fa-sign-out"></i> <span>Logout</span></NavLink></li>
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
                    <li className="upload_docs"><input type="file" id="hidden_upload_file" onChange={this.docUpload}  /><i className="fa fa-upload"></i></li>
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
