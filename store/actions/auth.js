export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
    console.log(resData);

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
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

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
