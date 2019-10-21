import React, {
    Component
} from "react";
import ReactMapGL, {
    Marker
} from "react-map-gl";
import {
    geolocated
} from "react-geolocated";
import ContentLoader from "react-content-loader";

import {
    connect
} from "react-redux";
import {
    sendDeliveryGuyGpsLocation
} from "../../../services/Delivery/gpslocation/actions";

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
        loading: true
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.coords !== nextProps.coords) {
            if (this.state.viewport.latitude == null) {
                let viewportCopy = JSON.parse(JSON.stringify(this.state.viewport));
                //make changes to ingredients
                viewportCopy.latitude = nextProps.coords.latitude;
                viewportCopy.longitude = nextProps.coords.longitude;
                this.setState({
                    viewport: viewportCopy,
                    gps_latitude: nextProps.coords.latitude,
                    gps_longitude: nextProps.coords.longitude,
                    loading: false
                });
            }
        }

        if (
            this.props.startSendingDeliveryLocation !== nextProps.startSendingDeliveryLocation ||
            this.props.startSendingDeliveryLocation
        ) {
            if (this.props.coords === nextProps.coords) {
                if (this.state.viewport.latitude !== null) {
                    this.__sendGpsLocation();
                }
            }
        }
    }

    sendingGpsLocationInterval = 0;
    __sendGpsLocation = () => {
        this.sendingGpsLocationInterval = setInterval(() => {
            this.props.sendDeliveryGuyGpsLocation(
                this.props.delivery_user.data.auth_token,
                this.props.order_id,
                this.state.gps_latitude,
                this.state.gps_longitude
            );
        }, 10 * 1000);
    };

    componentWillUnmount() {
        clearInterval(this.sendingGpsLocationInterval);
    }

    render() {
        return ( <React.Fragment >
            <div className = "pt-50" > {
                this.state.loading ? ( <
                    ContentLoader height = {
                        400
                    }
                    width = {
                        window.innerWidth
                    }
                    speed = {
                        1.2
                    }
                    primaryColor = "#f3f3f3"
                    secondaryColor = "#ecebeb" >
                    <
                    rect x = "0"
                    y = "0"
                    rx = "0"
                    ry = "0"
                    width = {
                        window.innerWidth
                    }
                    height = "400" /
                    >
                    </ContentLoader>
                ) : ( <React.Fragment >
                    <
                    ReactMapGL { ...this.state.viewport
                    }
                    mapboxApiAccessToken = {
                        localStorage.getItem("mapApiKey")
                    }
                    onViewportChange = {
                        viewport => this.setState({
                            viewport
                        })
                    } >
                    <
                    Marker latitude = {
                        this.state.gps_latitude
                    }
                    longitude = {
                        this.state.gps_longitude
                    }
                    offsetLeft = {-25
                    }
                    offsetTop = {-25
                    } >
                    <
                    div >
                    <img src = "/assets/img/various/current-location-marker.png" alt = "Your Location" width = "50" height = "50" />
                    </div> </Marker> <Marker latitude = {
                        parseFloat(this.props.restaurant_latitude)
                    }
                    longitude = {
                        parseFloat(this.props.restaurant_longitude)
                    }
                    offsetLeft = {-30
                    }
                    offsetTop = {-35
                    } >
                    <
                    div >
                    <img src = "/assets/img/various/restaurant-map-marker.png" alt = "Restaurant Location" width = "35" height = "47" />
                    </div> </Marker> </ReactMapGL> </React.Fragment>
                )
            } </div> 
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    delivery_user: state.delivery_user.delivery_user,
    single_delivery_order: state.single_delivery_order.single_delivery_order
});

export default connect(
    mapStateToProps, {
        sendDeliveryGuyGpsLocation
    }
)(geolocated()(Map));