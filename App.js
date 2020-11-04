import React from "react";
import Main from "./Component/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "./Component/LoadingComponent";

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
