import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { updateUserInfo } from "../../../services/user/actions";
import BackWithSearch from "../../Mobile/Elements/BackWithSearch";
import Map from "./Map";
import Meta from "../../helpers/meta";

class RunningOrder extends Component {
    state = {
        updatedUserInfo: false
    };
    static contextTypes = {
        router: () => null
    };

    __refreshOrderStatus = () => {
        const { user } = this.props;
        if (user.success) {
            this.refs.refreshButton.setAttribute("disabled", "disabled");
            this.props.updateUserInfo(user.data.id, user.data.auth_token);
            this.setState({ updatedUserInfo: true });
            this.refs.btnSpinner.classList.remove("hidden");
            setTimeout(() => {
                if (this.refs.refreshButton) {
                    this.refs.btnSpinner.classList.add("hidden");
                }
            }, 5 * 1000);
            setTimeout(() => {
                if (this.refs.refreshButton) {
                    if (this.refs.refreshButton.hasAttribute("disabled")) {
                        this.refs.refreshButton.removeAttribute("disabled");
                    }
                }
            }, 5 * 1000);
        }
    };

    componentDidMount() {
        const { user } = this.props;

        if (user.success) {
            if (user.running_order === null) {
                this.props.updateUserInfo(user.data.id, user.data.auth_token);
            }
        }

        this.refreshSetInterval = setInterval(() => {
            this.__refreshOrderStatus();
        }, 10 * 1000);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.running_order === null) {
            this.context.router.history.push("/");
        }
    }

    componentWillUnmount() {
        clearInterval(this.refreshSetInterval);
    }

    render() {
        if (window.innerWidth > 768) {
            return <Redirect to="/" />;
        }
        if (localStorage.getItem("storeColor") === null) {
            return <Redirect to={"/"} />;
        }
        const { user } = this.props;
        if (!user.success) {
            return <Redirect to={"/"} />;
        }

        return (
            <React.Fragment>
                <Meta
                    seotitle={localStorage.getItem("seoMetaTitle")}
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
                    title={user.running_order && user.running_order.unique_order_id}
                    disbale_search={true}
                    back_to_home={true}
                />
                {user.running_order && (
                    <React.Fragment>
                        <div className="bg-white height-100 pt-50">
                            <div>
                                {localStorage.getItem("showMap") === "true" && (
                                    <Map
                                        restaurant_latitude={user.running_order.restaurant.latitude}
                                        restaurant_longitude={
                                            user.running_order.restaurant.longitude
                                        }
                                        order_id={user.running_order.id}
                                        orderstatus_id={user.running_order.orderstatus_id}
                                    />
                                )}
                                <div className="mt-15 mb-200">
                                    {user.running_order.orderstatus_id === 1 && (
                                        <React.Fragment>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-placed.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderPlacedTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPlacedTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPlacedSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                        </React.Fragment>
                                    )}
                                    {user.running_order.orderstatus_id === 2 && (
                                        <React.Fragment>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-preparing.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderPreparingTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPreparingTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPreparingSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-placed.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderPlacedTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPlacedTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPlacedSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                        </React.Fragment>
                                    )}
                                    {user.running_order.orderstatus_id === 3 && (
                                        <React.Fragment>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-onway.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderDeliveryAssignedTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderDeliveryAssignedTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderDeliveryAssignedSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-preparing.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderPreparingTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPreparingTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPreparingSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-placed.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderPlacedTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPlacedTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPlacedSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                        </React.Fragment>
                                    )}
                                    {user.running_order.orderstatus_id === 4 && (
                                        <React.Fragment>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="font-size-h4 mb-5 pl-15">
                                                        {localStorage.getItem(
                                                            "runningOrderDeliveryPin"
                                                        )}{" "}
                                                        <span className="font-w600 btn-deliverypin">
                                                            {this.props.user.data.delivery_pin}
                                                        </span>
                                                    </div>
                                                    <hr />
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-onway.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderOnwayTitle"
                                                                    )}
                                                                    style={{
                                                                        transform: "scaleX(-1)"
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderOnwayTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderOnwaySub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-onway.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderDeliveryAssignedTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderDeliveryAssignedTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderDeliveryAssignedSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-preparing.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderPreparingTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPreparingTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPreparingSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="block block-link-shadow">
                                                        <div className="block-content block-content-full clearfix py-0">
                                                            <div className="float-right">
                                                                <img
                                                                    src="/assets/img/order-placed.gif"
                                                                    className="img-fluid img-avatar"
                                                                    alt={localStorage.getItem(
                                                                        "runningOrderPlacedTitle"
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className="float-left mt-20"
                                                                style={{ width: "75%" }}
                                                            >
                                                                <div className="font-w600 font-size-h4 mb-5">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPlacedTitle"
                                                                    )}
                                                                </div>
                                                                <div className="font-size-sm text-muted">
                                                                    {localStorage.getItem(
                                                                        "runningOrderPlacedSub"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                        </React.Fragment>
                                    )}
                                    {user.running_order.orderstatus_id === 6 && (
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="block block-link-shadow">
                                                    <div className="block-content block-content-full clearfix py-0">
                                                        <div className="float-right">
                                                            <img
                                                                src="/assets/img/order-canceled.png"
                                                                className="img-fluid img-avatar"
                                                                alt={localStorage.getItem(
                                                                    "runningOrderCanceledTitle"
                                                                )}
                                                                style={{ transform: "scaleX(-1)" }}
                                                            />
                                                        </div>
                                                        <div
                                                            className="float-left mt-20"
                                                            style={{ width: "75%" }}
                                                        >
                                                            <div className="font-w600 font-size-h4 mb-5">
                                                                {localStorage.getItem(
                                                                    "runningOrderCanceledTitle"
                                                                )}
                                                            </div>
                                                            <div className="font-size-sm text-muted">
                                                                {localStorage.getItem(
                                                                    "runningOrderCanceledSub"
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button
                                    className="btn btn-lg btn-refresh-status"
                                    ref="refreshButton"
                                    onClick={this.__refreshOrderStatus}
                                    style={{
                                        backgroundColor: localStorage.getItem("cartColorBg"),
                                        color: localStorage.getItem("cartColorText")
                                    }}
                                >
                                    {localStorage.getItem("runningOrderRefreshButton")}{" "}
                                    <span ref="btnSpinner" className="hidden">
                                        <i className="fa fa-refresh fa-spin" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(
    mapStateToProps,
    { updateUserInfo }
)(RunningOrder);
