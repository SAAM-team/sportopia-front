let initialState = {
  results: [],
  selectedProduct: [],
  activeProducts: [],
  buyProduct: [],
  redirectURL: {},
};
// let pId = cookies.load('pId');
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_P':
      return {
        results: payload,
        activeProducts: state.activeProducts,
        selectedProduct: state.selectedProduct,
        buyProduct: state.buyProduct,
        redirectURL: state.redirectURL,
      };
    case 'GetSingleProductID':
      console.log('pay load in the reducer for single product', payload);
      return {
        results: state.results,
        selectedProduct: payload,
        activeProducts: state.activeProducts,
        buyProduct: state.buyProduct,
        redirectURL: state.redirectURL,
      };
    case 'ACTIVE':
      let filterdProducts = state.results.filter(
        (product) => product.category_id === payload
      );
      return {
        results: state.results,
        selectedProduct: state.selectedProduct,
        activeProducts: filterdProducts,
        buyProduct: state.buyProduct,
        redirectURL: state.redirectURL,
      };
    case 'buyingProduct':
      return {
        results: state.results,
        selectedProduct: state.selectedProduct,
        activeProducts: state.activeProducts,
        buyProduct: state.buyProduct,
        redirectURL: payload,
      };
    default:
      return {
        results: state.results,
        selectedProduct: state.selectedProduct,
        activeProducts: state.activeProducts,
        buyProduct: state.buyProduct,
        redirectURL: state.redirectURL,
      };
  }
};
