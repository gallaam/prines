import React, { Component } from "react";
import Moment from "react-moment";

class OrderList extends Component {
    __getOrderStatus = id => {
        if (id === 1) {
            return "Order Placed";
        }
        if (id === 2) {
            return "Preparing Order";
        }
        if (id === 3) {
            return "Delivery Guy Assigned";
        }
        if (id === 4) {
            return "Order Picked Up";
        }
        if (id === 5) {
            return "Delivered";
        }
        if (id === 6) {
            return "Canceled";
        }
    };

    render() {
        const { order } = this.props;
        return (
            <React.Fragment>
                <div className="mb-20">
                    <div className="display-flex">
                        <div className="flex-auto">
                            <button className="mr-5 btn btn-sm btn-default">
                                {this.__getOrderStatus(order.orderstatus_id)}
                            </button>
                            <h6
                                className="font-w700"
                                style={{ color: localStorage.getItem("storeColor") }}
                            >
                                {order.unique_order_id}
                            </h6>
                        </div>
                        <div className="flex-auto">
                            <span className="text-muted pull-right">
                                <Moment fromNow>{order.created_at}</Moment>
                            </span>
                        </div>
                    </div>
                    {order.orderitems.map(item => (
                        <div className="display-flex pb-5" key={item.id}>
                            <span className="order-item-quantity mr-10">x{item.quantity}</span>
                            <div className="flex-auto text-left">{item.name}</div>
                            <div className="flex-auto text-right">
                                {localStorage.getItem("currencyFormat")} {item.price}
                            </div>
                        </div>
                    ))}
                    <div className="display-flex mt-10 font-w700">
                        <div className="flex-auto">{localStorage.getItem("orderTextTotal")}</div>
                        <div className="flex-auto text-right">
                            {localStorage.getItem("currencyFormat")} {order.total}
                        </div>
                    </div>
                </div>
                <hr />
            </React.Fragment>
        );
    }
}

export default OrderList;
