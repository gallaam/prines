import { SEARCH_RESTAURANTS } from "./actionTypes";

const initialState = {
    restaurants: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESTAURANTS:
            return { ...state, restaurants: action.payload };
        default:
            return state;
    }
}
