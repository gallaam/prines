import {
    LOGIN_DELIVERY_USER,
    LOGOUT_DELIVERY_USER,
    UPDATE_DELIVERY_USER_INFO
} from "./actionTypes";

const initialState = {
    delivery_user: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_DELIVERY_USER:
            return { ...state, delivery_user: action.payload };
        case LOGOUT_DELIVERY_USER:
            return { ...state, delivery_user: action.payload };
        case UPDATE_DELIVERY_USER_INFO:
            return { ...state, delivery_user: action.payload };
        default:
            return state;
    }
}
