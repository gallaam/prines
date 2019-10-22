import React from "react";
import {
    Provider
} from "react-redux";

import store from "./services/store";
import * as serviceWorker from "./serviceWorker";

const Root = ({
    children,
    initialState = {}
}) => ( <Provider store = {
        store(initialState)
    } ><div> {
        children
    } </div>< /Provider>
);
serviceWorker.register();
// serviceWorker.unregister();

export default Root;