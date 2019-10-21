import React, { Component } from "react";
import { Redirect } from "react-router";
// import Ink from "react-ink";
import { connect } from "react-redux";

import BackWithSearch from "../../Mobile/Elements/BackWithSearch";
import PaymentList from "./PaymentList";
// import DelayLink from "../../helpers/delayLink";
import { checkConfirmCart } from "../../../services/confirmCart/actions";
import { placeOrder } from "../../../services/checkout/actions";
import Meta from "../../helpers/meta";

class Checkout extends Component {
    __placeOrder = () => {
        const { user, cartProducts, coupon, cartTotal } = this.props;
        if (user.success) {
            this.props.placeOrder(
                user,
                cartProducts,
                coupon,
                localStorage.getItem("currentLocation"),
                cartTotal
            );
        }
    };

    render() {
        if (window.innerWidth > 768) {
            return <Redirect to="/" />;
        }
        //TODO:
        //check if the referrer is cart page, if not then redirect to cart
        if (!this.props.confirmCart) {
            return <Redirect to={"/cart"} />;
        }
        if (localStorage.getItem("storeColor") === null) {
            return <Redirect to={"/"} />;
        }
        return (
            <React.Fragment>
                <Meta
                    seotitle={localStorage.getItem("checkoutPageTitle")}
                    seodescription={localStorage.getItem("seoMetaDescription")}
                    ogtype="website"
                    ogtitle={localStorage.getItem("seoOgTitle")}
                    ogdescription={localStorage.getItem("seoOgDescription")}
                    ogurl={window.location.href}
                    twittertitle={localStorage.getItem("seoTwitterTitle")}
                    twitterdescription={localStorage.getItem("seoTwitterDescription")}
                />
                <BackWithSearch
                    boxshadow={true}
                    has_title={true}
                    title={localStorage.getItem("checkoutPageTitle")}
                    disbale_search={true}
                />
                <div className="pt-50">
                    <h4 className="pt-20 px-15 text-uppercase text-muted">
                        {localStorage.getItem("checkoutPaymentListTitle")}
                    </h4>
                    <PaymentList />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    total: state.total.total,
    user: state.user.user,
    cartProducts: state.cart.products,
    cartTotal: state.total.data,
    coupon: state.coupon.coupon,
    confirmCart: state.confirmCart.confirmCart
});
export default connect(
    mapStateToProps,
    { checkConfirmCart, placeOrder }
)(Checkout);
