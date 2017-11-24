import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducerCollection from "../reducers/_collection";
import subscriptionCollection from "../subscriptions/_collection";
import AlarmClock from "../containers/AlarmClock";


const store = createStore(reducerCollection);

store.subscribe(() => {
  subscriptionCollection.forEach((subscription) => {
    subscription(store.getState(), store.dispatch);
  });
});

const ViewApp = () => (
  <Provider store={store}>
    <AlarmClock />
  </Provider>
);

export default ViewApp;
