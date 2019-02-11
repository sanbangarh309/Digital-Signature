import React from 'react';
import  { Redirect } from 'react-router-dom'
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import auth from 'src/auth';
import axios from 'src/common/myAxios';
import {connect} from 'react-redux';

@connect((store) => {
    return {};
})

export default class ModalComponent extends React.Component {
  static propTypes = {
      dispatch: PropTypes.func,
      user: PropTypes.object,
  };
  constructor() {
      super();

      this.state = {
          added: false,
          msg: '',
          email: '',
          reg_email: '',
          password: '',
          firstname: '',
          lastname: '',
          mobilecountrycode: '',
          mobile: '',
          confirmedPassword: '',
          terms: '',
      };
      // This binding is necessary to make `this` work in the callback
      this.Register = this.Register.bind(this);
      this.Login = this.Login.bind(this);
      this.closePopUp = this.closePopUp.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  Register(event){
    event.preventDefault();
    this.props.dispatch(auth.actions.signup(this.state, '/'));
      this.setState({
        added: true,
        msg: 'Registerted Successfully',
      });
    // axios.post('/api/signup',this.state).then((res) => {
    //   this.setState({
    //     added: true,
    //     msg: 'Registerted Successfully',
    //   });
    // });
  }

  Login(event){
    event.preventDefault();
    document.getElementById("hidePopUpBtn").click();
    this.props.dispatch(auth.actions.login(this.state, '/dashboard'));
    if(user && user.user.email !=''){
      // console.log(this.props.action)
      this.setState({
        added: true,
        msg: 'Logged In Successfully! Redirecting..',
      });
      document.getElementById("hidePopUpBtn").click();
    }
  }
  closePopUp(){
    setTimeout(
        function() {
            return <Redirect to='/dashboard'  />
        }
        .bind(this),
        1000
    );
  }
  render() {
    const {user} = this.props;
    let cusClass = ['modal','fade','auth-modal','no-guest-checkout'];
    let addedAlert;
    if (this.state.added) {
      addedAlert = <div className="alert alert-success">
      <strong>Success!</strong>   {this.state.msg}
      </div>;
      // this.closePopUp()
    }
    return (
        <div className={cusClass.join(' ')} id="auth-modal" tabindex="-1" role="dialog">
           <div className="modal-dialog">
              <div className="modal-content">
                 <button type="button" className="close" id = "hidePopUpBtn" data-dismiss="modal" aria-hidden="true">×</button>
                 <div className="modal-body">
                    <div className="content-block auth login js-login-register-flow">
                <ul className="nav nav-pills nav-justified login-tabs no-guest-checkout">
                  <li className="login-tabs__sign-up"><a data-toggle="tab" href="#register">Sign up</a></li>
                  <li className="login-tabs__login active"><a data-toggle="tab" href="#login">Log in</a></li>
                </ul>
                  <div className="login-register-content-block tab-content">
                  <div id="login" className="tab-pane active show">
                  {addedAlert}
                    <div className="facebook-login-container">
                       <a href="https://www.facebook.com/v2.8/dialog/oauth?client_id=1441869016037016&amp;state=afe9c619d8712b868b886f6354651c21&amp;response_type=code&amp;sdk=php-sdk-5.4.4&amp;redirect_uri=https%3A%2F%2Fwww.foodpanda.in%2Ffacebook-login-callback%3FfacebookRedirectUrl%3DL2NvbnRlbnRzL2Fib3V0Lmh0bQ%253D%253D&amp;scope=email%2Cpublic_profile" className="init-facebook-login btn btn-lg btn-block js-modal-ignore">
                       Continue with Facebook
                       </a>
                       <div className="or-separator">
                        <span>OR</span>
                       </div>
                    </div>
                    <form className="login">
                       <div className="form-group login__email">
                        <label className="control-label sr-only required" for="customer_login_email"> Email
                        </label>
                        <input id="customer_login_email" name="email" onChange={this.handleChange} required="required" className="form-control input-lg" placeholder="Email" type="email"/>
                        <span className="input-helper">
                            <svg className="next-icon next-icon--color-slate-lighter next-icon--size-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M460.6 147.3L353 256.9c-.8.8-.8 2 0 2.8l75.3 80.2c5.1 5.1 5.1 13.3 0 18.4-2.5 2.5-5.9 3.8-9.2 3.8s-6.7-1.3-9.2-3.8l-75-79.9c-.8-.8-2.1-.8-2.9 0L313.7 297c-15.3 15.5-35.6 24.1-57.4 24.2-22.1.1-43.1-9.2-58.6-24.9l-17.6-17.9c-.8-.8-2.1-.8-2.9 0l-75 79.9c-2.5 2.5-5.9 3.8-9.2 3.8s-6.7-1.3-9.2-3.8c-5.1-5.1-5.1-13.3 0-18.4l75.3-80.2c.7-.8.7-2 0-2.8L51.4 147.3c-1.3-1.3-3.4-.4-3.4 1.4V368c0 17.6 14.4 32 32 32h352c17.6 0 32-14.4 32-32V148.7c0-1.8-2.2-2.6-3.4-1.4z"/><path d="M256 295.1c14.8 0 28.7-5.8 39.1-16.4L452 119c-5.5-4.4-12.3-7-19.8-7H79.9c-7.5 0-14.4 2.6-19.8 7L217 278.7c10.3 10.5 24.2 16.4 39 16.4z"/></svg>
                            </span>
                       </div>
                       <div className="form-group login__password">
                        <label className="control-label sr-only required" for="customer_login_password">Password
                        </label>
                        <input id="customer_login_password" name="password" onChange={this.handleChange} required="required" className="form-control input-lg" placeholder="Password" autocomplete="off" type="password"/>
                        <span className="input-helper">
                          <svg className="next-icon next-icon--color-slate-lighter next-icon--size-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M376 192h-24v-46.7c0-52.7-42-96.5-94.7-97.3-53.4-.7-97.3 42.8-97.3 96v48h-24c-22 0-40 18-40 40v192c0 22 18 40 40 40h240c22 0 40-18 40-40V232c0-22-18-40-40-40zM270 316.8v68.8c0 7.5-5.8 14-13.3 14.4-8 .4-14.7-6-14.7-14v-69.2c-11.5-5.6-19.1-17.8-17.9-31.7 1.4-15.5 14.1-27.9 29.6-29 18.7-1.3 34.3 13.5 34.3 31.9 0 12.7-7.3 23.6-18 28.8zM324 192H188v-48c0-18.1 7.1-35.1 20-48s29.9-20 48-20 35.1 7.1 48 20 20 29.9 20 48v48z"/></svg>
                        </span>
                       </div>
                       <div className="form-group">
                        <div className="col-sm-12 auth-submit">
                           <div className="login__remember-me">
                            <input id="customer_login_rememberCustomerLogin" name="remember" checked="checked" value="1" type="checkbox"/>
                            <label className="control-label" for="customer_login_rememberCustomerLogin"> Remember me
                            </label>
                          </div>
                           <div className="login__forgot-password">
                            <a href="/forgot-your-password">
                            Forgot your password?
                            </a>
                           </div>
                        </div>
                       </div>
                       <div className="form-group login__submit">
                        <button type="submit" id="customer_login_login" className="btn btn-primary btn-lg btn-block" onClick={this.Login}>Log in</button>
                       </div>
                    </form>
                  </div>
                  <div id="register" className="tab-pane fade">
                    <div className="login-register-content-block">
                    {addedAlert}
                      <div className="facebook-login-container">
                        <a href="https://www.facebook.com/v2.8/dialog/oauth?client_id=1441869016037016&amp;state=afe9c619d8712b868b886f6354651c21&amp;response_type=code&amp;sdk=php-sdk-5.4.4&amp;redirect_uri=https%3A%2F%2Fwww.foodpanda.in%2Ffacebook-login-callback%3FfacebookRedirectUrl%3DL2NvbnRlbnRzL2Fib3V0Lmh0bQ%253D%253D&amp;scope=email%2Cpublic_profile" className="init-facebook-login btn btn-lg btn-block js-modal-ignore">
                        Continue with Facebook
                        </a>
                        <div className="or-separator">
                          <span>OR</span>
                        </div>
                      </div>
                      <form action="/customer/register" method="post" role="form" novalidate="novalidate" className="sign-up">
                          <div className="form-group">
                           <div className="col-12 p-0 raw">
                            <div className="col-md-6">
                               <label className="control-label sr-only required" for="customer_registration_firstName"> First name</label>
                               <input id="customer_registration_firstName" name="firstname" value={this.state.firstname} onChange={this.handleChange} required="required" className="form-control input-lg" placeholder="First name" type="text"/>
                            </div>
                            <div className="col-md-6">
                               <label className="control-label sr-only required" for="customer_registration_lastName">Last name</label>
                               <input id="customer_registration_lastName" name="lastname" value={this.state.lastname} onChange={this.handleChange} required="required" className="form-control input-lg" placeholder="Last name" type="text"/>
                            </div>
                           </div>
                          </div>
                          <div className="form-group">
                           <label className="control-label sr-only required" for="customer_registration_mobileNumber"> Mobile</label>
                           <div className="col-12 p-0 raw">
                            <div className="col-3">
                               <input id="customer_registration_mobileCountryCode" name="mobilecountrycode" value={this.state.mobilecountrycode} onChange={this.handleChange} required="required" readonly="readonly" className="form-control input-lg" value="91" type="text"/>
                            </div>
                            <div className="col-9">
                               <input id="customer_registration_mobileNumber" name="mobile" value={this.state.mobile} onChange={this.handleChange} required="required" className="form-control input-lg" placeholder="Mobile" type="text"/>
                            </div>
                           </div>
                          </div>
                          <div className="form-group">
                           <div className="col-12">
                             <label className="control-label sr-only required" for="customer_registration_email">Email</label>
                             <input id="customer_registration_email" name="reg_email" value={this.state.reg_email} onChange={this.handleChange} required="required" className="form-control input-lg" placeholder="Email" type="email"/>
                          </div>
                          </div>
                          <div className="form-group cst-group">
                           <div className="col-12 p-0 raw">
                            <div className="col-md-6">
                               <label className="control-label sr-only required" for="customer_registration_password_first">Password</label>
                               <input id="customer_registration_password_first" name="password" value={this.state.password} onChange={this.handleChange} required="required" className="form-control input-lg" placeholder="Password" autocomplete="off" type="password"/>
                            </div>
                            <div className="col-md-6">
                               <label className="control-label sr-only required" for="customer_registration_password_second"> Repeat password</label>
                               <input id="customer_registration_password_second" name="confirmedPassword" value={this.state.confirmedPassword} onChange={this.handleChange} required="required" className="form-control input-lg" placeholder="Repeat password" autocomplete="off" type="password"/>
                            </div>
                           </div>
                          </div>
                          <div className="form-group">
                          <div className="col-sm-12 auth-submit login_privacy">
                             <input id="customer_registration_termsAndConditionsAccepted" name="terms" value={this.state.terms} onChange={this.handleChange} required="required" value="1" type="checkbox"/>
                             <label className="control-label required" for="customer_registration_termsAndConditionsAccepted">I have read and accepted the <a target="_blank" href="/contents/terms-and-conditions.htm">Terms and conditions</a> and <a target="_blank" href="/contents/privacy.htm">Privacy policy</a>
                             </label>
                          </div>
                          </div>
                          <div className="form-group">
                           <button type="submit" id="customer_registration_registration" name="customer_registration" onClick={this.Register} className="btn btn-primary btn-lg btn-block">Sign up</button>
                          </div>
                         </form>
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