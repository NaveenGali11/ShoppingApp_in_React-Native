import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: "AUTHENTICATE", userId: userId, token: token });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyC8bPl6O6MG00tH_DQRFDjQbRh-AODeh8E ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;

      let message = "SomeThing Went Wrong";

      if (errorID === "EMAIL_EXISTS") {
        message = "This Email Address exists already !";
      } else if (errorID === "INVALID_PASSWORD") {
        message = "Email and Password Does not Match";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyC8bPl6O6MG00tH_DQRFDjQbRh-AODeh8E ",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorID = errorResData.error.message;

      let message = "SomeThing Went Wrong";

      if (errorID === "EMAIL_NOT_FOUND") {
        message = "This Email Could not be found!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    // dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  LogBox.ignoreAllLogs();
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
