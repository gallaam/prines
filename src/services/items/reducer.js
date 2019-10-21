import {
    GET_RESTAURANT_INFO,
    GET_RESTAURANT_ITEMS,
    RESET_INFO,
    RESET_ITEMS,
    GET_RESTAURANT_INFO_BY_ID
} from "./actionTypes";

const initialState = {
    restaurant_info: [],
    restaurant_items: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_RESTAURANT_INFO:
            return { ...state, restaurant_info: action.payload };
        case GET_RESTAURANT_INFO_BY_ID:
            return { ...state, restaurant_info: action.payload };
        case GET_RESTAURANT_ITEMS:
            return { ...state, restaurant_items: action.payload };
        case RESET_ITEMS:
            return { ...state, restaurant_items: action.payload };
        case RESET_INFO:
            return { ...state, restaurant_info: action.payload };
        default:
            return state;
    }
}
