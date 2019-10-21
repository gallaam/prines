import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, UPDATE_USER_INFO } from "./actionTypes";

const initialState = {
    user: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, user: action.payload };
        case REGISTER_USER:
            return { ...state, user: action.payload };
        case LOGOUT_USER:
            return { ...state, user: action.payload };
        case UPDATE_USER_INFO:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}
