import { Category } from "@material-ui/icons";

let initialState = { results: [], active: '' };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;

  console.log("state",state);
  switch (type) {
    case 'GET_C':
      return{
        results: payload,
        active: state.active
      };
    case 'ACTIVE':
     const activated =  state.results.filter((category)=> category.id === payload );
     console.log('this is the activated',activated)
      return {
        results: state.results,
        active: activated
      }
    //   const active = payload;
    //   const CertainCategories = state.results
    //   // console.log('CertainCategories insid switch case active',CertainCategories);
    //   return { CertainCategories, active };
    default:
      return {
        results : state.results,
        active : state.active,
      };
  }
};
