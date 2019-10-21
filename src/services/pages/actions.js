import { GET_PAGES } from "./actionTypes";
import { GET_PAGES_URL } from "../../configs";
import Axios from "axios";

export const getPages = () => dispatch => {
    Axios.post(GET_PAGES_URL)
        .then(response => {
            const pages = response.data;
            return dispatch({
                type: GET_PAGES,
                payload: pages
            });
        })
        .catch(function(error) {
            console.log(error);
        });
};
