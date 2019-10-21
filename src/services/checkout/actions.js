import { PLACE_ORDER } from "./actionTypes";
import { PLACE_ORDER_URL } from "../../configs";

import Axios from "axios";
import { updateCart } from "../total/actions";

export const placeOrder = (
    user,
    order,
    coupon,
    location,
    order_comment,
    total,
    method,
    payment_token
) => (dispatch, getState) => {
    Axios.post(PLACE_ORDER_URL, {
        token: user.data.auth_token,
        user: user,
        order: order,
        coupon: coupon,
        location: location,
        order_comment: order_comment,
        total: total,
        method: method,
        payment_token: payment_token
    })
        .then(response => {
            const checkout = response.data;

            if (checkout.success) {
                dispatch({ type: PLACE_ORDER, payload: checkout });

                const state = getState();
                // console.log(state);
                const cartProducts = state.cart.products;
                // const user = state.user.user;
                localStorage.removeItem("orderComment");

                for (let i = cartProducts.length - 1; i >= 0; i--) {
                    // remove all items from cart
                    cartProducts.splice(i, 1);
                }

                dispatch(updateCart(cartProducts));
            }
        })
        .catch(function(error) {
            console.log(error);
        });
};
