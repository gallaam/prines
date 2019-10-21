import React, { Component } from "react";
import ContentLoader from "react-content-loader";
import ProgressiveImage from "react-progressive-image";

class RestaurantInfoCart extends Component {
    render() {
        const { restaurant } = this.props;
        return (
            <React.Fragment>
                <div className="bg-white">
                    {restaurant.length === 0 ? (
                        <ContentLoader
                            height={150}
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
                                <div className="font-w600 mb-5">{restaurant.name}</div>
                                <div className="font-size-sm text-muted truncate-text">
                                    {restaurant.description}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default RestaurantInfoCart;
