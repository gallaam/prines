import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import { searchLocations } from "../../../services/locations/actions";
import { debounce } from "../../helpers/debounce";
import Meta from "../../helpers/meta";

class Location extends Component {
    handleSearchLocation = debounce(query => {
        // call to getLocations search API
        this.props.searchLocations(query);
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
                {/* Passing history as props to the searchbox component to handle goBack() */}
                <SearchBox
                    history={this.props.history}
                    searchFunction={this.handleSearchLocation}
                />
                <SearchResult history={this.props.history} locations={this.props.locations} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    locations: state.locations.locations
});

export default connect(
    mapStateToProps,
    { searchLocations }
)(Location);
