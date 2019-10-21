import React, { Component } from "react";
import Ink from "react-ink";
import { connect } from "react-redux";

import { applyCoupon } from "../../../../services/coupon/actions";

class Coupon extends Component {
    state = {
        inputCoupon: "",
        couponFailed: true
    };
    // componentDidMount() {
    //     localStorage.removeItem("appliedCoupon");
    // }
    componentWillReceiveProps(newProps) {
        const { coupon } = this.props;
        //check if props changed after calling the server
        if (coupon !== newProps.coupon) {
            //if newProps.coupon is false then, coupon is invalid
            if (!newProps.coupon) {
                localStorage.removeItem("appliedCoupon");
                this.setState({ couponFailed: false });
            } else {
                // coupon is valid
                localStorage.setItem("appliedCoupon", newProps.coupon.code);
                this.setState({ couponFailed: true });
            }
        }
    }
    handleInput = event => {
        this.setState({ inputCoupon: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.applyCoupon(this.state.inputCoupon, this.props.restaurant_info.id);
    };

    // componentWillUnmount() {
    //     this.props.coupon.code = undefined;
    // }

    render() {
        const { coupon } = this.props;
        return (
            <React.Fragment>
                <div className="input-group mb-20">
                    <form className="coupon-form" onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="btn apply-coupon-btn">
                                    <i className="si si-tag" />
                                </button>
                            </div>
                            <input
                                type="text"
                                className="form-control apply-coupon-input"
                                placeholder={localStorage.getItem("cartApplyCoupon")}
                                onChange={this.handleInput}
                                style={{ color: localStorage.getItem("storeColor") }}
                                spellCheck="false"
                            />
                            <div className="input-group-append">
                                <button
                                    type="submit"
                                    className="btn apply-coupon-btn"
                                    onClick={this.handleSubmit}
                                >
                                    <i className="si si-arrow-right" />
                                    <Ink duration="500" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="coupon-status">
                        {coupon.code && (
                            <div className="coupon-success pt-10 pb-10">
                                Coupon Applied{" "}
                                {coupon.discount_type === "PERCENTAGE"
                                    ? coupon.discount + "%"
                                    : localStorage.getItem("currencyFormat") + coupon.discount}{" "}
                                OFF
                            </div>
                        )}
                        {/* Coupon is not applied, then coupon state is true */}
                        {!this.state.couponFailed && (
                            <div className="coupon-fail pt-10 pb-10">
                                {localStorage.getItem("cartInvalidCoupon")}
                            </div>
                        )}
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
    { applyCoupon }
)(Coupon);
