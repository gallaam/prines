import React, {
    Component
} from "react";

import {
    connect
} from "react-redux";
import {
    Redirect
} from "react-router";
import {
    loginDeliveryUser
} from "../../../services/Delivery/user/actions";
import {
    getSettings
} from "../../../services/settings/actions";
import Meta from "../../helpers/meta";

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
    componentDidMount() {
        this.props.getSettings();

        setTimeout(() => {
            this.setState({
                error: false
            });
        }, 380);
    }
    handleInputEmail = event => {
        this.setState({
            email: event.target.value
        });
    };
    handleInputPassword = event => {
        this.setState({
            password: event.target.value
        });
    };

    handleLogin = event => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        this.props.loginDeliveryUser(this.state.email, this.state.password);
    };

    componentWillReceiveProps(newProps) {
        const {
            delivery_user
        } = this.props;
        if (delivery_user !== newProps.delivery_user) {
            this.setState({
                loading: false
            });
        }
        if (newProps.delivery_user.success) {
            // this.context.router.push("/delivery");
        } else {
            this.setState({
                error: true
            });
        }
    }

    render() {
        if (window.innerWidth > 768) {
            return <Redirect to = "/" / > ;
        }
        const {
            delivery_user
        } = this.props;
        if (delivery_user.success) {
            return (
                //redirect to account page
                <
                Redirect to = {
                    "/delivery"
                }
                />
            );
        }

        return ( <
            React.Fragment >
            <
            Meta seotitle = "Login"
            seodescription = {
                localStorage.getItem("seoMetaDescription")
            }
            ogtype = "website"
            ogtitle = {
                localStorage.getItem("seoOgTitle")
            }
            ogdescription = {
                localStorage.getItem("seoOgDescription")
            }
            ogurl = {
                window.location.href
            }
            twittertitle = {
                localStorage.getItem("seoTwitterTitle")
            }
            twitterdescription = {
                localStorage.getItem("seoTwitterDescription")
            }
            /> { /* PreLoading the loading gif */ } <
            img src = "/assets/img/loading-food.gif"
            className = "hidden"
            alt = "prefetching" / > {
                this.state.error && ( <
                    div className = "auth-error" >
                    <
                    div className = "error-shake" > {
                        localStorage.getItem("loginErrorMessage")
                    } <
                    /div> <
                    /div>
                )
            } {
                this.state.loading && ( <
                    div className = "height-100 overlay-loading" >
                    <
                    div >
                    <
                    img src = "/assets/img/loading-food.gif"
                    alt = {
                        localStorage.getItem("pleaseWaitText")
                    }
                    /> <
                    /div> <
                    /div>
                )
            } <
            div style = {
                {
                    backgroundColor: "#f2f4f9"
                }
            } >
            <
            div className = "input-group" >
            <
            div className = "input-group-prepend" >
            <
            div style = {
                {
                    height: "3.5rem"
                }
            }
            /> <
            /div> <
            /div> <
            img src = "/assets/img/login-header.png"
            className = "login-image pull-right mr-15"
            alt = "login-header" /
            >
            <
            div className = "login-texts px-15 mt-50 pb-20" >
            <
            span className = "login-title" > {
                localStorage.getItem("loginLoginTitle")
            } <
            /span> <
            br / >
            <
            span className = "login-subtitle" > {
                localStorage.getItem("loginLoginSubTitle")
            } <
            /span> <
            /div> <
            /div> <
            div className = "height-70 bg-white" >
            <
            form onSubmit = {
                this.handleLogin
            } >
            <
            div className = "form-group px-15 pt-30" >
            <
            label className = "col-12 edit-address-input-label" > {
                localStorage.getItem("loginLoginEmailLabel")
            } <
            /label> <
            div className = "col-md-9 pb-5" >
            <
            input type = "text"
            name = "email"
            onChange = {
                this.handleInputEmail
            }
            className = "form-control edit-address-input" /
            >
            <
            /div> <
            label className = "col-12 edit-address-input-label" > {
                localStorage.getItem("loginLoginPasswordLabel")
            } <
            /label> <
            div className = "col-md-9" >
            <
            input type = "password"
            name = "password"
            onChange = {
                this.handleInputPassword
            }
            className = "form-control edit-address-input" /
            >
            <
            /div> <
            /div> <
            div className = "mt-20 px-15 pt-15 button-block" >
            <
            button type = "submit"
            className = "btn btn-main"
            style = {
                {
                    backgroundColor: localStorage.getItem("storeColor")
                }
            } >
            {
                localStorage.getItem("loginLoginTitle")
            } <
            /button> <
            /div> <
            /form> <
            /div> <
            /React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    delivery_user: state.delivery_user.delivery_user
});

export default connect(
    mapStateToProps, {
        loginDeliveryUser,
        getSettings
    }
)(Login);