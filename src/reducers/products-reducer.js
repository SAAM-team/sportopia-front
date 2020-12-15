import cookies from 'react-cookies';

let initialState = {
  results: [],
  activeProducts: [],
  selectedProduct: []
};
let cId = cookies.load('cId');

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_P':
      return {
        results: payload,
        selectedProduct: state.selectedProduct,
        activeProducts: payload
      };
    case 'ACTIVE':
      let filterdProducts = state.results.filter(
        (product) => product.category_id === payload
      );
      return {
        results: state.results,
        activeProducts: filterdProducts,
        selectedProduct: state.selectedProduct
      };
    case 'DEC-Stock':
      state.results.forEach((item) => {
        console.log('DEC_STOCK', item);
        if (item.name === payload.name) item.inStock--;
      });
      return { ...state };

    case 'INC-Stock':
      state.results.forEach((item) => {
        if (item.name === payload.name) item.inStock++;
      });
      return { ...state };
    case 'GetSingleProductID':
      return {
        results: state.results,
        selectedProduct: payload,
        activeProducts: state.activeProducts
      };

    default:
      return {
        results: state.results,
        selectedProduct: state.selectedProduct,
        activeProducts: state.activeProducts
      };
  }
};
