import React, {
    Component
} from "react";
import ProgressiveImage from "react-progressive-image";
class RestaurantInfo extends Component {
    render() {
        const order = this.props.order;
        return ( <
            React.Fragment >
            <
            div className = "pt-50" >
            <
            div className = "block-content block-content-full" >
            <
            ProgressiveImage src = {
                order.restaurant.image
            }
            placeholder = {
                order.restaurant.placeholder_image
            } >
            {
                (src, loading) => ( <
                    img src = {
                        src
                    }
                    alt = {
                        order.restaurant.name
                    }
                    className = "restaurant-image"
                    style = {
                        {
                            filter: loading ? "blur(1.2px) brightness(0.9)" : "none"
                        }
                    }
                    />
                )
            } <
            /ProgressiveImage> <
            /div> <
            div className = "block-content block-content-full restaurant-info" >
            <
            div className = "font-w600 mb-5" > {
                order.restaurant.name
            } < /div> <
            div className = "font-size-sm text-muted truncate-text" > {
                order.restaurant.description
            } <
            /div> <
            /div> <
            /div> <
            /React.Fragment>
        );
    }
}

export default RestaurantInfo;