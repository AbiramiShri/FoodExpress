import authApi from '../api/authApi';

import {
  ADD_WISHLIST_ERROR,
  ADD_WISHLIST_REQ,
  ADD_WISHLIST_SUCCESS,
  DELETE_WISHLIST_ITEM,
  GET_WISHLIST,
} from './types';

export const addToWishlist = (item) => async (dispatch, getState) => {
  dispatch({type: ADD_WISHLIST_REQ, payload: item});
  try {
    const user = getState().user?.user;
    const {data} = await authApi.post('/api/products/wishlist', item, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log(data)
    dispatch({type: ADD_WISHLIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getWishlist = () => async (dispatch, getState) => {
  try {
    const user = getState().user?.user;
    const {data} = await authApi.get('/api/products/wishlist', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch({type: GET_WISHLIST, payload: data});
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteItemFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({type: ADD_WISHLIST_REQ, payload: id});
  try {
    const user = getState().user?.user;
    const {data} = await authApi.delete(`/api/products/wishlist/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log(data)

    dispatch({type: DELETE_WISHLIST_ITEM, payload: id});
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
