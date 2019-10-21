import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import PaypalExpressBtn from "react-paypal-express-checkout";

import ContentLoader from "react-content-loader";
import { placeOrder } from "../../../../services/checkout/actions";
import { connect } from "react-redux";
import { getPaymentGateways } from "../../../../services/paymentgateways/actions";
import { formatPrice } from "../../../helpers/formatPrice";

class PaymentList extends Component {
    static contextTypes = {
        router: () => null
    };
    state = {
        loading: true,
        stripe_opened: false
    };
    componentDidMount() {
        this.props.getPaymentGateways(this.props.user.data.auth_token);
    }

    componentWillReceiveProps(nextProps) {
        const { paymentgateways } = this.props;
        if (paymentgateways !== nextProps.paymentgateways) {
            this.setState({ loading: false });
        }
        if (nextProps.checkout !== this.props.checkout) {
            //redirect to running order page
            this.context.router.history.push("/running-order");
        }
    }

    /* Stripe */
    onOpened = () => {
        this.setState({ stripe_opened: true });
    };
    onToken = payment_token => {
        const method = "STRIPE";
        this.__placeOrder(payment_token, method);
    };
    /* END Stripe */

    /* Paypal */
    onSuccess = payment => {
        const payment_token = "";
        const method = "PAYPAL";
        this.__placeOrder(payment_token, method);
    };

    onCancel = data => {};

    onError = err => {
        console.log("Error!");
    };
    /* END Paypal */

