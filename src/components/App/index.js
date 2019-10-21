import React, {
    Component
} from "react";
import '../../css/main.css';
import '../../css/custom.css';
import Mobile from "../../components/Mobile";
import Desktop from "../../components/Desktop";

import {
    connect
} from "react-redux";
import {
    getSettings
} from "../../services/settings/actions";

class App extends Component {
    componentDidMount() {
        //force update settings everytime
        this.props.getSettings();
    }

    render() {
        return ( <React.Fragment> {
                window.innerWidth <= 768 ? <Mobile/> : <Desktop/>
            } </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings.settings,
    user: state.user.user,
    notification_token: state.notification_token.notification_token
});

export default connect(
    mapStateToProps, {
        getSettings
    }
)(App);