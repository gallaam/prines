import React, {
    Component
} from "react";
import {
    Redirect
} from "react-router";
import Moment from "react-moment";
import BackWithSearch from "../../Mobile/Elements/BackWithSearch.js";
import {
    connect
} from "react-redux";
import ContentLoader from "react-content-loader";
import {
    getDeliveryOrders
} from "services/";
import DelayLink from "../../helpers/delayLink";
import Ink from "react-ink";
import Meta from "../../helpers/meta";
class Orders extends Component {
    state = {
        play: false
    };
    audio = new Audio("/assets/audio/notification1.mp3");

    componentDidMount() {
        if (this.props.delivery_user.success) {
            this.props.getDeliveryOrders(this.props.delivery_user.data.auth_token);
        }

        this.refreshSetInterval = setInterval(() => {
            this.__refreshOrders();
        }, 3 * 1000);
    }

    __refreshOrders = () => {
        if (this.props.delivery_user.success) {
            this.props.getDeliveryOrders(this.props.delivery_user.data.auth_token);
        }
    };

    componentWillReceiveProps(newProps) {
        const {
            delivery_orders
        } = this.props;
        if (delivery_orders.new_orders) {
            if (newProps.delivery_orders.new_orders.length > delivery_orders.new_orders.length) {
                //new orders recieved,
                this.audio.play();
                if ("vibrate" in navigator) {
                    navigator.vibrate(["100", "120", "100"]);
                }
            }
        }
    }
    componentWillUnmount() {
        clearInterval(this.refreshSetInterval);
    }
    render() {
        if (window.innerWidth > 768) {
            return <Redirect to = "/" / > ;
        }
        return ( <React.Fragment>
                        <Meta seotitle = "Delivery Orders" seodescription = { localStorage.getItem("seoMetaDescription") }
                            ogtype = "website"
                            ogtitle = {
                                localStorage.getItem("seoOgTitle")
                            }
                            ogdescription = {
                                localStorage.getItem("seoOgDescription")
                            }
                            ogurl = {
                                window.location.href
                            }
                            twittertitle = {
                                localStorage.getItem("seoTwitterTitle")
                            }
                            twitterdescription = {
                                localStorage.getItem("seoTwitterDescription")
                            }
                        /> 
                        <BackWithSearch boxshadow = { true }
                        has_title = {
                            true
                        }
                        title = {
                            `${localStorage.getItem("deliveryWelcomeMessage")} ${
                                    this.props.delivery_user.data.name
                                }`
                        }
                        disbale_search = {
                            true
                        }
                        /> 
                        <div className = "pt-15" > {!this.props.delivery_orders.accepted_orders ? ( <div className = "pt-50" >
                            < ContentLoader height = {
                                window.innerHeight / 2 - 100
                            }
                            width = {
                                window.innerWidth
                            }
                            speed = {
                                1.2
                            }
                            primaryColor = "#eee"
                            secondaryColor = "#fff" >
                            <
                            rect x = "15"
                            y = "30"
                            rx = "0"
                            ry = "0"
                            width = "150"
                            height = "30" / >
                            <
                            rect x = "283"
                            y = "30"
                            rx = "0"
                            ry = "0"
                            width = "75"
                            height = "30" / >
                            <
                            rect x = "15"
                            y = "70"
                            rx = "0"
                            ry = "0"
                            width = "250"
                            height = "23" / >

                            <
                            rect x = "15"
                            y = "173"
                            rx = "0"
                            ry = "0"
                            width = "150"
                            height = "30" / >
                            <
                            rect x = "283"
                            y = "173"
                            rx = "0"
                            ry = "0"
                            width = "75"
                            height = "30" / >
                            <
                            rect x = "15"
                            y = "213"
                            rx = "0"
                            ry = "0"
                            width = "250"
                            height = "23" / >
                            </ContentLoader> 
                        </div>
                ) : ( <div className = "delivery"
                    style = {
                        {
                            paddingTop: "5rem"
                        }
                    } >
                    <h3 className = "px-15" > {
                        localStorage.getItem("deliveryAcceptedOrdersTitle")
                    } </h3> {
                        this.props.delivery_orders.accepted_orders.length === 0 ? ( <p className = "text-center text-muted py-15 mb-10 bg-white" > {
                                localStorage.getItem("deliveryNoOrdersAccepted")
                            } </p>
                        ) : ( < div > {
                                this.props.delivery_orders.accepted_orders.map(order => ( <
                                    DelayLink to = {
                                        `/delivery/orders/${order.unique_order_id}`
                                    }
                                    className = "block"
                                    key = {
                                        order.id
                                    } >
                                    <div className = "block-header block-header-default accepted" >
                                    <h3 className = "block-title" >
                                    Pickup# {
                                        order.unique_order_id.substr(
                                            order.unique_order_id.length - 6
                                        )
                                    } </h3> <div className = "block-options" >
                                    <button type = "button" className = "btn btn-sm btn-outline-light" >
                                    <Moment fromNow > {
                                        order.updated_at
                                    } </Moment> </button> </div> </div><div className = "block-content">
                                    <p>
                                    <b> {
                                        order.restaurant.name
                                    } </b>{" "} <span className = "pull-right" > {
                                        " "
                                    } <i className = "si si-pointer mr-2" / > {
                                        order.location
                                    } </span> </p> </div> </DelayLink>
                                ))
                            } </div>
                        )
                    } </div>
                )
            } {
                this.props.delivery_orders.new_orders && ( <div className = "delivery pt-30 mb-100" >
                    <h3 className = "px-15" > {
                        localStorage.getItem("deliveryNewOrdersTitle")
                    } </h3> {
                        this.props.delivery_orders.new_orders.length === 0 ? ( <p className = "text-center text-muted py-15 mb-10 bg-white" > {
                                localStorage.getItem("deliveryNoNewOrders")
                            } </p>
                        ) : ( <div > {
                                this.props.delivery_orders.new_orders.map(order => ( <DelayLink to = {
                                        `/delivery/orders/${order.unique_order_id}`
                                    }
                                    className = "block"
                                    key = {
                                        order.id
                                    }
                                    style = {
                                        {
                                            position: "relative"
                                        }
                                    } >
                                    <div className = "block-header block-header-default new-order" >
                                    <h3 className = "block-title" >
                                    Pending# {
                                        order.unique_order_id.substr(
                                            order.unique_order_id.length - 6
                                        )
                                    } </h3> <div className = "block-options" >
                                    <button type = "button"
                                    className = "btn btn-sm btn-outline-light" >
                                    <Moment fromNow > {
                                        order.updated_at
                                    } </Moment></button> </div></div><div className="block-content">
                                    <p>
                                    <b> {
                                        order.restaurant.name
                                    } </b>{" "} <span className = "pull-right" > {
                                        " "
                                    } <i className = "si si-pointer mr-2" / > {
                                        order.location
                                    } </span> </p> </div> <Ink duration = "500" hasTouch = "true" / >
                                    </DelayLink>
                                ))
                            } </div>
                        )
                    } </div>
                )
                        }</div> </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    delivery_user: state.delivery_user.delivery_user,
    delivery_orders: state.delivery_orders.delivery_orders
});

export default connect(
    mapStateToProps, {
        getDeliveryOrders
    }
)(Orders);