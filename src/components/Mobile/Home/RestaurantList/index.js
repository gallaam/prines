import React, { Component } from "react";
import ContentLoader from "react-content-loader";
import LazyLoad from "react-lazyload";
import ProgressiveImage from "react-progressive-image";
import Ink from "react-ink";
import axios from "axios";

import { GET_RESTAURANTS_URL } from "../../../../configs/index";
import DelayLink from "../../../helpers/delayLink";
import Slide from "react-reveal/Slide";

class RestaurantList extends Component {
    state = {
        total: null,
        restaurants: [],
        loading: false,
        next_page: GET_RESTAURANTS_URL + "/" + localStorage.getItem("currentLocation"),
        loading_more: true
    };

    componentDidMount() {
        this.getRestaurants();
    }
    componentWillUnmount() {
        this.removeScrollEvent();
    }
    getRestaurants = () => {
        if (localStorage.getItem("currentLocation")) {
            if (!this.state.loading) {
                // Set loading state to true to
                // avoid multiple requests on scroll
                this.setState({
                    loading: true
                });

                // register scroll event
                this.registerScrollEvent();

                // make XHR request
                axios.post(this.state.next_page).then(response => {
                    const paginator = response.data,
                        restaurants = paginator.data;

                    if (restaurants.length) {
                        // add new
                        this.setState({
                            total: paginator.total,
                            restaurants: [...this.state.restaurants, ...restaurants],
                            next_page: paginator.next_page_url,
                            loading: false,
                            loading_more: false
                        });
                    }

                    // remove scroll event if next_page_url is null
                    if (!paginator.next_page_url) {
                        this.removeScrollEvent();
                    }
                });
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
        if (
            document.documentElement.scrollTop + 100 + window.innerHeight >
                document.documentElement.offsetHeight ||
            document.documentElement.scrollTop + 100 + window.innerHeight ===
                document.documentElement.offsetHeight
        ) {
            this.setState({ loading_more: true });
            this.getRestaurants();
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="bg-white">
                    {this.state.total ? (
                        <div className="mt-30">
                            <h1 className="restaurant-count pl-15">
                                {this.state.total} {localStorage.getItem("restaurantCountText")}
                            </h1>
                            <hr />
                        </div>
                    ) : (
                        <ContentLoader
                            height={40}
                            width={400}
                            speed={1.2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="20" y="20" rx="0" ry="0" width="130" height="18" />
                        </ContentLoader>
                    )}
                    {this.state.restaurants.length === 0 ? (
                        <ContentLoader
                            height={378}
                            width={400}
                            speed={1.2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="20" y="20" rx="4" ry="4" width="80" height="78" />
                            <rect x="144" y="35" rx="0" ry="0" width="115" height="18" />
                            <rect x="144" y="65" rx="0" ry="0" width="165" height="16" />

                            <rect x="20" y="145" rx="4" ry="4" width="80" height="78" />
                            <rect x="144" y="160" rx="0" ry="0" width="115" height="18" />
                            <rect x="144" y="190" rx="0" ry="0" width="165" height="16" />

                            <rect x="20" y="270" rx="4" ry="4" width="80" height="78" />
                            <rect x="144" y="285" rx="0" ry="0" width="115" height="18" />
                            <rect x="144" y="315" rx="0" ry="0" width="165" height="16" />
                        </ContentLoader>
                    ) : (
                        this.state.restaurants.map(restaurant => (
                            <Slide bottom duration={500} key={restaurant.id}>
                                <div className="col-xs-12 col-sm-12 restaurant-block">
                                    <DelayLink
                                        to={`${restaurant.slug}`}
                                        delay={200}
                                        className="block block-link-shadow text-center light-bottom-border"
                                    >
                                        <div
                                            className={`block-content block-content-full ${
                                                restaurant.is_featured
                                                    ? "ribbon ribbon-bookmark ribbon-warning"
                                                    : ""
                                            } `}
                                        >
                                            {restaurant.is_featured ? (
                                                <div className="ribbon-box">
                                                    {localStorage.getItem("restaurantFeaturedText")}
                                                </div>
                                            ) : (
                                                ""
                                            )}

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
                                                            className="fa fa-star pr-1"
                                                            style={{
                                                                color: localStorage.getItem(
                                                                    "storeColor"
                                                                )
                                                            }}
                                                        />{" "}
                                                        {restaurant.rating}
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="mb-5">
                                                        <i className="si si-clock pr-1" />{" "}
                                                        {restaurant.delivery_time}{" "}
                                                        {localStorage.getItem("homePageMinsText")}
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="mb-5">
                                                        <i className="si si-wallet pr-1" />{" "}
                                                        {localStorage.getItem("currencyFormat")}
                                                        {restaurant.price_range}{" "}
                                                        {localStorage.getItem("homePageForTwoText")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Ink duration="500" />
                                    </DelayLink>
                                </div>
                            </Slide>
                        ))
                    )}
                    {this.state.loading_more ? (
                        <div className="">
                            <ContentLoader
                                height={120}
                                width={400}
                                speed={1.2}
                                primaryColor="#f3f3f3"
                                secondaryColor="#ecebeb"
                            >
                                <rect x="20" y="20" rx="4" ry="4" width="80" height="78" />
                                <rect x="144" y="35" rx="0" ry="0" width="115" height="18" />
                                <rect x="144" y="65" rx="0" ry="0" width="165" height="16" />
                            </ContentLoader>
                        </div>
                    ) : null}
                </div>
            </React.Fragment>
        );
    }
}

export default RestaurantList;
