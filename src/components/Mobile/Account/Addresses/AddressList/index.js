import React, { Component } from "react";
import Ink from "react-ink";
import { connect } from "react-redux";
import { setDefaultAddress } from "../../../../../services/addresses/actions";
import { updateUserInfo } from "../../../../../services/user/actions";
class AddressList extends Component {
    static contextTypes = {
        router: () => null
    };

    __setDefaultAddress = address_id => {
        const { user } = this.props;
        if (user.success) {
            this.props.setDefaultAddress(user.data.id, address_id, user.data.auth_token);
            setTimeout(() => {
                this.props.updateUserInfo(user.data.id, user.data.auth_token);
            }, 1000);
            setTimeout(() => {
                this.context.router.history.goBack();
            }, 1800);
        }
    };

    render() {
        const { address, user } = this.props;
        return (
            <React.Fragment>
                {user.data.default_address_id === address.id ? (
                    <button className="btn btn-lg pull-right btn-address-default selected">
                        <i
                            className="si si-check"
                            style={{ color: localStorage.getItem("storeColor") }}
                        />
                        <Ink duration={200} />
                    </button>
                ) : (
                    <button
                        className="btn btn-lg pull-right btn-address-default"
                        onClick={() => this.__setDefaultAddress(address.id)}
                    >
                        <i className="si si-check" />
                        <Ink duration={200} />
                    </button>
                )}

                <h6 className="m-0 text-uppercase">{address.tag}</h6>
                <p className="mb-10">
                    {address.house}
                    <br />
                    {address.address}
                    <br />
                    {address.landmark}
                </p>
                <span
                    className="btn-edit-address"
                    style={{ color: localStorage.getItem("storeColor") }}
                    onClick={() => this.props.handleDeleteAddress(address.id)}
                >
                    {localStorage.getItem("deleteAddressText")}
                </span>
                <hr />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { setDefaultAddress, updateUserInfo }
)(AddressList);
