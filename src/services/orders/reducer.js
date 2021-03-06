import { GET_ORDERS } from "./actionTypes";

const initialState = {
    orders: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return { ...state, orders: action.payload };
        default:
            return state;
    }
}
