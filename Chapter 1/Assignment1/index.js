import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import axios from "axios";
const initialState = {
  posts: [],
  loading: false,
  error: null,
};
const store = createStore(postReducer, applyMiddleware(thunk));

function postReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.playload };
    case "FETCH_POSTS_FAILURE":
      return { ...state, loading: false, error: action.playload };
    default:
      return state;
  }
}

function fetchPostsRequest() {
  return { type: "FETCH_POSTS_REQUEST" };
}
function fetchPostsSuccess(posts) {
  return { type: "FETCH_POSTS_SUCCESS", playload: posts };
}
function fetchPostsFailure(error) {
  return { type: "FETCH_POSTS_FAILURE", playload: error };
}

function fetchPosts() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
      dispatch(fetchPostsSuccess(sortedData));
      console.log("Post Loaded Successfully", sortedData);
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
      console.error("Error while loading", error.message);
    }
  };
}

store.dispatch(fetchPosts());
