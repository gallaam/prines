import React, { Component } from "react";
import ContentLoader from "react-content-loader";
import { NavLink } from "react-router-dom";
import LazyLoad from "react-lazyload";
import ProgressiveImage from "react-progressive-image";

class PromoSlider extends Component {
    render() {
        const { slides } = this.props;
        return (
            <React.Fragment>
                <div className="slider-wrapper">
                    {slides.length === 0 ? (
                        <ContentLoader
                            height={170}
                            width={400}
                            speed={1.2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="20" y="0" rx="4" ry="4" width="168" height="168" />
                            <rect x="228" y="0" rx="4" ry="4" width="168" height="168" />
                        </ContentLoader>
                    ) : (
                        slides.map(slide => (
                            <NavLink
                                to={"../../" + slide.url}
                                className="slider-wrapper__img-wrapper"
                                key={slide.id}
                            >
                                <LazyLoad>
                                    <ProgressiveImage
                                        delay={100}
                                        src={slide.image}
                                        placeholder={slide.image_placeholder}
                                    >
                                        {(src, loading) => (
                                            <img
                                                src={src}
                                                alt={slide.name}
                                                className="slider-wrapper__img"
                                                style={{
                                                    filter: loading
                                                        ? "blur(1.2px) brightness(0.9)"
                                                        : "none"
                                                }}
                                            />
                                        )}
                                    </ProgressiveImage>
                                </LazyLoad>
                            </NavLink>
                        ))
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default PromoSlider;
