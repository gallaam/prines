import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import BackButton from "../../Elements/BackButton";
import { loginUser } from "../../../../services/user/actions";

class Login extends Component {
    state = {
        loading: false,
        email: "",
        password: "",
        error: false
    };

    static contextTypes = {
        router: () => null
    };

    handleInputEmail = event => {
        this.setState({ email: event.target.value });
    };
    handleInputPassword = event => {
        this.setState({ password: event.target.value });
    };

    handleLogin = event => {
        event.preventDefault();
        this.setState({ loading: true });
        this.props.loginUser(this.state.email, this.state.password);
    };

    componentWillReceiveProps(newProps) {
        const { user } = this.props;
        if (user !== newProps.user) {
            this.setState({ loading: false });
        }
        if (newProps.user.success) {
            this.context.router.history.goBack();
        } else {
            this.setState({ error: true });
        }
    }

    render() {
        if (window.innerWidth > 768) {
            return <Redirect to="/" />;
        }
        if (localStorage.getItem("storeColor") === null) {
            return <Redirect to={"/"} />;
        }
        const { user } = this.props;
        if (user.success) {
            return (
                //redirect to account page
                <Redirect to={"/my-account"} />
            );
        }
        return (
            <React.Fragment>
                {/* PreLoading the loading gif */}
                <img src="/assets/img/loading-food.gif" className="hidden" alt="prefetching" />
                {this.state.error && (
                    <div className="auth-error">
                        <div className="error-shake">
                            {localStorage.getItem("loginErrorMessage")}
                        </div>
                    </div>
                )}
                {this.state.loading && (
                    <div className="height-100 overlay-loading">
                        <div>
                            <img
                                src="/assets/img/loading-food.gif"
                                alt={localStorage.getItem("pleaseWaitText")}
                            />
                        </div>
                    </div>
                )}
                <div style={{ backgroundColor: "#f2f4f9" }}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <BackButton history={this.props.history} />
                        </div>
                    </div>
                    <img
                        src="/assets/img/login-header.png"
                        className="login-image pull-right mr-15"
                        alt="login-header"
                    />
                    <div className="login-texts px-15 mt-50 pb-20">
                        <span className="login-title">
                            {localStorage.getItem("loginLoginTitle")}
                        </span>
                        <br />
                        <span className="login-subtitle">
                            {localStorage.getItem("loginLoginSubTitle")}
                        </span>
                    </div>
                </div>
                <div className="bg-white">
                    <form onSubmit={this.handleLogin}>
                        <div className="form-group px-15 pt-30">
                            <label className="col-12 edit-address-input-label">
                                {localStorage.getItem("loginLoginEmailLabel")}
                            </label>
                            <div className="col-md-9 pb-5">
                                <input
                                    type="text"
                                    name="email"
                                    onChange={this.handleInputEmail}
                                    className="form-control edit-address-input"
                                />
                            </div>
                            <label className="col-12 edit-address-input-label">
                                {localStorage.getItem("loginLoginPasswordLabel")}
                            </label>
                            <div className="col-md-9">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={this.handleInputPassword}
                                    className="form-control edit-address-input"
                                />
                            </div>
                        </div>
                        <div className="mt-20 px-15 pt-15 button-block">
                            <button
                                type="submit"
                                className="btn btn-main"
                                style={{ backgroundColor: localStorage.getItem("storeColor") }}
                            >
                                {localStorage.getItem("loginLoginTitle")}
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-50 mb-20">
                        {localStorage.getItem("loginDontHaveAccount")}{" "}
                        <NavLink
                            to="/register"
                            style={{ color: localStorage.getItem("storeColor") }}
                        >
                            {localStorage.getItem("firstScreenRegisterBtn")}
                        </NavLink>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
