import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Footer from "../Footer";
import UserInfo from "./UserInfo";
import UserMenu from "./UserMenu";
import { getPages } from "../../../services/pages/actions";
import Logout from "./Logout";
import Meta from "../../helpers/meta";

class Account extends Component {
    componentDidMount() {
        const { user } = this.props;
        if (localStorage.getItem("storeColor") !== null) {
            if (user.success) {
                this.props.getPages();
            }
        }
    }

    render() {
        if (window.innerWidth > 768) {
            return <Redirect to="/" />;
        }
        if (localStorage.getItem("storeColor") === null) {
            return <Redirect to={"/"} />;
        }
        const { user, pages } = this.props;
        if (!user.success) {
            return (
                //redirect to login page if not loggedin
                <Redirect to={"/login"} />
            );
        }
        return (
            <React.Fragment>
                <Meta
                    seotitle="Account"
                    seodescription={localStorage.getItem("seoMetaDescription")}
                    ogtype="website"
                    ogtitle={localStorage.getItem("seoOgTitle")}
                    ogdescription={localStorage.getItem("seoOgDescription")}
                    ogurl={window.location.href}
                    twittertitle={localStorage.getItem("seoTwitterTitle")}
                    twitterdescription={localStorage.getItem("seoTwitterDescription")}
                />
                <UserInfo user_info={user.data} />
                <UserMenu pages={pages} />
                <Logout />
                <Footer active_account={true} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    pages: state.pages.pages
});

export default connect(
    mapStateToProps,
    { getPages }
)(Account);
