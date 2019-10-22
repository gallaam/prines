import React, { Component } from "react";

import { connect } from "react-redux";

import Ink from "react-ink";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";

import { getSettings } from "../../../services/settings/actions";
import ProgressiveImage from "react-progressive-image";
import DelayLink from "../../helpers/delayLink";
import Meta from "../../helpers/meta";

class FirstScreen extends Component {
    componentDidMount() {
        //if one config is missing then call the api to fetch settings

        if (!localStorage.getItem("storeColor")) {
            this.props.getSettings();
        }

        if (localStorage.getItem("storeColor")) {
            setTimeout(() => {
                this.removeSplashScreen();
            }, 1000);
        }
    }

    componentWillReceiveProps(newProps, nextProps) {
        const { settings } = this.props;
        if (settings !== newProps.settings) {
            //settings received, then hide the splash screen after 1s
            setTimeout(() => {
                this.removeSplashScreen();
            }, 1000);
        }
    }

    removeSplashScreen = () => {
        if (document.getElementById("firstScreenSplash")) {
            document.getElementById("firstScreenSplash").remove();
        }
        if (document.getElementById("firstScreenMain")) {
            document.getElementById("firstScreenMain").classList.remove("hidden");
        }
    };

    render() {
        const { user } = this.props;

        if (localStorage.getItem("currentLocation") !== null) {
            return (
                <Redirect
                    to={localStorage.getItem("currentLocation").toLowerCase() + "/restaurants"}
                />
            );
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
                <div>
                    <div className="col-12 p-0" id="firstScreenSplash">
                        <div className="block m-0">
                            <div className="block-content p-0">
                                <img
                                    src="./assets/img/splash/splash.jpg"
                                    className="img-fluid"
                                    alt={localStorage.getItem("storeName")}
                                    style={{
                                        width: "100%"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="col-12 p-0 hidden"
                        id="firstScreenMain"
                        style={{ height: `${window.innerHeight}px` }}
                    >
                        <div className="block m-0 ">
                            <div className="block-content p-0">
                                {localStorage.getItem("firstScreenHeroImage") && (
                                    <ProgressiveImage
                                        delay={100}
                                        src={localStorage.getItem("firstScreenHeroImage")}
                                        placeholder={localStorage.getItem("firstScreenHeroImageSm")}
                                    >
                                        {(src, loading) => (
                                            <img
                                                src={src}
                                                alt={localStorage.getItem("storeName")}
                                                className="img-fluid"
                                                style={{
                                                    filter: loading
                                                        ? "blur(1.2px) brightness(0.9)"
                                                        : "none",
                                                    width: `${window.innerWidth}px`
                                                }}
                                            />
                                        )}
                                    </ProgressiveImage>
                                )}
                            </div>
                        </div>
                        <div className="block m-0">
                            <div className="block-content pt-10">
                                <h1 className="welcome-heading mt-10">
                                    {localStorage.getItem("firstScreenHeading")}
                                </h1>
                                <h2 className="welcome-subheading text-center mt-10 mb-10">
                                    {localStorage.getItem("firstScreenSubHeading")}
                                </h2>
                                <DelayLink to="/search-location"
                                    delay={200}
                                    className="btn btn-lg btn-setup-location"
                                    style={{
                                        backgroundColor: localStorage.getItem("storeColor"),
                                        position: "relative"
                                    }}
                                >
                                    {localStorage.getItem("firstScreenSetupLocation")}
                                    <Ink duration="500" hasTouch="true" />
                                </DelayLink>
                                {user.success ? (
                                    <p className="login-block font-w500 mb-0">
                                        {localStorage.getItem("firstScreenWelcomeMessage")}{" "}
                                        {user.data.name}
                                    </p>
                                ) : (
                                    <p className="login-block mb-0">
                                        {localStorage.getItem("firstScreenLoginText")}{" "}
                                        <NavLink
                                            to="/login"
                                            style={{ color: localStorage.getItem("storeColor") }}
                                        >
                                            {localStorage.getItem("firstScreenLoginBtn")}
                                        </NavLink>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings.settings,
    user: state.user.user
});

export default connect(
    mapStateToProps,
    { getSettings }
)(FirstScreen);
