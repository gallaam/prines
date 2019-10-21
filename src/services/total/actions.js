import { UPDATE_CART } from "./actionTypes";
import { formatPrice } from "../../components/helpers/formatPrice";

export const updateCart = cartProducts => dispatch => {
    let productQuantity = cartProducts.reduce((sum, p) => {
        // sum += p.quantity;
        sum++;
        return sum;
    }, 0);

    let totalPrice = cartProducts.reduce((sum, p) => {
        sum += p.price * p.quantity;
        sum = parseFloat(sum);
        formatPrice(sum);
        return sum;
    }, 0);

    let cartTotal = {
        productQuantity,
        totalPrice
    };

    dispatch({
        type: UPDATE_CART,
        payload: cartTotal
    });
};
