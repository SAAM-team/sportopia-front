let initialState = {
    favoriteItem: [],
    count: 0
}

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case 'GET-FAV':
            return {
                favoriteItem: payload,
                count: payload.length,
            }

        case 'ADD-FAV':

         state.favoriteItem.push(payload);
         state.payload ++;
            return { ...state };

        case 'REMOVE-FAV':
            let filtered = state.favoriteItem.filter(product => product !== payload);
            return {
                favoriteItem: filtered,
                count: state.count--
            };

        default:
            return state;
    }
}



