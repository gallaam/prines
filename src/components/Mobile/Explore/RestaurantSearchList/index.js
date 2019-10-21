import React, { Component } from "react";
import ProgressiveImage from "react-progressive-image";
import Ink from "react-ink";
import LazyLoad from "react-lazyload";

import DelayLink from "../../../helpers/delayLink";

class RestaurantSearchList extends Component {
    render() {
        const { restaurants } = this.props;
        return (
            <React.Fragment>
                <div className="bg-white mb-50 mt-10">
                    {restaurants.map(restaurant => (
                        <div key={restaurant.id} className="col-xs-12 col-sm-12 restaurant-block">
                            <DelayLink
                                to={
                                    `../` +
                                    localStorage.getItem("currentLocation").toLowerCase() +
                                    `/restaurants/${restaurant.slug}`
                                }
                                delay={200}
                                className="block block-link-shadow text-center light-bottom-border"
                            >
                                <div className="block-content block-content-full">
                                    <LazyLoad>
                                        <ProgressiveImage
                                            delay={100}
                                            src={restaurant.image}
                                            placeholder={restaurant.placeholder_image}
                                        >
                                            {(src, loading) => (
                                                <img
                                                    src={src}
                                                    alt={restaurant.name}
                                                    className="restaurant-image"
                                                    style={{
                                                        filter: loading
                                                            ? "blur(1.2px) brightness(0.9)"
                                                            : "none"
                                                    }}
                                                />
                                            )}
                                        </ProgressiveImage>
                                    </LazyLoad>
                                </div>
                                <div className="block-content block-content-full restaurant-info">
                                    <div className="font-w600 mb-5">{restaurant.name}</div>
                                    <div className="font-size-sm text-muted truncate-text">
                                        {restaurant.description}
                                    </div>
                                    <br />
                                </div>
                                <div className="block-content restaurant-meta">
                                    <div className="row items-push text-center">
                                        <div className="col-4">
                                            <div className="mb-5">
                                                <i
                                                    className="fa fa-star"
                                                    style={{
                                                        color: localStorage.getItem("storeColor")
                                                    }}
                                                />{" "}
                                                {restaurant.rating}
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="mb-5">
                                                <i className="si si-clock" />{" "}
                                                {restaurant.delivery_time} MINS
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="mb-5">
                                                <i className="si si-wallet" />{" "}
                                                {restaurant.price_range} FOR TWO
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Ink duration="500" />
                            </DelayLink>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default RestaurantSearchList;
