import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Jello from "react-reveal/Jello";

class Footer extends Component {
    state = {
        active_nearme: false,
        active_explore: false,
        active_cart: false,
        active_account: false
    };

    componentDidMount() {
        if (this.props.active_nearme === true) {
            this.setState({ active_nearme: true });
        }
        if (this.props.active_explore === true) {
            this.setState({ active_explore: true });
        }
        if (this.props.active_cart === true) {
            this.setState({ active_cart: true });
        }
        if (this.props.active_account === true) {
            this.setState({ active_account: true });
        }
    }

    render() {
        const { cartTotal } = this.props;
        return (
            <React.Fragment>
                <p>{this.state.active}</p>
                <div className="content pt-10 py-5 font-size-xs clearfix footer-fixed">
                    <NavLink to="/" className="col-3 footer-links">
                        <i className="si si-pointer fa-2x" /> <br />
                        <span className={this.state.active_nearme ? "active-footer-tab" : ""}>
                            {this.state.active_nearme ? (
                                <Jello>{localStorage.getItem("footerNearme")}</Jello>
                            ) : (
                                <span> {localStorage.getItem("footerNearme")}</span>
                            )}
                        </span>
                    </NavLink>

                    <NavLink to="/explore" className="col-3 footer-links">
                        <i className="si si-magnifier fa-2x" /> <br />
                        <span className={this.state.active_explore ? "active-footer-tab" : ""}>
                            {this.state.active_explore ? (
                                <Jello>{localStorage.getItem("footerExplore")}</Jello>
                            ) : (
                                <span> {localStorage.getItem("footerExplore")}</span>
                            )}
                        </span>
                    </NavLink>
                    <NavLink to="/cart" className="col-3 footer-links">
                        <i className="si si-bag fa-2x" /> <br />
                        <span className={this.state.active_cart ? "active-footer-tab" : ""}>
                            {this.state.active_cart ? (
                                <Jello>{localStorage.getItem("footerCart")}</Jello>
                            ) : (
                                <span> {localStorage.getItem("footerCart")}</span>
                            )}
                            <span
                                className="cart-quantity-badge"
                                style={{ backgroundColor: localStorage.getItem("storeColor") }}
                            >
                                {cartTotal.productQuantity}
                            </span>
                        </span>
                    </NavLink>
                    <NavLink to="/my-account" className="col-3 footer-links">
                        <i className="si si-user fa-2x" /> <br />
                        <span className={this.state.active_account ? "active-footer-tab" : ""}>
                            {this.state.active_account ? (
                                <Jello>{localStorage.getItem("footerAccount")}</Jello>
                            ) : (
                                <span> {localStorage.getItem("footerAccount")}</span>
                            )}
                        </span>
                    </NavLink>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cartTotal: state.total.data
});

export default connect(
    mapStateToProps,
    {}
)(Footer);
