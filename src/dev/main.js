import React from "react";
import { render } from "react-dom";
import TitleBar from "./components/layout/titlebar";
import Content from "./components/layout/content";
import ViewApp from "./components/ViewApp";

// const electron = window.require('electron');
// const remote = electron.remote;
// console.log(remote.process.env.TZ);

render(
  [
    <TitleBar key="titlebar" />,
    <Content key="content"><ViewApp /></Content>,
  ],
  document.getElementById('root'),
);
