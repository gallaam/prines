import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { getAddresses, saveAddress, deleteAddress } from "../../../../services/addresses/actions";
import { updateUserInfo } from "../../../../services/user/actions";
import BackWithSearch from "../../Elements/BackWithSearch";
import AddressList from "./AddressList";
import NewAddress from "./NewAddress";
import ContentLoader from "react-content-loader";

class Addresses extends Component {
    state = {
        no_address: false,
        loading: false
    };

    componentDidMount() {
        const { user } = this.props;

        if (localStorage.getItem("storeColor") !== null) {
            if (user.success) {
                this.props.getAddresses(user.data.id, user.data.auth_token);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        // const { user } = this.props;
        if (nextProps.addresses.length === 0) {
            this.setState({ no_address: true, loading: false });
        }
        //todo tomorrow
        // if (user !== nextProps.user) {
        //     this.props.updateUserInfo(user.data.id, user.data.auth_token);
        // }
        this.setState({ loading: false });
    }
    handleSaveNewAddress = data => {
        const { user } = this.props;
        if (user.success) {
            this.setState({ loading: true });
            this.props.saveAddress(user.data.id, user.data.auth_token, data);
        }
    };

    // handleUpdateAddress = data => {
    //     console.log("TCL: Addresses -> handleUpdateAddress -> data", data);
    // };

    handleDeleteAddress = address_id => {
        const { user } = this.props;
        if (user.success) {
            this.setState({ loading: true });
            this.props.deleteAddress(user.data.id, address_id, user.data.auth_token);
        }
    };
    render() {
        if (window.innerWidth > 768) {
            return <Redirect to="/" />;
        }

        if (localStorage.getItem("storeColor") === null) {
            return <Redirect to={"/"} />;
        }
        const { addresses, user } = this.props;
        return (
            <React.Fragment>
                {this.state.loading ? (
                    <div className="height-100 overlay-loading">
                        <div>
                            <img
                                src="/assets/img/loading-food.gif"
                                alt={localStorage.getItem("pleaseWaitText")}
                            />
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <BackWithSearch
                            boxshadow={true}
                            has_title={true}
                            title={localStorage.getItem("accountManageAddress")}
                            disbale_search={true}
                        />
                        <div className="block-content block-content-full bg-white pt-80 pb-80 height-100-percent">
                            {addresses.length === 0 && !this.state.no_address && (
                                <ContentLoader
                                    height={600}
                                    width={400}
                                    speed={1.2}
                                    primaryColor="#f3f3f3"
                                    secondaryColor="#ecebeb"
                                >
                                    <rect x="0" y="0" rx="0" ry="0" width="75" height="22" />
                                    <rect x="0" y="30" rx="0" ry="0" width="350" height="18" />
                                    <rect x="0" y="60" rx="0" ry="0" width="300" height="18" />
                                    <rect x="0" y="90" rx="0" ry="0" width="100" height="18" />

                                    <rect x="0" y={0 + 170} rx="0" ry="0" width="75" height="22" />
                                    <rect
                                        x="0"
                                        y={30 + 170}
                                        rx="0"
                                        ry="0"
                                        width="350"
                                        height="18"
                                    />
                                    <rect
                                        x="0"
                                        y={60 + 170}
                                        rx="0"
                                        ry="0"
                                        width="300"
                                        height="18"
                                    />
                                    <rect
                                        x="0"
                                        y={90 + 170}
                                        rx="0"
                                        ry="0"
                                        width="100"
                                        height="18"
                                    />

                                    <rect x="0" y={0 + 340} rx="0" ry="0" width="75" height="22" />
                                    <rect
                                        x="0"
                                        y={30 + 340}
                                        rx="0"
                                        ry="0"
                                        width="350"
                                        height="18"
                                    />
                                    <rect
                                        x="0"
                                        y={60 + 340}
                                        rx="0"
                                        ry="0"
                                        width="300"
                                        height="18"
                                    />
                                    <rect
                                        x="0"
                                        y={90 + 340}
                                        rx="0"
                                        ry="0"
                                        width="100"
                                        height="18"
                                    />
                                </ContentLoader>
                            )}
                            {addresses.length === 0 && (
                                <div className="text-center mt-50 font-w600 text-muted">
                                    {localStorage.getItem("noAddressText")}
                                </div>
                            )}
                            {addresses.map(address => (
                                <AddressList
                                    handleDeleteAddress={this.handleDeleteAddress}
                                    key={address.id}
                                    address={address}
                                    user={user}
                                />
                            ))}
                        </div>
                        <NewAddress handleAddressSubmit={this.handleSaveNewAddress} />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    addresses: state.addresses.addresses
});

export default connect(
    mapStateToProps,
    { getAddresses, saveAddress, deleteAddress, updateUserInfo }
)(Addresses);
