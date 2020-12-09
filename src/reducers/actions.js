import superagent from 'superagent';

const API_LINK = 'https://sportopiav1.herokuapp.com/bidding';

export const getBiddingItems = () => {
  return (dispatch) => {
    return superagent.get(API_LINK).then((res) => {
      console.log(res);
    });
  };
};

export const getInsideBid = (product_id) => {
  return (dispatch) => {
    return superagent.get(`${API_LINK}/${product_id}`).then((res) => {});
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
