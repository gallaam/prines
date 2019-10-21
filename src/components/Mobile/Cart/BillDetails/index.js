import React, { Component } from "react";
import { connect } from "react-redux";

import { formatPrice } from "../../../helpers/formatPrice";

class BillDetails extends Component {
    // Calculating total with/without coupon/tax
    getTotalAfterCalculation = () => {
        const { total, restaurant_info, coupon } = this.props;
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
        const { total, restaurant_info, coupon } = this.props;
        return (
            <React.Fragment>
                <div className="bg-white bill-details mb-200">
                    <div className="p-15">
                        <h2 className="bill-detail-text m-0">
                            {localStorage.getItem("cartBillDetailsText")}
                        </h2>
                        <div className="display-flex">
                            <div className="flex-auto">
                                {localStorage.getItem("cartItemTotalText")}
                            </div>
                            <div className="flex-auto text-right">
                                {localStorage.getItem("currencyFormat")} {formatPrice(total)}
                            </div>
                        </div>
                        {restaurant_info.restaurant_charges === "0.00" ||
                        restaurant_info.restaurant_charges === null ? null : (
                            <div className="display-flex">
                                <div className="flex-auto">
                                    {localStorage.getItem("cartRestaurantCharges")}
                                </div>
                                <div className="flex-auto text-right">
                                    {localStorage.getItem("currencyFormat")}{" "}
                                    {restaurant_info.restaurant_charges}
                                </div>
                            </div>
                        )}
                        <hr />
                        {restaurant_info.delivery_charges === "0.00" ||
                        restaurant_info.delivery_charges === null ? null : (
                            <React.Fragment>
                                <div className="display-flex">
                                    <div className="flex-auto">
                                        {localStorage.getItem("cartDeliveryCharges")}
                                    </div>
                                    <div className="flex-auto text-right">
                                        {localStorage.getItem("currencyFormat")}{" "}
                                        {restaurant_info.delivery_charges}
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        )}
                        {coupon.code && (
                            <React.Fragment>
                                <div className="display-flex">
                                    <div className="flex-auto coupon-text">
                                        {localStorage.getItem("cartCouponText")}
                                    </div>
                                    <div className="flex-auto text-right coupon-text">
                                        <span>-</span>
                                        {coupon.discount_type === "PERCENTAGE"
                                            ? coupon.discount + "%"
                                            : localStorage.getItem("currencyFormat") +
                                              coupon.discount}
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        )}
                        {localStorage.getItem("taxApplicable") === "true" && (
                            <React.Fragment>
                                <div className="display-flex">
                                    <div className="flex-auto text-danger">Tax</div>
                                    <div className="flex-auto text-right text-danger">
                                        <span>+</span>
                                        {localStorage.getItem("taxPercentage")}%
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        )}
                        <div className="display-flex">
                            <div className="flex-auto font-w700">
                                {localStorage.getItem("cartToPayText")}
                            </div>
                            <div className="flex-auto text-right font-w700">
                                {localStorage.getItem("currencyFormat")}{" "}
                                {/* Calculating total after discount coupon or without discount coupon */}
                                {this.getTotalAfterCalculation()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    coupon: state.coupon.coupon,
    restaurant_info: state.items.restaurant_info
});

export default connect(
    mapStateToProps,
    {}
)(BillDetails);
