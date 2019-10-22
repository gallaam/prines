import React, {
    Component
} from "react";
import Hero from "./Hero";
import StoreAchievements from "./StoreAchievements";
import Footer from "./Footer";

import {
    connect
} from "react-redux";
import {
    getSettings
} from "../../services/settings/actions";
import Meta from "../helpers/meta";

class Desktop extends Component {
    state = {
        showGdpr: false
    };
    componentDidMount() {
        if (!localStorage.getItem("storeColor")) {
            this.props.getSettings();
        }

        if (!localStorage.getItem("gdprAccepted")) {
            localStorage.setItem("gdprAccepted", "false");
            if (localStorage.getItem("showGdpr") === "true") {
                this.setState({
                    showGdpr: true
                });
            }
        }

        if (
            localStorage.getItem("showGdpr") === "true" &&
            localStorage.getItem("gdprAccepted") === "false"
        ) {
            this.setState({
                showGdpr: true
            });
        }
    }
    handleGdprClick = () => {
        localStorage.setItem("gdprAccepted", "true");
        this.setState({
            showGdpr: false
        });
    };
    render() {
        return ( <React.Fragment > {
                this.state.showGdpr && ( <div className = "fixed-gdpr" >
                    <span > {
                        localStorage.getItem("gdprMessage")
                    } < /span> <span >
                    <         button className = "btn btn-sm ml-2"
                    style = {
                        {
                            backgroundColor: localStorage.getItem("storeColor")
                        }
                    }
                    onClick = {
                        this.handleGdprClick
                    } >
                    {
                        localStorage.getItem("gdprConfirmButton")
                    } </button> <
                    /span> <
                    /div>
                )
            } <Meta seotitle = {
                localStorage.getItem("seoMetaTitle")
            }
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
            /> <Hero / >
            <StoreAchievements / >
            <Footer / >
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings.settings
});

export default connect(
    mapStateToProps, {
        getSettings
    }
)(Desktop);