import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import {
    getRestaurantInfo,
    getRestaurantItems,
    resetItems,
    resetInfo
} from "../../../services/items/actions";
import FloatCart from "../FloatCart";
import ItemList from "./ItemList";
import RestaurantInfo from "./RestaurantInfo";
import Meta from "../../helpers/meta";

class Items extends Component {
    componentDidMount() {
        //if currentLocation doesnt exists in localstorage then redirect the user to firstscreen
        //else make API calls
        if (localStorage.getItem("currentLocation") === null) {
            this.props.history.push("/");
        } else {
            //call to promoSlider API to fetch
            this.props.getRestaurantInfo(this.props.match.params.restaurant);
            this.props.getRestaurantItems(this.props.match.params.restaurant);
        }
    }
    componentWillUnmount() {
        this.props.resetItems();
        this.props.resetInfo();
    }

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
                    seotitle={`${this.props.restaurant_info.name} | ${localStorage.getItem(
                        "seoMetaTitle"
                    )}`}
                    seodescription={localStorage.getItem("seoMetaDescription")}
                    ogtype="website"
                    ogtitle={`${this.props.restaurant_info.name} | ${localStorage.getItem(
                        "seoOgTitle"
                    )}`}
                    ogdescription={localStorage.getItem("seoOgDescription")}
                    ogurl={window.location.href}
                    twittertitle={`${this.props.restaurant_info.name} | ${localStorage.getItem(
                        "seoTwitterTitle"
                    )}`}
                    twitterdescription={localStorage.getItem("seoTwitterDescription")}
                />
                <div key={this.props.match.params.restaurant}>
                    <RestaurantInfo
                        history={this.props.history}
                        restaurant={this.props.restaurant_info}
                    />
                    <ItemList data={this.props.restaurant_items} />
                </div>
                <div>
                    <FloatCart />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    restaurant_info: state.items.restaurant_info,
    restaurant_items: state.items.restaurant_items
});

export default connect(
    mapStateToProps,
    { getRestaurantInfo, getRestaurantItems, resetItems, resetInfo }
)(Items);
