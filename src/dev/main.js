import React from "react";
import { render } from "react-dom";
import TitleBar from "./layout/titlebar";
import Content from "./layout/content";
import ViewApp from "./components/ViewApp";


render(
  [
    <TitleBar key="titlebar" />,
    <Content key="content"><ViewApp /></Content>,
  ],
  document.getElementById('root'),
);
