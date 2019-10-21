import React, { Component } from "react";
import { connect } from "react-redux";
import Ink from "react-ink";

import PopularPlaces from "./PopularPlaces";
import { getPopularLocations } from "../../../../services/popularLocations/actions";

class SearchResult extends Component {
    componentDidMount() {
        //call to getPopularLocations from API
        this.props.getPopularLocations();
    }

    setLocation = location => {
        // set the current location when user click either from search result
        // or from popular places
        localStorage.setItem("currentLocation", location);
        //redirect to location's restaurant page after finishing animation
        setTimeout(() => {
            this.props.history.push("/");
        }, 200);
    };

    render() {
        const { popular_locations, locations } = this.props;
        return (
            <React.Fragment>
                <div className="table-responsive mt-20 location-search-result">
                    <PopularPlaces setLocation={this.setLocation} locations={popular_locations} />

                    <div>
                        {locations.map(location => (
                            <div
                                key={location.id}
                                className="location-search-block"
                                onClick={() => this.setLocation(location.name)}
                            >
                                <div className="location-search-icon">
                                    <i className="si si-pointer" />
                                </div>
                                <div className="font-w600 location-search-data">
                                    {location.name} <br />
                                    <span className="font-w400">{location.description}</span>
                                </div>
                                <Ink duration="500" />
                            </div>
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    popular_locations: state.popular_locations.popular_locations
});

export default connect(
    mapStateToProps,
    { getPopularLocations }
)(SearchResult);
