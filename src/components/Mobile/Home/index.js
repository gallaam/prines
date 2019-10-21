import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Footer from "../Footer";
import Nav from "../Nav";
import PromoSlider from "./PromoSlider";
import { getPromoSlides } from "../../../services/promoSlider/actions";
import RestaurantList from "./RestaurantList";
import Meta from "../../helpers/meta";
import * as firebase from "firebase/app";

import { saveNotificationToken } from "../../../services/notification/actions";

import messaging from "../../../init-fcm";

class Home extends Component {
    async componentDidMount() {
        //if currentLocation doesnt exists in localstorage then redirect the user to firstscreen
        //else make API calls
        if (localStorage.getItem("currentLocation") === null) {
            this.props.history.push("/search-location");
        } else {
            //call to promoSlider API to fetch the slides
            this.props.getPromoSlides(this.props.match.params.location);
        }

        const { user } = this.props;
        if (user.success) {
            if (firebase.messaging.isSupported()) {
                let handler = this.props.saveNotificationToken;
                messaging
                    .requestPermission()
                    .then(async function() {
                        const push_token = await messaging.getToken();
                        handler(push_token, user.data.id, user.data.auth_token);
                    })
                    .catch(function(err) {
                        console.log("Unable to get permission to notify.", err);
                    });
                navigator.serviceWorker.addEventListener("message", message =>
                    console.log(message)
                );
            }
        }
    }

    render() {
        if (window.innerWidth > 768) {
            return <Redirect to="/" />;
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
                <div className="height-100-percent bg-white mb-50">
                    <Nav
                        logo={true}
                        active_nearme={true}
                        disable_back_button={true}
                        history={this.props.history}
                    />
                    {/* Passing slides as props to PromoSlider */}
                    {localStorage.getItem("showPromoSlider") === "true" && (
                        <PromoSlider slides={this.props.promo_slides} />
                    )}
                    <RestaurantList location={this.props.match.params.location} />
                    <Footer active_nearme={true} />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    promo_slides: state.promo_slides.promo_slides,
    user: state.user.user,
    locations: state.locations.locations
});

export default connect(
    mapStateToProps,
    { getPromoSlides, saveNotificationToken }
)(Home);
