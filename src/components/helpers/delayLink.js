import React from "react";
import {
    Link
} from "react-router-dom";


/**
 * Wraps the React Router Link component and creates a delay after the link is clicked.
 */
export default class DelayLink extends React.Component {
    static defaultProps = {
        delay: 0,
        onDelayStart: () => {},
        onDelayEnd: () => {}
    };
	static contextTypes = Link.contextTypes;

    constructor(props, context) {
        super(props);
        this.timeout = null;

    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    handleClick = e => {
        
        const {
            replace,
            to,
            delay,
            onDelayStart,
            onDelayEnd
        } = this.props;
        const {
            history
        } = this.context.router;

        onDelayStart(e, to);
        if (e.defaultPrevented) {
            return;
        }
        e.preventDefault();
        this.timeout = setTimeout(() => {
            if (replace) {
                history.replace(to);
            } else {
                history.push(to);
            }
            onDelayEnd(e, to);
        }, delay);
    };
    render() {
        const props = Object.assign({}, this.props);
        delete props.delay;
        delete props.onDelayStart;
        delete props.onDelayEnd;

        return <Link { ...props
        }
        onClick = {
            this.handleClick
        }
        />;
    }
}