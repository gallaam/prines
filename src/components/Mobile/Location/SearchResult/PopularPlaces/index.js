import React, { Component } from "react";
import ContentLoader from "react-content-loader";
import Ink from "react-ink";
import Flip from "react-reveal/Flip";

class PopularPlaces extends Component {
    render() {
        const { locations, setLocation } = this.props;
        return (
            <React.Fragment>
                <div className="p-15">
                    <h1 className="text-muted h4">{localStorage.getItem("searchPopularPlaces")}</h1>
                    {locations.length === 0 ? (
                        <ContentLoader
                            height={160}
                            width={400}
                            speed={1.2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="15" ry="15" width="125" height="30" />
                            <rect x="135" y="0" rx="15" ry="15" width="100" height="30" />
                            <rect x="245" y="0" rx="15" ry="15" width="110" height="30" />
                            <rect x="0" y="40" rx="15" ry="15" width="85" height="30" />
                            <rect x="95" y="40" rx="15" ry="15" width="125" height="30" />
                        </ContentLoader>
                    ) : null}
                    {locations.map((location, index) => (
                        <Flip top delay={index * 50} key={location.id}>
                            <button
                                type="button"
                                className="btn btn-rounded btn-alt-secondary btn-md mb-15 mr-15"
                                style={{ position: "relative" }}
                                onClick={() => setLocation(location.name)}
                            >
                                <Ink duration="500" />
                                {location.name}
                            </button>
                        </Flip>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default PopularPlaces;
