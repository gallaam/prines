import {
    GET_RESTAURANT_INFO,
    GET_RESTAURANT_INFO_BY_ID,
    GET_RESTAURANT_ITEMS,
    RESET_ITEMS,
    RESET_INFO
} from "./actionTypes";
import {
    GET_RESTAURANT_INFO_URL,
    GET_RESTAURANT_INFO_BY_ID_URL,
    GET_RESTAURANT_ITEMS_URL
} from "../../configs";
import Axios from "axios";

export const getRestaurantInfo = slug => dispatch => {
    Axios.post(GET_RESTAURANT_INFO_URL + "/" + slug)
        .then(response => {
            const restaurant_info = response.data;
            return dispatch({ type: GET_RESTAURANT_INFO, payload: restaurant_info });
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const getRestaurantInfoById = id => dispatch => {
    Axios.post(GET_RESTAURANT_INFO_BY_ID_URL + "/" + id)
        .then(response => {
            const restaurant_info = response.data;
            return dispatch({
                type: GET_RESTAURANT_INFO_BY_ID,
                payload: restaurant_info
            });
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const getRestaurantItems = slug => dispatch => {
    Axios.post(GET_RESTAURANT_ITEMS_URL + "/" + slug)
        .then(response => {
            const restaurant_items = response.data;
            return dispatch({ type: GET_RESTAURANT_ITEMS, payload: restaurant_items });
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const resetItems = () => dispatch => {
    const empty = [];
    return dispatch({ type: RESET_ITEMS, payload: empty });
};

export const resetInfo = () => dispatch => {
    const empty = [];
    return dispatch({ type: RESET_INFO, payload: empty });
};
