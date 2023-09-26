import {SIGNUP_FAILURE, SIGNUP_SUCCESS} from "../actionTypes"

export const signup = (data, navigate) => async (dispatch) => {
  const { firstName, lastName, username, email, password, profilePicture } = data;

  try {
    const response = await fetch(
      "https://twittbook-backend.onrender.com/users/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
          profilePicture,
        }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem("userData", JSON.stringify(responseData));

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: responseData,
      });
    } else {
      const errorData = await response.json();
      dispatch({
        type: SIGNUP_FAILURE,
        payload: errorData.message || "Could not sign up. Please try again.",
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: SIGNUP_FAILURE,
      payload: "Could not sign up. Please try again.",
    });
  }
};
