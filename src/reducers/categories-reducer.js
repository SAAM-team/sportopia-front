let initialState = { results: [], active: '' };
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_C':
      return{
        results: payload,
        active: state.active
      };
    case 'ACTIVE':
     const activated =  state.results.filter((category)=> category.id === payload );
      return {
        results: state.results,
        active: activated
      }
    default:
      return {
        results : state.results,
        active : state.active,
      };
  }
};
