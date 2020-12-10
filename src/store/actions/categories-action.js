import superagent from 'superagent';
import dotenv from 'dotenv';
dotenv.config();
const api = 'https://sportopiav1.herokuapp.com/all/categories';

export const getRemoteData = () => {
  return (dispatch) => {
    return superagent.get(api).then((response) => {
      console.log(JSON.parse(response.text));
      dispatch(getAction({ results: JSON.parse(response.text).result }));
    });
  };
};

const getAction = (payload) => {
  return {
    type: 'GET_C',
    payload: payload,
  };
};
