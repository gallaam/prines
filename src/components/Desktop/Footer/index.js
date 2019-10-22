import React, {
    Component
} from "react";

class Footer extends Component {
    render() {
        return ( <
            React.Fragment >
            <
            footer className = "desktop-footer bg-white opacity-1" >
            <
            div className = "container" >
            <
            div className = "content content-full" >
            <
            div className = "row items-push-2x mt-30"
            style = {
                {
                    marginLeft: "25rem"
                }
            } >
            <
            div className = "col-md-6" >
            <
            img src = "./assets/img/logos/logo.png"
            alt = {
                localStorage.getItem("storeName")
            }
            className = "footer-logo mb-20" /
            >
            <
            div className = "font-size-sm mb-30"
            dangerouslySetInnerHTML = {
                {
                    __html: localStorage.getItem("desktopFooterAddress")
                }
            }
            /> <
            /div> <
            div className = "col-md-6" >
            <
            h3 className = "h5 font-w700" > {
                localStorage.getItem("desktopFooterSocialHeader")
            } <
            /h3> {
                localStorage.getItem("desktopSocialFacebookLink") !==
                    "null" && ( <
                        a href = {
                            localStorage.getItem("desktopSocialFacebookLink")
                        }
                        className = "btn btn-sm btn-rounded btn-alt-secondary mr-10"
                        target = "_blank"
                        rel = "noopener noreferrer" >
                        <
                        i className = "fa fa-fw fa-facebook" / >
                        <
                        /a>
                    )
            }

            {
                localStorage.getItem("desktopSocialGoogleLink") !== "null" && ( <
                    a href = {
                        localStorage.getItem("desktopSocialGoogleLink")
                    }
                    className = "btn btn-sm btn-rounded btn-alt-secondary mr-10"
                    target = "_blank"
                    rel = "noopener noreferrer" >
                    <
                    i className = "fa fa-fw fa-google-plus" / >
                    <
                    /a>
                )
            }

            {
                localStorage.getItem("desktopSocialYoutubeLink") !==
                    "null" && ( <
                        a href = {
                            localStorage.getItem("desktopSocialYoutubeLink")
                        }
                        className = "btn btn-sm btn-rounded btn-alt-secondary mr-10"
                        target = "_blank"
                        rel = "noopener noreferrer" >
                        <
                        i className = "fa fa-fw fa-youtube-play" / >
                        <
                        /a>
                    )
            }

            {
                localStorage.getItem("desktopSocialInstagramLink") !==
                    "null" && ( <
                        a href = {
                            localStorage.getItem(
                                "desktopSocialInstagramLink"
                            )
                        }
                        className = "btn btn-sm btn-rounded btn-alt-secondary mr-10"
                        target = "_blank"
                        rel = "noopener noreferrer" >
                        <
                        i className = "fa fa-fw fa-instagram" / >
                        <
                        /a>
                    )
            } <
            /div> <
            /div> <
            /div> <
            /div> <
            /footer> <
            /React.Fragment>
        );
    }
}

export default Footer;