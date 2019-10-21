import React, {
    Component
} from "react";
import Tilt from "react-tilt";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";

class StoreAchievements extends Component {
    render() {
        return ( <
            React.Fragment >
            <
            div className = "container-fluid"
            style = {
                {
                    backgroundColor: "#FBFBFD"
                }
            } >
            <
            div className = "container" >
            <
            div className = "row" >
            <
            Fade left >
            <
            div className = "col-xl-3 d-table mt-50 mb-50" >
            <
            Tilt className = "Tilt"
            options = {
                {
                    max: 40,
                    perspective: 650
                }
            } >
            <
            div className = "col-xl-12 text-center d-table-cell align-middle store-achievement" >
            <
            h3 > {
                localStorage.getItem("desktopAchievementOneTitle")
            } <
            /h3> <
            h4 className = "m-0" > {
                localStorage.getItem("desktopAchievementOneSub")
            } <
            /h4> <
            /div> <
            /Tilt> <
            /div> <
            /Fade> <
            Flip top >
            <
            div className = "col-xl-3 d-table mt-50 mb-50" >
            <
            Tilt className = "Tilt"
            options = {
                {
                    max: 40,
                    perspective: 650
                }
            } >
            <
            div className = "col-xl-12 text-center d-table-cell align-middle store-achievement" >
            <
            h3 > {
                localStorage.getItem("desktopAchievementTwoTitle")
            } <
            /h3> <
            h4 className = "m-0" > {
                localStorage.getItem("desktopAchievementTwoSub")
            } <
            /h4> <
            /div> <
            /Tilt> <
            /div> <
            /Flip> <
            Flip bottom >
            <
            div className = "col-xl-3 d-table mt-50 mb-50" >
            <
            Tilt className = "Tilt"
            options = {
                {
                    max: 40,
                    perspective: 650
                }
            } >
            <
            div className = "col-xl-12 text-center d-table-cell align-middle store-achievement" >
            <
            h3 > {
                localStorage.getItem(
                    "desktopAchievementThreeTitle"
                )
            } <
            /h3> <
            h4 className = "m-0" > {
                localStorage.getItem("desktopAchievementThreeSub")
            } <
            /h4> <
            /div> <
            /Tilt> <
            /div> <
            /Flip> <
            Fade right >
            <
            div className = "col-xl-3 d-table mt-50 mb-50" >
            <
            Tilt className = "Tilt"
            options = {
                {
                    max: 40,
                    perspective: 650
                }
            } >
            <
            div className = "col-xl-12 text-center d-table-cell align-middle store-achievement" >
            <
            h3 > {
                localStorage.getItem(
                    "desktopAchievementFourTitle"
                )
            } <
            /h3> <
            h4 className = "m-0" > {
                localStorage.getItem("desktopAchievementFourSub")
            } <
            /h4> <
            /div> <
            /Tilt> <
            /div> <
            /Fade> <
            /div> <
            /div> <
            /div> <
            /React.Fragment>
        );
    }
}

export default StoreAchievements;