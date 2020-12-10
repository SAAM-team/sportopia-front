import superagent from 'superagent';

const API_LINK_Bidding = 'https://sportopiav1.herokuapp.com/bidding';

export const getBiddingItems = () => {
  return (dispatch) => {
    return superagent.get(API_LINK_Bidding).then((res) => {
      // console.log(res);
    });
  };
};

export const getInsideBid = (product_id) => {
  console.log('inside the actions', product_id);
  return (dispatch) => {
    return superagent.get(`${API_LINK_Bidding}/${product_id}`).then((res) => {
      let product = JSON.parse(res.text).product;
      dispatch(enterRoom({ product }));
    });
  };
};

export const getBid = (payload) => {
  return {
    type: 'GET_UNDER_BID',
    payload: payload
  };
};

export const enterRoom = (payload) => {
  return {
    type: 'ENTER_ROOM',
    payload: payload
  };
};
