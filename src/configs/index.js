import {
    WEBSITE_URL
} from "./website";

export const GET_SETTINGS_URL = WEBSITE_URL + "/public/api/get-settings";
export const SEARCH_LOCATIONS_URL = WEBSITE_URL + "/public/api/search-location";
export const GET_POPULAR_LOCATIONS_URL = WEBSITE_URL + "/public/api/popular-locations";
export const GET_PROMO_SLIDER_URL = WEBSITE_URL + "/public/api/promo-slider";
export const GET_RESTAURANTS_URL = WEBSITE_URL + "/public/api/get-restaurants";
export const GET_RESTAURANT_INFO_URL = WEBSITE_URL + "/public/api/get-restaurant-info";
export const GET_RESTAURANT_INFO_BY_ID_URL = WEBSITE_URL + "/public/api/get-restaurant-info-by-id";
export const GET_RESTAURANT_ITEMS_URL = WEBSITE_URL + "/public/api/get-restaurant-items";
export const APPLY_COUPON_URL = WEBSITE_URL + "/public/api/apply-coupon";
export const LOGIN_USER_URL = WEBSITE_URL + "/public/api/login";
export const REGISTER_USER_URL = WEBSITE_URL + "/public/api/register";
export const GET_PAGES_URL = WEBSITE_URL + "/public/api/get-pages";
export const SEARCH_RESTAURANTS_URL = WEBSITE_URL + "/public/api/search-restaurants";
export const GET_ADDRESSES_URL = WEBSITE_URL + "/public/api/get-addresses";
export const SAVE_ADDRESS_URL = WEBSITE_URL + "/public/api/save-address";
export const DELETE_ADDRESS_URL = WEBSITE_URL + "/public/api/delete-address";
export const UPDATE_USER_INFO_URL = WEBSITE_URL + "/public/api/update-user-info";
export const PLACE_ORDER_URL = WEBSITE_URL + "/public/api/place-order";
export const SET_DEFAULT_URL = WEBSITE_URL + "/public/api/set-default-address";
export const GET_ORDERS_URL = WEBSITE_URL + "/public/api/get-orders";
export const GET_PAYMENT_GATEWAYS_URL = WEBSITE_URL + "/public/api/get-payment-gateways";
export const NOTIFICATION_TOKEN_URL = WEBSITE_URL + "/public/api/save-notification-token";
/* Delivery URLs */
export const LOGIN_DELIVERY_USER_URL = WEBSITE_URL + "/public/api/delivery/login";
export const UPDATE_DELIVERY_USER_INFO_URL = WEBSITE_URL + "/public/api/delivery/update-user-info";
export const GET_DELIVERY_ORDERS_URL = WEBSITE_URL + "/public/api/delivery/get-delivery-orders";
export const GET_SINGLE_DELIVERY_ORDER_URL =
    WEBSITE_URL + "/public/api/delivery/get-single-delivery-order";
export const SEND_DELIVERY_GUY_GPS_LOCATION_URL =
    WEBSITE_URL + "/public/api/delivery/set-delivery-guy-gps-location";
export const GET_DELIVERY_GUY_GPS_LOCATION_URL =
    WEBSITE_URL + "/public/api/delivery/get-delivery-guy-gps-location";
export const ACCEPT_TO_DELIVER_URL = WEBSITE_URL + "/public/api/delivery/accept-to-deliver";
export const PICKEDUP_ORDER_URL = WEBSITE_URL + "/public/api/delivery/pickedup-order";
export const DELIVER_ORDER_URL = WEBSITE_URL + "/public/api/delivery/deliver-order";