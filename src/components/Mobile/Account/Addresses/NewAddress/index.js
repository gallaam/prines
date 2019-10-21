import React, { Component } from "react";
import Ink from "react-ink";
import Popup from "reactjs-popup";

class NewAddress extends Component {
    state = {
        address: "",
        house: "",
        landmark: "",
        tag: "",
        error: false
    };
    handleInput = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleSubmit = event => {
        event.preventDefault();
        if (
            this.state.address !== "" &&
            this.state.house !== "" &&
            this.state.landmark !== "" &&
            this.state.tag !== ""
        ) {
            this.setState({ error: false });
            this.props.handleAddressSubmit(this.state);
        } else {
            this.setState({ error: true });
        }
    };

    render() {
        return (
            <React.Fragment>
                <Popup
                    trigger={
                        <div
                            className="btn-new-address"
                            style={{ backgroundColor: localStorage.getItem("storeColor") }}
                        >
                            {localStorage.getItem("buttonNewAddress")}
                            <Ink duration={200} />
                        </div>
                    }
                    modal
                    closeOnDocumentClick
                >
                    {close => (
                        <div className="pages-modal">
                            {this.state.error && (
                                <div className="auth-error" style={{ marginLeft: "-0.7rem" }}>
                                    <div className="error-shake">
                                        {localStorage.getItem("loginErrorMessage")}
                                    </div>
                                </div>
                            )}
                            <div onClick={close} className="close-modal-header text-right">
                                <span className="close-modal-icon">&times;</span>
                            </div>
                            <div className="mt-50 pl-15">
                                <h3>{localStorage.getItem("buttonNewAddress")}</h3>
                                <hr />
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group m-0 mt-30 mb-30">
                                    <label className="col-12 edit-address-input-label">
                                        {localStorage.getItem("editAddressAddress")}
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            name="address"
                                            onChange={this.handleInput}
                                            className="form-control edit-address-input"
                                        />
                                    </div>
                                    <label className="col-12 edit-address-input-label">
                                        {localStorage.getItem("editAddressHouse")}
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            name="house"
                                            onChange={this.handleInput}
                                            className="form-control edit-address-input"
                                        />
                                    </div>
                                    <label className="col-12 edit-address-input-label">
                                        {localStorage.getItem("editAddressLandmark")}
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            name="landmark"
                                            onChange={this.handleInput}
                                            className="form-control edit-address-input"
                                        />
                                    </div>
                                    <label className="col-12 edit-address-input-label">
                                        {localStorage.getItem("editAddressTag")}
                                    </label>
                                    <div className="col-md-9">
                                        <input
                                            type="text"
                                            name="tag"
                                            onChange={this.handleInput}
                                            className="form-control edit-address-input edit-address-tag"
                                            placeholder={localStorage.getItem(
                                                "addressTagPlaceholder"
                                            )}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn-save-address"
                                    style={{ backgroundColor: localStorage.getItem("storeColor") }}
                                >
                                    {localStorage.getItem("buttonSaveAddress")}
                                    <Ink duration={200} />
                                </button>
                            </form>
                        </div>
                    )}
                </Popup>
            </React.Fragment>
        );
    }
}

export default NewAddress;
