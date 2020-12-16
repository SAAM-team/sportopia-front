/* eslint-disable import/no-anonymous-default-export */
const initState = {
  biddingProducts: [],
  biddingRoom: [],
  messages: [],
  typing: ''
};

// Reducer

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_UNDER_BID':
      return {
        biddingProducts: payload,
        biddingRoom: state.biddingRoom,
        messages: state.messages,
        typing: state.typing
      };

    case 'ENTER_ROOM':
      return {
        biddingRoom: payload,
        biddingProducts: state.biddingProducts,
        messages: state.messages,
        typing: state.typing
      };
    case 'MESSAGE':
      return {
        biddingRoom: state.biddingRoom,
        biddingProducts: state.biddingProducts,
        messages: [...state.messages, payload],
        typing: state.typing
      };
    case 'TYPING':
      return {
        biddingRoom: state.biddingRoom,
        biddingProducts: state.biddingProducts,
        messages: [...state.messages, payload],
        typing: payload
      };
    default:
      return {
        biddingProducts: state.biddingProducts,
        biddingRoom: state.biddingRoom,
        messages: state.messages,
        typing: state.typing
      };
  }
};
