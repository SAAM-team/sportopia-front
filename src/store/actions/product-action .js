import superagent from 'superagent';
import dotenv from 'dotenv';
dotenv.config();
const api = 'https://sportopiav1.herokuapp.com/all/products';

export const getRemoteData = () => {
  return (dispatch) => {
    return superagent.get(api).then((response) => {
      dispatch(getAction( JSON.parse(response.text).result ));
    });
  };
};

const getAction = (payload) => {
  return {
    type: 'GET_P',
    payload: payload,
  };
};