    __placeOrder = (payment_token, method) => {
        const { user, cartProducts, coupon, cartTotal } = this.props;
        if (user.success) {
            this.props.placeOrder(
                user,
                cartProducts,
                coupon,
                localStorage.getItem("currentLocation"),
                localStorage.getItem("orderComment"),
                cartTotal,
                method,
                payment_token
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

            this.setState({ stripe_opened: false });
        }
    };

    // Calculating total with/without coupon/tax
    getTotalAfterCalculation = () => {
        const { coupon, restaurant_info } = this.props;
        const total = this.props.cartTotal.totalPrice;
        let calc = 0;
        if (coupon.code) {
            if (coupon.discount_type === "PERCENTAGE") {
                calc = formatPrice(
                    formatPrice(
                        parseFloat(
                            total +
                                parseFloat(restaurant_info.restaurant_charges || 0.0) +
                                parseFloat(restaurant_info.delivery_charges || 0.0)
                        )
                    ) -
                        formatPrice(
                            (coupon.discount / 100) *
                                parseFloat(
                                    total +
                                        parseFloat(restaurant_info.restaurant_charges || 0.0) +
                                        parseFloat(restaurant_info.delivery_charges || 0.0)
                                )
                        )
                );
            } else {
                calc = formatPrice(
                    parseFloat(total) +
                        (parseFloat(restaurant_info.restaurant_charges) || 0.0) +
                        (parseFloat(restaurant_info.delivery_charges) || 0.0) -
                        (parseFloat(coupon.discount) || 0.0)
                );
            }
        } else {
            calc = formatPrice(
                parseFloat(
                    total +
                        parseFloat(restaurant_info.restaurant_charges || 0.0) +
                        parseFloat(restaurant_info.delivery_charges || 0.0)
                )
            );
        }
        if (localStorage.getItem("taxApplicable") === "true") {
            calc = formatPrice(
                parseFloat(
                    parseFloat(calc) +
                        parseFloat(parseFloat(localStorage.getItem("taxPercentage")) / 100) * calc
                )
            );
            return calc;
        } else {
            return calc;
        }
    };

    render() {
        const client = {
            sandbox: localStorage.getItem("paypalSandboxKey"),
            production: localStorage.getItem("paypalProductionKey")
        };

        return (
            <React.Fragment>
                {this.state.stripe_opened && (
                    <div className="auth-error">
                        <div className="error-shake">
                            {localStorage.getItem("checkoutPaymentInProcess")}
                        </div>
                    </div>
                )}
                <div className="col-12">
                    {this.state.loading ? (
                        <div className="row">
                            <div className="col-12">
                                <div className="block block-link-shadow text-right shadow-light">
                                    <div className="block-content block-content-full clearfix">
                                        <ContentLoader
                                            height={70}
                                            width={window.innerWidth}
                                            speed={1.2}
                                            primaryColor="#f3f3f3"
                                            secondaryColor="#ecebeb"
                                        >
                                            <rect
                                                x="0"
                                                y="10"
                                                rx="0"
                                                ry="0"
                                                width="55"
                                                height="55"
                                            />
                                            <rect
                                                x="320"
                                                y="10"
                                                rx="0"
                                                ry="0"
                                                width="85"
                                                height="20"
                                            />
                                            <rect
                                                x="250"
                                                y="40"
                                                rx="0"
                                                ry="0"
                                                width="190"
                                                height="18"
                                            />
                                        </ContentLoader>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="block block-link-shadow text-right shadow-light">
                                    <div className="block-content block-content-full clearfix">
                                        <ContentLoader
                                            height={70}
                                            width={window.innerWidth}
                                            speed={1.2}
                                            primaryColor="#f3f3f3"
                                            secondaryColor="#ecebeb"
                                        >
                                            <rect
                                                x="0"
                                                y="10"
                                                rx="0"
                                                ry="0"
                                                width="55"
                                                height="55"
                                            />
                                            <rect
                                                x="320"
                                                y="10"
                                                rx="0"
                                                ry="0"
                                                width="85"
                                                height="20"
                                            />
                                            <rect
                                                x="250"
                                                y="40"
                                                rx="0"
                                                ry="0"
                                                width="190"
                                                height="18"
                                            />
                                        </ContentLoader>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            {this.props.paymentgateways.map(gateway => (
                                <React.Fragment key={gateway.id}>
                                    <div className="col-12">
                                        {gateway.name === "Stripe" && (
                                            <StripeCheckout
                                                stripeKey={localStorage.getItem("stripePublicKey")}
                                                ComponentClass="div"
                                                image={`${window.location.origin.toString()}/assets/img/logos/${localStorage.getItem(
                                                    "storeLogo"
                                                )}`}
                                                locale="auto"
                                                name={localStorage.getItem("storeName")}
                                                email={this.props.user.data.email}
                                                token={this.onToken}
                                                opened={this.onOpened}
                                            >
                                                <div className="col-12 p-0">
                                                    <div className="block block-link-shadow text-right shadow-light">
                                                        <div className="block-content block-content-full clearfix">
                                                            <div className="float-left mt-10">
                                                                <i className="si si-credit-card fa-3x text-body-bg-dark" />
                                                            </div>
                                                            <div className="font-size-h3 font-w600">
                                                                {localStorage.getItem(
                                                                    "checkoutStripeText"
                                                                )}
                                                                <div className="font-size-sm font-w600 text-uppercase text-muted">
                                                                    {localStorage.getItem(
                                                                        "checkoutStripeSubText"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </StripeCheckout>
                                        )}
                                    </div>
                                    {gateway.name === "COD" && (
                                        <div
                                            className="col-12"
                                            onClick={() => this.__placeOrder("", "COD")}
                                        >
                                            <div className="block block-link-shadow text-right shadow-light">
                                                <div className="block-content block-content-full clearfix">
                                                    <div className="float-left mt-10">
                                                        <i className="si si-wallet fa-3x text-body-bg-dark" />
                                                    </div>
                                                    <div className="font-size-h3 font-w600">
                                                        {localStorage.getItem("checkoutCodText")}
                                                    </div>
                                                    <div className="font-size-sm font-w600 text-uppercase text-muted">
                                                        {localStorage.getItem("checkoutCodSubText")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {gateway.name === "Paypal" && (
                                        <div className="col-12">
                                            <PaypalExpressBtn
                                                env={localStorage.getItem("paypalEnv")}
                                                client={client}
                                                currency={localStorage.getItem("currencyId")}
                                                total={parseFloat(this.getTotalAfterCalculation())}
                                                shipping={1}
                                                onError={this.onError}
                                                onSuccess={this.onSuccess}
                                                onCancel={this.onCancel}
                                                style={{
                                                    size: "responsive",
                                                    color: "silver",
                                                    shape: "rect"
                                                }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
                <div className="progress push m-0 progress-transparent" style={{ height: "8px" }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated hidden"
                        role="progressbar"
                        id="progressBar"
                        style={{
                            backgroundColor: localStorage.getItem("storeColor"),
                            width: "10%"
                        }}
                    />
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
    checkout: state.checkout.checkout,
    paymentgateways: state.paymentgateways.paymentgateways,
    restaurant_info: state.items.restaurant_info
});
export default connect(
    mapStateToProps,
    { getPaymentGateways, placeOrder }
)(PaymentList);
