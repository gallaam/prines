import { GET_ORDERS } from "./actionTypes";
import { GET_ORDERS_URL } from "../../configs";
import Axios from "axios";

export const getOrders = (token, user_id) => dispatch => {
    Axios.post(GET_ORDERS_URL, {
        token: token,
        user_id: user_id
    })
        .then(response => {
            const orders = response.data;
            return dispatch({ type: GET_ORDERS, payload: orders });
        })
        .catch(function(error) {
            console.log(error);
        });
};
