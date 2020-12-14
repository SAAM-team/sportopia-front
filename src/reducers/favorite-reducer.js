let initialState = {
    favoriteItem: [],
    count: 0
}

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case 'GET-FAV':

            // console.log('payloaaaad--GET cart', payload)
            // payload.forEach(element => {
                // console.log('element >',element);
                // if(state.favoriteItem.length < 3){
                // state.favoriteItem.push(element)
                // }
            //   });
            return {
                favoriteItem: payload,
                count: 0
            }

        case 'ADD-FAV':

         state.favoriteItem.push(payload);
            return { ...state };

        case 'REMOVE-FAV':
            state.favoriteItem.splice(payload, 1);
            return {
                favoriteItem: payload,
                count: 0
            };

        default:
            return state;
    }
}



