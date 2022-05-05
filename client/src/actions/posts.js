import { FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, SELECT } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data }); //sending data to reducers
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try{
    //In try block we will communicate with the back end
    const { data: {data} } = await api.feacthPostsBySearch(searchQuery);
    dispatch({type: FETCH_BY_SEARCH, payload: data});
  }catch(error){
    console.log(error);
  }
}

// export const createPost = (post) => async (dispatch) => {
//   try {
//     const { data } = await api.createPost(post);
//     dispatch({ type: CREATE, payload: data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const selectPost = (id) => async (dispatch) => {
  try {
    await api.selectPost(id);
    dispatch({ type: SELECT, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

console.log(selectPost)