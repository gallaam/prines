import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import {
    Redirect
} from "react-router";
import Loadable from "react-loadable";
import Loading from "./components/helpers/loading";
import withTracker from "./withTracker";

import Root from "./Root";

import App from "./components/App";
// const App = Loadable({
//     loader: () => import("./components/App"),
//     loading: () => <Loading />
// });

import Home from "./components/Mobile/Home";
// const Home = Loadable({
//     loader: () => import("./components/Mobile/Home"),
//     loading: () => <Loading />
// });

// import NotFound from "./components/NotFound";
const NotFound = Loadable({
    loader: () =>
        import ("./components/NotFound"),
    loading: () => < Loading / >
});

// import Location from "./components/Mobile/Location";
const Location = Loadable({
    loader: () =>
        import ("./components/Mobile/Location"),
    loading: () => < Loading / >
});

// import Items from "./components/Mobile/Items";
const Items = Loadable({
    loader: () =>
        import ("./components/Mobile/Items"),
    loading: () => < Loading / >
});

// import Login from "./components/Mobile/Auth/Login";
const Login = Loadable({
    loader: () =>
        import ("./components/Mobile/Auth/Login"),
    loading: () => < Loading / >
});

// import Register from "./components/Mobile/Auth/Register";
const Register = Loadable({
    loader: () =>
        import ("./components/Mobile/Auth/Register"),
    loading: () => < Loading / >
});

// import CartPage from "./components/Mobile/Cart";
const CartPage = Loadable({
    loader: () =>
        import ("./components/Mobile/Cart"),
    loading: () => < Loading / >
});

// import Account from "./components/Mobile/Account";
const Account = Loadable({
    loader: () =>
        import ("./components/Mobile/Account"),
    loading: () => < Loading / >
});

// import Explore from "./components/Mobile/Explore";
const Explore = Loadable({
    loader: () =>
        import ("./components/Mobile/Explore"),
    loading: () => < Loading / >
});

// import Addresses from "./components/Mobile/Account/Addresses";
const Addresses = Loadable({
    loader: () =>
        import ("./components/Mobile/Account/Addresses"),
    loading: () => < Loading / >
});

// import Checkout from "./components/Mobile/Checkout";
const Checkout = Loadable({
    loader: () =>
        import ("./components/Mobile/Checkout"),
    loading: () => < Loading / >
});

// import RunningOrder from "./components/Mobile/RunningOrder";
const RunningOrder = Loadable({
    loader: () =>
        import ("./components/Mobile/RunningOrder"),
    loading: () => < Loading / >
});

// import Orders from "./components/Mobile/Account/Orders";
const Orders = Loadable({
    loader: () =>
        import ("./components/Mobile/Account/Orders"),
    loading: () => < Loading / >
});

/* Delivery */
// import Delivery from "./components/Delivery";
const Delivery = Loadable({
    loader: () =>
        import ("./components/Delivery"),
    loading: () => < Loading / >
});

// import DeliveryLogin from "./components/Delivery/Login";
const DeliveryLogin = Loadable({
    loader: () =>
        import ("./components/Delivery/Login"),
    loading: () => < Loading / >
});

// import DeliveryOrders from "./components/Delivery/Orders";
const DeliveryOrders = Loadable({
    loader: () =>
        import ("./components/Delivery/Orders"),
    loading: () => < Loading / >
});

// import ViewOrder from "./components/Delivery/ViewOrder";
const ViewOrder = Loadable({
    loader: () =>
        import ("./components/Delivery/ViewOrder"),
    loading: () => < Loading / >
});

const ScrollToTop = () => {
    window.scrollTo(0, 0);
    return null;
};

ReactDOM.render( 
	<Root>
        <BrowserRouter>
        	<React.Fragment>
        		<Route component = { ScrollToTop } />
        			<Switch>
        				<Route exact strict path = "/:url*" render = { props => <Redirect to = { `${props.location.pathname}/` } />} />
        				<Route path = { "/" } exact component = { withTracker(App) } /> 
        				<Route path = { "/search-location" } exact component = { withTracker(Location) } />
        				<Route path = { "/:location/restaurants" } exact component = { withTracker(Home) } />

        				<Route path = { "/:location/restaurants/:restaurant" } exact component = { withTracker(Items) } />
        				<Route path = { "/explore" } exact component = { withTracker(Explore) } />
        				<Route path = { "/login" } exact component = { withTracker(Login) } />
        				<Route path = { "/register" } exact component = { withTracker(Register) } />
        				<Route path = { "/my-account" } exact component = { withTracker(Account) } />
        				<Route path = { "/my-addresses" } exact component = { withTracker(Addresses) } />
        				<Route path = { "/checkout" } exact component = { withTracker(Checkout) } />
        				<Route path = { "/running-order" } exact component = { withTracker(RunningOrder) } />
        				<Route path = { "/my-orders" } exact component = { withTracker(Orders) } />
        				<Route path = { "/cart" } exact component = { withTracker(CartPage) } />
        				{ /* Delivery Routes */ }
        				<Route path = { "/delivery" } exact component = { Delivery } />
        				<Route path = { "/delivery/login" } exact component = { DeliveryLogin } />
        				<Route path = { "/delivery/orders" } exact component = { DeliveryOrders } />
        				<Route path = { "/delivery/orders/:unique_order_id"} exact component = { ViewOrder } />
        				<Route path = { "/delivery/completed-orders"} exact component = { Delivery } />
        				{ /* Common Routes */ }
        				<Route component = { NotFound } />
        			</Switch>
        	</React.Fragment>
        </BrowserRouter>
    </Root>,
    document.getElementById("root")
);