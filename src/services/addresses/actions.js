import { GET_ADDRESSES, SAVE_ADDRESS, DELETE_ADDRESS, SET_DEFAULT } from "./actionTypes";
import {
    GET_ADDRESSES_URL,
    SAVE_ADDRESS_URL,
    DELETE_ADDRESS_URL,
    SET_DEFAULT_URL
} from "../../configs";

import Axios from "axios";

export const getAddresses = (id, token) => dispatch => {
    Axios.get(GET_ADDRESSES_URL + "/" + id + "?token=" + token)
        .then(response => {
            const addresses = response.data;
            return dispatch({
                type: GET_ADDRESSES,
                payload: addresses
            });
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const saveAddress = (user_id, token, address) => dispatch => {
    Axios.post(SAVE_ADDRESS_URL, {
        token: token,
        user_id: user_id,
        address: address
    })
        .then(response => {
            const addresses = response.data;
            return dispatch({
                type: SAVE_ADDRESS,
                payload: addresses
            });
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const deleteAddress = (user_id, address_id, token) => dispatch => {
    Axios.post(DELETE_ADDRESS_URL, {
        token: token,
        user_id: user_id,
        address_id: address_id
    })
        .then(response => {
            const addresses = response.data;
            return dispatch({
                type: DELETE_ADDRESS,
                payload: addresses
            });
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const setDefaultAddress = (user_id, address_id, token) => dispatch => {
    Axios.post(SET_DEFAULT_URL, {
        token: token,
        user_id: user_id,
        address_id: address_id
    })
        .then(response => {
            const addresses = response.data;
            return dispatch({
                type: SET_DEFAULT,
                payload: addresses
            });
        })
        .catch(function(error) {
            console.log(error);
        });
};
