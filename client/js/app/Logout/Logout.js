import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import auth from 'src/auth';

@connect((store) => {
    return {};
})
export default class Logout extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.logout();
  }
  static propTypes = {
      dispatch: PropTypes.func,
  };

  logout(){
    localStorage.clear();
    this.props.dispatch(auth.actions.logout());
    // this.props.dispatch(auth.actions.logout());
  }

    componentDidMount() {
        this.props.dispatch(auth.actions.logout());
    }

    render() {
        return <div>See you again!</div>;
    }
}
