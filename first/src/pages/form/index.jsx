'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'components/layout';
import './index.scss';

class Form extends React.Component {
  render() {
    return (
      <Layout>
        <div className="form-page">
          <div className="tip-text">
            <span>这是一个简单的页面,不加通用layout的页面,您可以自由发挥</span>
          </div>
        </div>
      </Layout>
    );
  }
}

ReactDOM.render(<Form />, document.getElementById('container'));

