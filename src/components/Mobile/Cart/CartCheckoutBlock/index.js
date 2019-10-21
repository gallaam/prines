import React, { Component } from "react";
import Ink from "react-ink";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DelayLink from "../../../helpers/delayLink";
import { placeOrder } from "../../../../services/checkout/actions";

import { checkConfirmCart } from "../../../../services/confirmCart/actions";

class CartCheckoutBlock extends Component {
    static contextTypes = {
        router: () => null
    };

    __placeOrder = () => {
        if (!this.refs.placeOrderButton.hasAttribute("disabled")) {
            this.refs.placeOrderButton.setAttribute("disabled", "disabled");
            const { user, cartProducts, coupon, cartTotal } = this.props;
            if (user.success) {
                this.props.placeOrder(
                    user,
                    cartProducts,
                    coupon,
                    localStorage.getItem("currentLocation"),
                    localStorage.getItem("orderComment"),
                    cartTotal
                );

                //show progress bar
                const progressBar = document.getElementById("progressBar");
                progressBar.classList.remove("hidden");
                let progress = 0;
                var foo = setInterval(function() {
                    if (progress > 100) {
                        clearInterval(foo);
                    }
                    progress = progress + 1;
                    progressBar.style.width = progress + "%";
                }, 20);
            }
        }
    };
    componentWillReceiveProps(nextProps) {
        // const { checkout} = this.props;
        if (nextProps.checkout !== this.props.checkout) {
            //redirect to running order page
            this.context.router.history.push("/running-order");
        }
    }
    render() {
        const { user } = this.props;
        return (
            <React.Fragment>
                <div className="bg-white cart-checkout-block">
                    {user.success ? (
                        user.data.default_address == null ? (
                            <div className="p-15">
                                <h2 className="almost-there-text m-0 pb-5">
                                    {localStorage.getItem("cartSetYourAddress")}
                                </h2>
                                <DelayLink
                                    to="/my-addresses"
                                    delay={200}
                                    className="btn btn-lg btn-continue"
                                    style={{
                                        position: "relative",
                                        backgroundColor: localStorage.getItem("storeColor")
                                    }}
                                >
                                    {localStorage.getItem("buttonNewAddress")}
                                    <Ink duration={500} />
                                </DelayLink>
                            </div>
                        ) : (
                            <React.Fragment>
                                <div className="px-15 py-10">
                                    <DelayLink
                                        to={"/my-addresses"}
                                        delay={400}
                                        className="change-address-text m-0 p-5 pull-right"
                                        style={{ color: localStorage.getItem("storeColor") }}
                                    >
                                        {localStorage.getItem("cartChangeLocation")}
                                        <Ink duration={400} />
                                    </DelayLink>
                                    <h2 className="deliver-to-text m-0 p-5">
                                        {localStorage.getItem("cartDeliverTo")}
                                    </h2>
                                    <p className="user-address truncate-text m-0 pt-10">
                                        {user.data.default_address.house}
                                        {", "}
                                        {user.data.default_address.address}
                                        {", "}
                                        {user.data.default_address.landmark}
                                    </p>
                                </div>
                                <div style={{ marginTop: "1.6rem" }}>
                                    <Link
                                        onClick={() => this.props.checkConfirmCart()}
                                        to={"/checkout"}
                                        className="btn btn-lg btn-make-payment"
                                        style={{
                                            backgroundColor: localStorage.getItem("cartColorBg"),
                                            color: localStorage.getItem("cartColorText"),
                                            position: "relative"
                                        }}
                                    >
                                        {localStorage.getItem("checkoutSelectPayment")}
                                        <Ink duration={400} />
                                    </Link>
                                </div>
                            </React.Fragment>
                        )
                    ) : (
                        <div className="p-15">
                            <h2 className="almost-there-text m-0 pb-5">
                                {localStorage.getItem("cartLoginHeader")}
                            </h2>
                            <span className="almost-there-sub text-muted">
                                {localStorage.getItem("cartLoginSubHeader")}
                            </span>
                            <DelayLink
                                to="/login"
                                delay={200}
                                className="btn btn-lg btn-continue"
                                style={{
                                    backgroundColor: localStorage.getItem("storeColor"),
                                    position: "relative"
                                }}
                            >
                                {localStorage.getItem("cartLoginButtonText")}
                                <Ink duration={500} />
                            </DelayLink>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    addresses: state.addresses.addresses,
    cartProducts: state.cart.products,
    cartTotal: state.total.data,
    coupon: state.coupon.coupon,
    checkout: state.checkout.checkout
});

export default connect(
    mapStateToProps,
    { placeOrder, checkConfirmCart }
)(CartCheckoutBlock);
