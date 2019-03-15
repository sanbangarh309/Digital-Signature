import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Dashboard.css';
import axios from 'src/common/myAxios';
import {browserHistory} from 'react-router';
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
      redirect: false,
      docs:[],
      data:[]
    };
    localStorage.setItem("files_array", [])
    this.onChange = this.onChange.bind(this);
    this.getDocs();
  }

  docUpload = (e) => {
    var loader = document.getElementById('outer-barG');
    $(loader).css('display','block');
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      this.setState({doc:base64});
      localStorage.setItem('uploaded_doc', base64);
      this.setState({
        redirect: 'signature'
      })
    });
  }

  getDocs = (e) => {
    axios.post('/api/get_docs/',{token:localStorage.getItem('jwtToken')}).then((res) => {
      console.log(res);
      this.setState({
        docs: res.data
      });
    });
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

  render() {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to='/'  />
    }
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect}/>)
    }
    return (
      <div>
        <header>
         <nav className="navbar navbar-expand-lg navbar-light custom-navheader navbar-fixed header-template" id="sroll-className">
			<div className="container-fluid">
				<a className="navbar-brand d-lg-block d-md-block" href="#"><img src="/assets/img/fina-logo.png" alt=""/></a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse navigation-bar3" id="navbarCollapse">
					<ul className="navbar-nav ml-auto custom-navi">
										<li className="dropdown messages-menu">
					<a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
					  <i className="fa fa-envelope-o"></i>
					  <span className="label label-success">4</span>
					</a>
					<ul className="dropdown-menu">
					  <li className="header">You have 4 messages</li>
					  <li>
						<ul className="menu">
						  <li>
							<a href="#">
							  <div className="pull-left">
								<img src="/assets/img/user2.jpg" className="img-circle" alt="User Image"/>
							  </div>
							  <h4>
								Support Team
								<small><i className="fa fa-clock-o"></i> 5 mins</small>
							  </h4>
							  <p>Why not buy a new awesome theme?</p>
							</a>
						  </li>
						  <li>
							<a href="#">
							  <div className="pull-left">
								<img src="/assets/img/user2.jpg" className="img-circle" alt="User Image"/>
							  </div>
							  <h4>
								AdminLTE Design Team
								<small><i className="fa fa-clock-o"></i> 2 hours</small>
							  </h4>
							  <p>Why not buy a new awesome theme?</p>
							</a>
						  </li>
						  <li>
							<a href="#">
							  <div className="pull-left">
								<img src="/assets/img/user2.jpg" className="img-circle" alt="User Image"/>
							  </div>
							  <h4>
								Developers
								<small><i className="fa fa-clock-o"></i> Today</small>
							  </h4>
							  <p>Why not buy a new awesome theme?</p>
							</a>
						  </li>
						  <li>
							<a href="#">
							  <div className="pull-left">
								<img src="/assets/img/user2.jpg" className="img-circle" alt="User Image"/>
							  </div>
							  <h4>
								Sales Department
								<small><i className="fa fa-clock-o"></i> Yesterday</small>
							  </h4>
							  <p>Why not buy a new awesome theme?</p>
							</a>
						  </li>
						  <li>
							<a href="#">
							  <div className="pull-left">
								<img src="/assets/img/user2.jpg" className="img-circle" alt="User Image"/>
							  </div>
							  <h4>
								Reviewers
								<small><i className="fa fa-clock-o"></i> 2 days</small>
							  </h4>
							  <p>Why not buy a new awesome theme?</p>
							</a>
						  </li>
						</ul>
					  </li>
					  <li className="footer"><a href="#">See All Messages</a></li>
					</ul>
				  </li>
						<li className="dropdown user user-menu">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
							  <i className="fa fa-user"></i>
							  
							</a>
							<ul className="dropdown-menu">
								<li>
									<a href="#" className="btn btn-default btn-flat"><i className="fa fa-user"></i> My Profile</a>
								</li>
								<li>
								  <a href="#" className="btn btn-default btn-flat"><i className="fa fa-globe"></i> Feedback</a>
								</li>
								<li>
                  <NavLink to='/logout' className="btn btn-default btn-flat"><i className="fa fa-sign-out"></i>Logout</NavLink>
								</li>
							</ul>
						  </li>
					</ul>
				</div>
			</div>
         </nav>
      </header>
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
                  {this.state.docs.map((value, index) => {
                    return <li key={index}>
                               <ul className="list-inline top-box-list">
                                  <li><input type="checkbox"/><span></span></li>
                                  <li className="doc-box">
                                    <a href="#">
                                      <div className="fig-left">
                                        <img src="/assets/img/doc-1.png" alt="No Thumb" className="doc-pic"/>
                                      </div>
                                      <div className="doc-info">
                                        <p>Document<span className="date-doc small">{value.created_at}</span></p>
                                      </div>
                                    </a>
                                  </li>
                                  <li><a href="#">SIGN </a></li>
                                  <li><a href="#">SEND FOR SIGNING </a></li>
                                  <li><a href="#"><i className="fa fa-edit"></i></a></li>
                                  <li><a href="#"><i className="fa fa-share"></i></a></li>
                                  <li><a href={'files/docs/'+value.file} target="_blank"><i className="fa fa-download"></i></a></li>
                                  <li className="delete-row"><a className="fa fa-trash danger" href="#"></a></li>
                              </ul>
                          </li>
                  })}
                  </ol>
                </div>
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
