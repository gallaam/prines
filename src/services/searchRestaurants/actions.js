import { SEARCH_RESTAURANTS } from "./actionTypes";
import { SEARCH_RESTAURANTS_URL } from "../../configs";
import Axios from "axios";

export const searchRestaurants = (query, location) => dispatch => {
    Axios.post(SEARCH_RESTAURANTS_URL, {
        q: query,
        location: location
    })
        .then(response => {
            const restaurants = response.data;
            return dispatch({ type: SEARCH_RESTAURANTS, payload: restaurants });
        })
        .catch(function(error) {
            console.log(error);
        });
};
