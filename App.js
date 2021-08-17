import React, { useState } from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigation";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "jetbrains-light": require("./assets/fonts/JetBrainsMono-Light.ttf"),
    "jetbrains-bold": require("./assets/fonts/JetBrainsMono-Bold.ttf"),
    "jetbrains-italic": require("./assets/fonts/JetBrainsMono-Italic.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={(err) => {
          console.log(err);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
