import React, { useState } from 'react';

export const StateContext = React.createContext();

export default function GlobalState(props) {
  // State
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [productId, setProductId] = useState('');
  const [productIdBidding, setProductIdBidding] = useState('');

  const state = {
    isLogged,
    setIsLogged,
    user,
    setUser,
    productId,
    setProductId,
    productIdBidding,
    setProductIdBidding
  };
  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}
