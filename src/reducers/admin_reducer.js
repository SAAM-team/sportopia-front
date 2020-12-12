/* eslint-disable import/no-anonymous-default-export */
const initState = {
  information: []
};

// Reducers

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_SELLERS':
      return {
        information: payload
      };
    case 'GET_BUYER':
      return {
        information: payload
      };
    case 'GET_A_SELLERS':
      return {
        information: payload
      };
    case 'GET_A_BUYER':
      return {
        information: payload
      };
    case 'GET_D_BUYER':
      return {
        information: payload
      };
    case 'GET_D_SELLER':
      return {
        information: payload
      };
    case 'GET_All_PRO':
      return {
        information: payload
      };
    case 'GET_All_D_PRO':
      return {
        information: payload
      };
    case 'GET_All_A_PRO':
      return {
        information: payload
      };
    case 'GET_All_B_PRO':
      return {
        information: payload
      };
    case 'GET_All_C_PRO':
      return {
        information: payload
      };
    case 'GET_All_F_PRO':
      return {
        information: payload
      };
    default:
      return state;
  }
};
