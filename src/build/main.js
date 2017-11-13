'use strict';

const React = require('react'),
      ReactDOM = require('react-dom'),
      TitleBar = require('./layout/titlebar').default,
      Content = require('./layout/content').default;

ReactDOM.render([React.createElement(TitleBar, { key: 'titlebar' }), React.createElement(Content, { key: 'content' })], document.getElementById('root'));