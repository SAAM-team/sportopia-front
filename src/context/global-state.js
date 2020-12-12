import React, { useState } from 'react';
import superagent from 'superagent';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

export const StateContext = React.createContext();
const JWT_SECRET = 'thebestsecrett';

const API_LINK = 'https://sportopiav1.herokuapp.com';

export default function GlobalState(props) {
  // State
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [productId, setProductId] = useState('');
  const [singleProductId, setSingleProductId] = useState('');
  const [productIdBidding, setProductIdBidding] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Functions

  const login = async (username, password) => {
    let ua1 = superagent.agent();
    try {
      const response = await ua1
        .post(`${API_LINK}/signin`)
        .set('authorization', `Basic ${btoa(`${username}:${password}`)}`)
        .end(function (err, res) {
          // console.log(res);
          try {
            let token = JSON.parse(res.text);
            validateToken(token);
          } catch (error) {
            setError(res.text);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const validateToken = (token) => {
    try {
      token = token.token;
      console.log(token);
      let user = jwt.verify(token, JWT_SECRET);
      cookie.save('token', token, { path: '/', maxAge: 2592000 });
      cookie.save('user', user.user_id, { path: '/', maxAge: 2592000 });
      setLoginState(true, token, user);
    } catch (e) {
      setError('Wrong password or username');
      setLoginState(false, null, {});
    }
  };

  const register = async (obj) => {
    try {
      const response = await superagent.post(`${API_LINK}/signup`).send(obj);
      console.log(response);
      if (response.body.message === 'This username already used') {
        setError(response.body.message);
      } else {
        if (obj.role === 'seller') {
          setSuccess(
            'Your registered as a Seller, Please wait 1-2 days to be activated'
          );
        } else {
          setSuccess(
            'You have registered as a Buyer Please sign with you account!!'
          );
        }
      }
    } catch (error) {
      setError(
        'Something Went Bad, Please try again later!! Thank you for understanding'
      );
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    console.log('inside the state', user);
    setIsLogged(loggedIn);
    setToken(token);
    setUser(user);
  };

  const state = {
    isLogged,
    setIsLogged,
    user,
    setUser,
    productId,
    singleProductId,
    setProductId,
    productIdBidding,
    setProductIdBidding,
    setSingleProductId,
    login,
    register,
    error,
    success,
    setSuccess,
    setError,
  };
  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}
