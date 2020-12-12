let initialState = { 
  results: [] ,
  activeProducts : [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_P':
      return {
        results : payload,
        activeProducts : state.activeProducts
      };

      case 'ACTIVE':
       let filterdProducts = state.results.filter(product=> product.category_id===payload);
       console.log('this is the active products',filterdProducts);

      return {
        results : state.results,
        activeProducts : filterdProducts,
      };

    default:
      return {
        results : state.results,
        activeProducts : state.activeProducts
      }
  }
};
