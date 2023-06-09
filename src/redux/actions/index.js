import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const login = (data, navigate) => async (dispatch) => {
  const { email, password } = data;

  const loginWithPolling = async () => {
    try {
      const response = await fetch(
        "https://pink-lovely-hen.cyclic.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        // Store the responseData in sessionStorage instead of localStorage
        sessionStorage.setItem("userData", JSON.stringify(responseData));

        dispatch({
          type: LOGIN_SUCCESS,
          payload: responseData,
        });
        toast.success("Login successful!");
         <ToastContainer />;

        navigate("/home");
      } else {
        const errorData = await response.json();
        dispatch({
          type: LOGIN_FAILURE,
          payload: errorData.message || "Could not sign up. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: LOGIN_FAILURE });
    }
  };

  // Call the loginWithPolling function immediately
  loginWithPolling();

  // Set up polling interval every 30 seconds
  setInterval(loginWithPolling, 300000);
};

export const logout = (navigate) => (dispatch) => {
  // Clear the session storage
  sessionStorage.removeItem("userData");

  // Dispatch an action to clear the state
  dispatch({ type: "auth/resetLoginState" });

  // Navigate back to "/auth"
  navigate("/auth");
};
