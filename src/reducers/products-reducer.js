let initialState = { results: [], selectedProduct: [] };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_P':
      return {
        results: payload,
        selectedProduct: state.selectedProduct,
      };
    case 'GetSingleProductID':
      return {
        results: state.results,
        selectedProduct: payload,
      };

    default:
      return {
        results: state.results,
        selectedProduct: state.selectedProduct,
      };
  }
};
