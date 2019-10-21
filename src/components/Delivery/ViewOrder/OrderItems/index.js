import React, {
    Component
} from "react";

class OrderInfo extends Component {
    render() {
        const item = this.props.item;
        return ( <
            React.Fragment >
            <
            div className = "display-flex pb-5" >
            <
            span className = "order-item-quantity mr-10" > x {
                item.quantity
            } < /span> <
            div className = "flex-auto text-left" > {
                item.name
            } < /div> <
            /div> <
            /React.Fragment>
        );
    }
}

export default OrderInfo;