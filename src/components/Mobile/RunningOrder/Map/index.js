import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { geolocated } from "react-geolocated";
import ContentLoader from "react-content-loader";

import { connect } from "react-redux";
import { getDeliveryGuyGpsLocation } from "../../../../services/Delivery/gpslocation/actions";

class Map extends Component {
    state = {
        viewport: {
            width: window.innerWidth,
            height: 400,
            zoom: 15,
            latitude: null,
            longitude: null
        },
        gps_latitude: null,
        gps_longitude: null,
        show_delivery_gps: false,
        delivery_guy_latitude: null,
        delivery_guy_longitude: null,
        loopStarted: false,
        loading: true
    };

    componentDidMount() {
        this.setState({
            viewport: {
                ...this.state.viewport,
                latitude: parseFloat(this.props.restaurant_latitude),
                longitude: parseFloat(this.props.restaurant_longitude)
            }
        });
        if (this.props.orderstatus_id === 3) {
            this.__getDeliveryGuyLocationOnce();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.coords !== nextProps.coords) {
            if (this.state.viewport.latitude !== null) {
                this.setState({
                    gps_latitude: nextProps.coords.latitude,
                    gps_longitude: nextProps.coords.longitude,
                    loading: false
                });
            }
        }
        if (
            this.props.delivery_gps_location.delivery_lat !==
            nextProps.delivery_gps_location.delivery_lat
        ) {
            if (nextProps.delivery_gps_location.delivery_lat !== null) {
                if (this.props.orderstatus_id === 3 || this.nextProps.orderstatus_id === 3) {
                    if (!this.state.loopStarted) {
                        this.setState({ show_delivery_gps: true });
                        this.__getDeliveryGuyLocationLoop();
                    }
                }
            }
        }
    }

    __getDeliveryGuyLocationOnce = () => {
        this.props.getDeliveryGuyGpsLocation(this.props.user.data.auth_token, this.props.order_id);
    };

    gettingGpsLocationInterval = 0;

    __getDeliveryGuyLocationLoop = () => {
        this.gettingGpsLocationInterval = setInterval(() => {
            this.props.getDeliveryGuyGpsLocation(
                this.props.user.data.auth_token,
                this.props.order_id
            );
        }, 10 * 1000);
        this.setState({ loopStarted: true });
    };

    componentWillUnmount() {
        clearInterval(this.gettingGpsLocationInterval);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.state.loading ? (
                        <ContentLoader
                            height={400}
                            width={window.innerWidth}
                            speed={1.2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect
                                x="0"
                                y="0"
                                rx="0"
                                ry="0"
                                width={window.innerWidth}
                                height="400"
                            />
                        </ContentLoader>
                    ) : (
                        <React.Fragment>
                            <ReactMapGL
                                {...this.state.viewport}
                                mapboxApiAccessToken={localStorage.getItem("mapApiKey")}
                                onViewportChange={viewport => this.setState({ viewport })}
                            >
                                <Marker
                                    latitude={this.state.gps_latitude}
                                    longitude={this.state.gps_longitude}
                                    offsetLeft={-25}
                                    offsetTop={-25}
                                >
                                    <div>
                                        <img
                                            src="/assets/img/various/current-location-marker.png"
                                            alt="Your Location"
                                            width="50"
                                            height="50"
                                        />
                                    </div>
                                </Marker>
                                <Marker
                                    latitude={parseFloat(this.props.restaurant_latitude)}
                                    longitude={parseFloat(this.props.restaurant_longitude)}
                                    offsetLeft={-30}
                                    offsetTop={-35}
                                >
                                    <div>
                                        <img
                                            src="/assets/img/various/restaurant-map-marker.png"
                                            alt="Restaurant Location"
                                            width="35"
                                            height="47"
                                        />
                                    </div>
                                </Marker>
                                {this.state.show_delivery_gps && (
                                    <React.Fragment>
                                        <Marker
                                            latitude={parseFloat(
                                                this.props.delivery_gps_location.delivery_lat
                                            )}
                                            longitude={parseFloat(
                                                this.props.delivery_gps_location.delivery_long
                                            )}
                                            offsetLeft={-30}
                                            offsetTop={-35}
                                        >
                                            <div>
                                                <img
                                                    src="/assets/img/various/delivery-map-marker.png"
                                                    alt="Delivery Guy Location"
                                                    width="35"
                                                    height="47"
                                                />
                                            </div>
                                        </Marker>
                                    </React.Fragment>
                                )}
                            </ReactMapGL>
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    delivery_gps_location: state.gps_location.get_delivery_guy_gps_location
});

export default connect(
    mapStateToProps,
    { getDeliveryGuyGpsLocation }
)(geolocated()(Map));
