import React, { Component } from "react";
import Ink from "react-ink";

class Nav extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="col-12 p-0">
                    <div className="block m-0">
                        <div className="block-content p-0">
                            <div className="input-group search-box">
                                {!this.props.disable_back_button && (
                                    <div className="input-group-prepend">
                                        <button
                                            type="button"
                                            className="btn search-navs-btns"
                                            style={{ position: "relative" }}
                                        >
                                            <i className="si si-arrow-left" />
                                            <Ink duration="500" />
                                        </button>
                                    </div>
                                )}
                                <p className="form-control search-input">
                                    {this.props.logo && (
                                        <img
                                            src="/assets/img/logos/logo.png"
                                            alt={localStorage.getItem("storeName")}
                                            width="120"
                                            height="33"
                                        />
                                    )}
                                </p>
                                <div className="input-group-append">
                                    <button
                                        type="submit"
                                        className="btn nav-location"
                                        style={{ position: "relative" }}
                                        onClick={() => this.props.history.push("/search-location")}
                                    >
                                        {localStorage.getItem("currentLocation")}{" "}
                                        <i
                                            className="si si-arrow-down nav-location-icon"
                                            style={{ color: localStorage.getItem("storeColor") }}
                                        />
                                        <Ink duration="500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Nav;
