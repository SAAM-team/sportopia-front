/* eslint-disable import/no-anonymous-default-export */
const initState = {
  sellersProducts: []
};
// Reducers
export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_SELLERS_PRODUCT':
      return {
        sellersProducts: payload
      };
    default:
      return state;
  }
};
