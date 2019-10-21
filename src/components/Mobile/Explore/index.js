import React, { Component } from "react";
import { connect } from "react-redux";
import { debounce } from "../../helpers/debounce";
import { Redirect } from "react-router";
import Footer from "../Footer";
import RestaurantSearch from "./RestaurantSearch";
import { searchRestaurants } from "../../../services/searchRestaurants/actions";
import RestaurantSearchList from "./RestaurantSearchList";
import Meta from "../../helpers/meta";

class Explore extends Component {
    handleRestaurantSearch = debounce(query => {
        // call to searchRestaurnats search API
        this.props.searchRestaurants(query, localStorage.getItem("currentLocation"));
    }, 200);

    render() {
        if (window.innerWidth > 768) {
            return <Redirect to="/" />;
        }
        if (localStorage.getItem("storeColor") === null) {
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
                <RestaurantSearch searchFunction={this.handleRestaurantSearch} />
                {this.props.restaurants.length > 0 && (
                    <RestaurantSearchList restaurants={this.props.restaurants} />
                )}
                <Footer active_explore={true} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    restaurants: state.restaurants.restaurants
});

export default connect(
    mapStateToProps,
    { searchRestaurants }
)(Explore);
