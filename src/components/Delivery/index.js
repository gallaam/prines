import React, {
    Component
} from "react";
import {
    Redirect
} from "react-router";
import {
    connect
} from "react-redux";
import Popup from "reactjs-popup";

import Orders from "./Orders";
import {
    getDeliveryOrders
} from "../../services/Delivery/orders/actions";
import {
    logoutDeliveryUser
} from "../../services/Delivery/user/actions";
import Meta from "../helpers/meta";

class Delivery extends Component {
    componentDidMount() {
        document.querySelector("#mainManifest").setAttribute("href", "assets/delivery-manifest.json");
        document.getElementsByTagName("body")[0].classList.add("bg-grey");
    }

    render() {
        if (window.innerWidth > 768) {
            return <Redirect to = "/" / > ;
        }
        const {
            delivery_user
        } = this.props;
        if (!delivery_user.success) {
            return <Redirect to = {
                "/delivery/login"
            }
            />;
        }
        return ( <
            React.Fragment >
            <
            Meta seotitle = "Delivery Orders"
            seodescription = {
                localStorage.getItem("seoMetaDescription")
            }
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
            /> <
            Orders / >

            <
            Popup trigger = { <
                button className = "btn btn-lg btn-logout-delivery" > {
                    localStorage.getItem("deliveryLogoutDelivery")
                } <
                /button>
            }
            modal closeOnDocumentClick >
            {
                close => ( <
                    div className = "pages-modal" >
                    <
                    div onClick = {
                        close
                    }
                    className = "close-modal-header text-right" >
                    <
                    span className = "close-modal-icon" > & times; < /span> <
                    /div> <
                    div className = "text-center"
                    style = {
                        {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }
                    } >
                    <
                    p style = {
                        {
                            fontSize: "1.3rem",
                            fontWeight: "500"
                        }
                    } > {
                        localStorage.getItem("deliveryLogoutConfirmation")
                    } <
                    /p> <
                    button className = "btn btn-lg btn-danger mr-3"
                    onClick = {
                        () =>
                        this.props.logoutDeliveryUser(this.props.delivery_user)
                    }
                    style = {
                        {
                            width: "6rem",
                            border: "0",
                            borderRadius: "0",
                            backgroundColor: localStorage.getItem("storeColor")
                        }
                    } >
                    <
                    i className = "si si-check" > < /i> <
                    /button> <
                    button onClick = {
                        close
                    }
                    className = "btn btn-lg"
                    style = {
                        {
                            width: "6rem",
                            border: "0",
                            borderRadius: "0"
                        }
                    } >
                    <
                    i className = "si si-close" > < /i> <
                    /button> <
                    /div> <
                    /div>
                )
            } <
            /Popup> <
            /React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    delivery_user: state.delivery_user.delivery_user,
    delivery_orders: state.delivery_orders.delivery_orders
});

export default connect(
    mapStateToProps, {
        getDeliveryOrders,
        logoutDeliveryUser
    }
)(Delivery);