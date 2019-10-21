import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export default initialState => {
    initialState = JSON.parse(window.localStorage.getItem("state")) || initialState;
    const middleware = [thunk];

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware)
            /* window.__REDUX_DEVTOOLS_EXTENSION__ &&
              window.__REDUX_DEVTOOLS_EXTENSION__() */
        )
    );

    store.subscribe(() => {
        const state = store.getState();
        //save the config to localstorage
       
        
        for (const setting in state.settings.settings) {
            if (state.settings.settings.hasOwnProperty(setting)) {
                const element = state.settings.settings[setting];
                
                window.localStorage.setItem(element.key, element.value);
            }
        }
        const persist = {
            cart: state.cart,
            total: state.total,
            items: state.items,
            pages: state.pages,
            user: state.user,
            addresses: state.addresses,
            delivery_user: state.delivery_user
        };
        window.localStorage.setItem("state", JSON.stringify(persist));

        // const user = {
        //     user: state.user
        // };
        // window.localStorage.setItem("user", JSON.stringify(user.user));
    });

    return store;
};
