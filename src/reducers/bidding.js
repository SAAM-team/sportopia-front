/* eslint-disable import/no-anonymous-default-export */
const initState = {
  biddingProducts: [],
  biddingRoom: []
};

// Reducer

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_UNDER_BID':
      return {
        biddingProducts: payload,
        biddingRoom: state.biddingRoom
      };

    case 'ENTER_ROOM':
      console.log('inside the reducer', payload);
      return {
        biddingRoom: payload.product,
        biddingProducts: state.biddingProducts
      };
    default:
      return state;
  }
};
