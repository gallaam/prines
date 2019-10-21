import { GET_PAGES } from "./actionTypes";

const initialState = {
    pages: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PAGES:
            return { ...state, pages: action.payload };
        default:
            return state;
    }
}
