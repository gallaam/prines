import React, { Component } from "react";
import ContentLoader from "react-content-loader";
import ProgressiveImage from "react-progressive-image";

import BackWithSearch from "../../Elements/BackWithSearch";

class RestaurantInfo extends Component {
    componentDidMount() {
        this.registerScrollEvent();
    }
    componentWillUnmount() {
        this.removeScrollEvent();
    }

    fixedRestaurantInfo = hidden => {
        if (this.child) {
            if (hidden) {
                this.child.heading.classList.add("hidden");
            } else {
                this.child.heading.classList.remove("hidden");
            }
        }
    };

    registerScrollEvent() {
        window.addEventListener("scroll", this.scrollFunc);
    }
    removeScrollEvent() {
        window.removeEventListener("scroll", this.scrollFunc);
    }
    scrollFunc = () => {
        if (document.documentElement.scrollTop > 55) {
            let hidden = false;
            this.fixedRestaurantInfo(hidden);
        }
        if (document.documentElement.scrollTop < 55) {
            let hidden = true;
            this.fixedRestaurantInfo(hidden);
        }
    };
    render() {
        const { history, restaurant } = this.props;
        return (
            <React.Fragment>
                <div className="height-30 bg-white">
                    <BackWithSearch
                        ref={node => {
                            this.child = node;
                        }}
                        history={history}
                        boxshadow={false}
                        has_restaurant_info={true}
                        restaurant={restaurant}
                    />

                    {restaurant.length === 0 ? (
                        <ContentLoader
                            height={170}
                            width={400}
                            speed={1.2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="20" y="70" rx="4" ry="4" width="80" height="78" />
                            <rect x="144" y="85" rx="0" ry="0" width="115" height="18" />
                            <rect x="144" y="115" rx="0" ry="0" width="165" height="16" />
                        </ContentLoader>
                    ) : (
                        <div className="pt-50">
                            <div className="block-content block-content-full">
                                <ProgressiveImage
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
                            </div>
                            <div className="block-content block-content-full restaurant-info">
                                <h1 className="font-w600 mb-5 h4">{restaurant.name}</h1>
                                <div className="font-size-sm text-muted truncate-text">
                                    {restaurant.description}
                                </div>
                                <hr />
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
                                            <i className="si si-clock" /> {restaurant.delivery_time}{" "}
                                            {localStorage.getItem("homePageMinsText")}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="mb-5">
                                            <i className="si si-wallet" /> {restaurant.price_range}{" "}
                                            {localStorage.getItem("homePageForTwoText")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default RestaurantInfo;
