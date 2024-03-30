import authApi from '../api/authApi';

import {
  ERROR,
  FETCH_PIZZAS,
  FETCH_PIZZAS_SUCCESS,
  SEARCH_SUCCESS,
  SERACH_ERROR,
  SHEARCH_REQ,
  SHOW_SIDEBAR,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_ERROR,
  DELETE_PIZZA_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  FETCH_PRODUCT_BY_ID_REQUEST,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
} from './types';

export const fetchPizzas = (category) => async (dispatch) => {
  dispatch({type: FETCH_PIZZAS, payload: []});
  try {
    const {data} = await authApi.get(`/api/products?category=${category}`);
    dispatch({type: FETCH_PIZZAS_SUCCESS, payload: data});
  } catch (e) {
    dispatch({type: ERROR, payload: 'Opps!,something went wrong'});
  }
};

export const fetchProducts = () => async (dispatch) => {
  dispatch({type: FETCH_PRODUCTS, payload: []});
  try {
    const {data} = await authApi.get('/api/products');
    dispatch({type: FETCH_PRODUCTS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: FETCH_ERROR, payload: 'Oops!, something went wrong'});
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch({type: FETCH_PRODUCT_BY_ID_REQUEST});

    // Make a request to fetch the product by its ID
    const response = await authApi.get(`/api/products/${id}`);
    // Dispatch a success action with the fetched product data
    dispatch({
      type: FETCH_PRODUCT_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Dispatch a failure action if an error occurs
    dispatch({
      type: FETCH_PRODUCT_BY_ID_FAILURE,
      payload: error.message || 'Failed to fetch product details',
    });
  }
};

export const searchProducts = (name) => async (dispatch) => {
  dispatch({type: SHEARCH_REQ});
  try {
    const {data} = await authApi.get(`/api/products/search?name=${name}`);
    dispatch({type: SEARCH_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: SERACH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePizza = (productId) => async (dispatch) => {
  try {
    // Make a request to your API to delete the product with the given productId
    // For example:
    await authApi.delete(`/api/products/${productId}`);

    // Dispatch a success action if the deletion was successful
    dispatch({type: DELETE_PIZZA_SUCCESS, payload: productId});
  } catch (error) {
    // Dispatch an error action if there was an error during deletion
    dispatch({type: ERROR, payload: 'Oops!, something went wrong'});
  }
};

export const updateProduct = (productId, formData) => async (dispatch) => {
  try {
    dispatch({type: UPDATE_PRODUCT_REQUEST});

    // Make a request to update the product with the given productId
    const {data} = await authApi.put(`/api/products/${productId}`, formData);

    dispatch({type: UPDATE_PRODUCT_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response?.data?.message || 'Failed to update product',
    });
    throw error;
  }
};

export const showSideBar = (boolean) => {
  return {type: SHOW_SIDEBAR, payload: boolean};
};
