import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducerCollection from "../reducers/_collection";
import subscriptionCollection from "../subscriptions/_collection";
import Clock from "../components/Clock";

const store = createStore(reducerCollection);

store.subscribe(() => {
  subscriptionCollection.forEach((subscription) => {
    subscription(store.getState(), store.dispatch);
  });
});

const ViewApp = () => (
  <Provider store={store}>
    <Clock />
  </Provider>
);

export default ViewApp;
