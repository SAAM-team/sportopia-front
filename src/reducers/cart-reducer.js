let initialState = {
    cartItem: [],
    count: 0
}

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case 'GET-CART':

            // console.log('payloaaaad--GET cart', payload)
            // payload.forEach(element => {
                // console.log('element >',element);
                // if(state.cartItem.length < 3){
                // state.cartItem.push(element)
                // }
            //   });
            return {
                cartItem: payload,
                count: 0
            }

        case 'ADD-CART':

         state.cartItem.push(payload);
            return { ...state };

        case 'REMOVE-CART':
            state.cartItem.splice(payload, 1);
            return {
                cartItem: payload,
                count: 0
            };

        default:
            return state;
    }
}



