import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider as ReduxStoreScope } from "react-redux";
import { AppContainer as HMRScope } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import WindowTitleBar from "./components/window/WindowTitleBar";
import WindowContent from "./components/window/WindowContent";
import reducerCollection from "./reducers/_collection";
import subscriptionCollection from "./subscriptions/_collection";
import AlarmClock from "./containers/AlarmClock";
import SetAlarm from "./containers/SetAlarm";

import "../../node_modules/semantic-ui-css/semantic.min.css";
import "../style/index.scss";


// const electron = window.require("electron");
// const remote = electron.remote;
// console.log(remote.process.env.TZ);

const store = createStore(reducerCollection);

store.subscribe(() => {
  subscriptionCollection.forEach((subscription) => {
    subscription(store.getState(), store.dispatch);
  });
});


render(
  [
    <WindowTitleBar key="titlebar" />,
    <WindowContent key="content">
      <ReduxStoreScope store={store}>
        <HMRScope>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={AlarmClock} />
              <Route path="/SetAlarm" component={SetAlarm} />
            </Switch>
          </BrowserRouter>
        </HMRScope>
      </ReduxStoreScope>
    </WindowContent>,
  ],
  document.getElementById("root"),
);
