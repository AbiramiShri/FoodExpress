// Import action types
import {
  FETCH_PRODUCT_BY_ID_REQUEST,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
} from '../actions/types'; // Make sure to import your action types properly

// Initial state
const initialState = {
  loading: false,
  error: '',
  product: null,
};

// Reducer function
const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        product: null,
      };
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        product: action.payload,
      };
    case FETCH_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        product: null,
      };
    default:
      return state;
  }
};

export default productDetailsReducer;
