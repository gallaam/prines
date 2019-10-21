import React, { Component } from "react";

import Home from "./Home";
import FirstScreen from "./FirstScreen";
import Popup from "reactjs-popup";

class Mobile extends Component {
    state = {
        showGdpr: false
    };
    componentDidMount() {
        setTimeout(() => {
            if (document.getElementsByClassName("popup-content")[0]) {
                document.getElementsByClassName("popup-content")[0].style.backgroundColor =
                    "transparent";
            }
        }, 10);

        if (!localStorage.getItem("gdprAccepted")) {
            localStorage.setItem("gdprAccepted", "false");
            if (localStorage.getItem("showGdpr") === "true") {
                this.setState({ showGdpr: true });
            }
        }

        if (
            localStorage.getItem("showGdpr") === "true" &&
            localStorage.getItem("gdprAccepted") === "false"
        ) {
            this.setState({ showGdpr: true });
        }
    }
    handleGdprClick = () => {
        localStorage.setItem("gdprAccepted", "true");
        this.setState({ showGdpr: false });
    };
    render() {
        return (
            <React.Fragment>
                <Popup
                    open={this.state.showGdpr}
                    closeOnDocumentClick={false}
                    onClose={this.handleGdprClick}
                >
                    <div className="mobile-gdpr">
                        <button
                            className="close btn btn-sm ml-2"
                            style={{ backgroundColor: localStorage.getItem("storeColor") }}
                            onClick={this.handleGdprClick}
                        >
                            {localStorage.getItem("gdprConfirmButton")}
                        </button>
                        {localStorage.getItem("gdprMessage")}
                    </div>
                </Popup>
                {localStorage.getItem("location") ? (
                    <div>
                        <Home />
                    </div>
                ) : (
                    <FirstScreen />
                )}
            </React.Fragment>
        );
    }
}

export default Mobile;
