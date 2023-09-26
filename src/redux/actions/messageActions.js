import {
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  FETCH_MESSAGE_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
} from "../actionTypes";

export const sendMessage = (data) => async (dispatch) => {
  const { senderId, receiverId, content} = data
  try {
    const response = await fetch(
      `https://twittbook-backend.onrender.com/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId,
          receiverId,
          content,
        }),
      }
    );
    if (response.ok) {
      const messages = await response.json();
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: messages,
      });
    } else {
      throw new Error("Failed to send message.");
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: SEND_MESSAGE_FAILURE,
      payload: error.message || "Failed to send message.",
    });
  }
};

export const fetchMessages = (senderId, receiverId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://twittbook-backend.onrender.com/messages/${senderId}/${receiverId}`
    );
    if (response.ok) {
      const messages = await response.json();

      dispatch({
        type: FETCH_MESSAGE_SUCCESS,
        payload: messages,
      });
    } else {
      throw new Error("Failed to fetch messages.");
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_MESSAGE_FAILURE,
      payload: error.message || "Failed to fetch messages.",
    });
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`https://twittbook-backend.onrender.com/users`);
    if (response.ok) {
      const user = await response.json();

      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: user,
      });
    } else {
      throw new Error("Failed to fetch user data.");
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_USER_FAILURE,
      payload: error.message || "Failed to fetch user data.",
    });
  }
};
export const setSelectedUser = (user) => {
  return {
    type: "SET_SELECTED_USER",
    payload: user,
  };
};
