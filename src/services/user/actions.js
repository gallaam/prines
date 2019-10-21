import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, UPDATE_USER_INFO } from "./actionTypes";
import { LOGIN_USER_URL, REGISTER_USER_URL, UPDATE_USER_INFO_URL } from "../../configs";

import Axios from "axios";

export const loginUser = (email, password) => dispatch => {
    Axios.post(LOGIN_USER_URL, {
        email: email,
        password: password
    })
        .then(response => {
            const user = response.data;
            return dispatch({ type: LOGIN_USER, payload: user });
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const registerUser = (name, email, phone, password) => dispatch => {
    Axios.post(REGISTER_USER_URL, {
        name: name,
        email: email,
        phone: phone,
        password: password
    })
        .then(response => {
            const user = response.data;
            return dispatch({ type: REGISTER_USER, payload: user });
        })
        .catch(function(error) {
            console.log(error);
        });
};

export const logoutUser = user => dispatch => {
    user = [];
    dispatch({
        type: LOGOUT_USER,
        payload: user
    });
};

export const updateUserInfo = (user_id, token) => dispatch => {
    Axios.post(UPDATE_USER_INFO_URL, {
        token: token,
        user_id: user_id
    })
        .then(response => {
            const user = response.data;
            return dispatch({ type: UPDATE_USER_INFO, payload: user });
        })
        .catch(function(error) {
            console.log(error);
        });
};
