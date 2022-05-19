import { feedbackList } from "../../config/feedback";
import { combineReducers } from "redux";

const getUser = (state = null, action) => {
  if (action.type === "USER_AUTH") {
    return (state = action.payload);
  }

  return state;
};

const fb_create_comments = (state = feedbackList, action) => {
  if (action.type === "FB_CREATE") {
    // console.log(state.concat(action.payload));
    return state.concat(action.payload);
  }

  return state;
};

export const all_reducers = combineReducers({
  getUser: getUser,
  fb_create_comments: fb_create_comments,
});
