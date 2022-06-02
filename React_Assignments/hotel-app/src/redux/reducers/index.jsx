import { combineReducers } from "redux";
import data from "../../config/data";

const roomsData = data.map((item) => {
  let id = item.sys.id;
  let images = item.fields.images.map((image) => image.fields.file.url);
  let room = { ...item.fields, images, id };
  return room;
});

const get_rooms_data = (state = roomsData, action) => {
  return state;
};

const getUser = (state = null, action) => {
  if (action.type === "USER_AUTH") {
    return (state = action.payload);
  }

  return state;
};

export const all_reducers = combineReducers({
  get_rooms_data: get_rooms_data,
  getUser: getUser,
});
