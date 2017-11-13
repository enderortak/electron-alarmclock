const
React = require('react'),
ReactDOM = require('react-dom'),
TitleBar = require('./layout/titlebar').default,
Content = require('./layout/content').default;


ReactDOM.render(
[<TitleBar key="titlebar"/>, <Content key="content"/>],
    document.getElementById('root')
);