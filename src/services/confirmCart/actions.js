import { CONFIRM_CART } from "./actionTypes";

export const checkConfirmCart = () => dispatch => {
    const confirmCart = true;
    return dispatch({ type: CONFIRM_CART, payload: confirmCart });
};
