import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Comment from './Comment';
import Footer from './Footer';

const propTypes = {
    children: PropTypes.node.isRequired,
};
const defaultProps = {};

const App = ({children}) => {
  let url_params = window.location.href.split("/");
  let prms = url_params[url_params.length-1];
  if(prms == 'signature' || prms == 'dashboard'){
    return (
        <div>
            {children}
        </div>
    );
  }
    return (
        <div>
            <Header />
            {children}
            <Comment />
            <Footer />
        </div>
    );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
